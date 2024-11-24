const express = require('express');
const mysql = require('mysql2/promise');
const axios = require('axios');
const bodyParser = require('body-parser');
const cheerio = require('cheerio'); // 用于从HTML提取内容
const openaiLib=require('openai');

const DBLink = '48.209.8.200';
const port = 3307;

const app = express();
app.use(express.json());

// Azure OpenAI 配置
const GPT4_ENDPOINT = 'https://hackatum-2024.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview';
const API_KEY = '2bBZn5pMnk003jcxoOLmZV9lKLflifdjC8mOOSpep0wB9lIaDoAyJQQJ99AKACfhMk5XJ3w3AAABACOGPo7V';
const Dall_E_endpoint = "https://hackatum-2024.openai.azure.com/openai/deployments/dall-e-3/images/generations?api-version=2024-02-01"
// 使用中间件解析 JSON 请求体
app.use(bodyParser.json());

const db = mysql.createPool({
    host: DBLink,
    port: 3306,
    user: 'newuser',
    password: '123456',
    database: 'articlesDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 测试数据库连接
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Database connected successfully');
        connection.release();
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // 连接失败时退出程序
    }
})();
// 获取文章列表
app.get('/articles', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Articles');
        res.json(rows);
    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({error: 'Database query error'});
    }
});

async function generateImage(prompt) {
    const headers = {
        "Content-Type": "application/json",
        "api-key": API_KEY
    };

    const data = {
        prompt: prompt,
        size: "1024x1024",
        n: 1,
        quality: "hd",
        style: "vivid"
    };
    console.log(JSON.stringify(data))
    console.log(JSON.stringify(headers))
    try {
        const response =
            await axios.post(Dall_E_endpoint, data, {headers});


        if (response.status === 200) {
            const imageUrl = response.data.data[0].url;

            console.log(`Image generated successfully: ${imageUrl}`);
            return imageUrl; // 返回生成的图像 URL
        } else {
            console.error(`Failed to generate image. Status code: ${response.status}`);
            throw new Error('Image generation failed');
        }
    } catch (error) {
        console.error("Error generating image:", error.response ? error.response.data : error.message);
        throw new Error("Image generation failed");
    }
}

app.post('/generate-article', async (req, res) => {
    const summaries = req.body['summaries'];
    const subject = req.body['subject'] ?? "";
    const textSize = req.body['textSize'] ?? 1000;
    const temperature = req.body['temperature'] ?? 0.6; // 0.5-0.7
    const keywords = req.body['keywords'] ?? "";
    if (!summaries || !Array.isArray(summaries) || summaries.length === 0) {
        return res.status(400).json({error: 'Summaries are required and must be a non-empty array'});
    }

    try {
        const sourcesContent = await Promise.all(summaries.map(async (item) => {
            const {source, summary} = item;

            if (!source) {
                return {source, summary, content: 'No source provided.'};
            }

            try {
                const response = await axios.get(source);
                const content = extractMainContent(response.data); // 从 HTML 中提取正文
                return {source, summary, content};
            } catch (err) {
                console.error(`Error fetching source ${source}:`, err.message);
                return {source, summary, content: 'Error fetching content.'};
            }
        }));

        // 构造 GPT-4o 请求的 Prompt
        const prompt = sourcesContent.map((item, index) => {
            return `Source ${index + 1}: ${item.source}\nSummary: ${item.summary}`;
        }).join('\n\n');

        const gptResponse = await axios.post(
            GPT4_ENDPOINT,
            {
                messages: [
                    {
                        role: 'system',
                        content: `You are an ${subject} expert journalist creating an SEO-optimized article. Use the keywords: ${keywords}naturally throughout the text. Structure the article with:\n` +
                            '\n' +
                            'An engaging H1 title.\n' +
                            'H2 and H3 subheadings for clear organization.\n' +
                            'Short, informative paragraphs.\n' +
                            'A bullet point list summarizing key points.\n' +
                            'Additionally:\n' +
                            '\n' +
                            'Write an SEO-friendly meta description under 1000 characters.\n' +
                            'Include 2 internal links and 1 external authoritative link.\n' +
                            'Use a tone that appeals to professionals in the automotive and sustainability industries.'
                    },
                    {
                        role: 'user',
                        content: `Below are multiple article summaries:\n\n${prompt}\n\nWrite a full news article that integrates the information from these summaries into a single, coherent article.`
                    }
                ],
                max_tokens: textSize,
                temperature: temperature
            },
            {headers: {'api-key': API_KEY, 'Content-Type': 'application/json'}}
        );
        const generatedArticle = gptResponse.data.choices[0].message.content;
        // 调用 DALL·E 生成图片
        const imagePrompt = `An artistic and detailed image related to: ${keywords},Please give me a 16:9 flat and minimalist style picture`;
        const generatedImageUrl = await generateImage(imagePrompt);
        res.json({
            summaries,
            generated_article: generatedArticle,
            generated_image_url: generatedImageUrl
        });
    } catch (err) {
        console.error('Error generating article or image:', err.message);
        res.status(500).json({error: 'Error generating article or image'});
    }
});

function extractMainContent(html) {
    const $ = cheerio.load(html);
    const bodyText = $('body').text(); // 提取正文
    return bodyText.replace(/\s+/g, ' ').trim(); // 去除多余空格和换行
}

// 启动服务器
app.listen(3307, () => {
    console.log('Server is running on http://localhost:3307');
});
