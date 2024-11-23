import feedparser
import requests
from bs4 import BeautifulSoup
import re
import hashlib
from constents import *

# Step 2: Classify and categorize entries as electric vehicle related
def classify_and_categorize_article_gpt4o(article_content):
    headers = {
        "Content-Type": "application/json",
        "api-key": api_key,
    }
    data = {
        "messages": [
            {"role": "system", "content": "You are an expert in electric vehicle technologies and content categorization."},
            {"role": "user", "content": f"Is the following article relevant to electric vehicles? If yes, categorize it into one of the following categories: 'Technology', 'Policy', 'Market Trends'. Article: {article_content}"}
        ],
        "max_tokens": 100,
        "temperature": 0.0,
    }

    response = requests.post(gpt4o_endpoint, headers=headers, json=data)
    if response.status_code == 200:
        result_text = response.json()["choices"][0]["message"]["content"].strip()
        if "not relevant" in result_text.lower() or "irrelevant" in result_text.lower():
            return "not relevant", ""
        else:
            category_match = re.search(r'(Technology|Policy|Market Trends)', result_text, re.IGNORECASE)
            category = category_match.group(0).capitalize() if category_match else "Other"
            return "relevant", category
    else:
        print(f"Error {response.status_code}: {response.text}")
        return "not relevant", ""

# Step 3: Scrape the content of the article link
def scrape_article_content(url):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, "html.parser")
            paragraphs = soup.find_all('p')
            page_content = " ".join([para.get_text() for para in paragraphs])
            return page_content
        else:
            print(f"Failed to fetch article content. Status code: {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"Error fetching article content: {e}")
        return None

# Step 4: Score the articles to determine interestingness
def score_article_gpt4o(article_content):
    headers = {
        "Content-Type": "application/json",
        "api-key": api_key,
    }
    data = {
        "messages": [
            {"role": "system", "content": "You are a news editor scoring articles for relevance, novelty, and interestingness."},
            {"role": "user", "content": f"Please evaluate the following article based on its relevance to electric vehicles, novelty, and general interest. Provide a score as either 'low', 'medium', or 'high': {article_content}"}
        ],
        "max_tokens": 10,
        "temperature": 0.5,
    }

    response = requests.post(gpt4o_endpoint, headers=headers, json=data)
    if response.status_code == 200:
        score_text = response.json()["choices"][0]["message"]["content"].strip().lower()
        return score_text if score_text in ["low", "medium", "high"] else "low"
    else:
        print(f"Error {response.status_code}: {response.text}")
        return "low"

# Step 5: Parse RSS feeds and process articles
def parse_and_process_rss_feeds():
    articles = []
    for rss_url in rss_urls:
        # Parse the RSS feed
        feed = feedparser.parse(rss_url)

        # Print general feed information
        print("Feed Title:", feed.feed.title)
        print("Feed Link:", feed.feed.link)
        print("Feed Description:", feed.feed.get("description", "No description available"))
        print("----------------------------------------------------")
        print("Number of Entries:", len(feed.entries))

        for entry in feed.entries:
            title = entry.get("title", "No title available")
            summary_html = entry.get("summary", "No summary available")
            link = entry.get("link", "No link available")
            author = entry.get("author", "No author available")
            published_at = entry.get("published", "No date available")

            # Parse the summary HTML to extract image link and text summary
            soup = BeautifulSoup(summary_html, "html.parser")
            image_tag = soup.find('img')
            image_links = image_tag['src'] if image_tag else "No image link available"
            text_summary = soup.get_text(strip=True)

            # Generate unique news_id using MD5 hash of title and link
            news_id = hashlib.md5((title + link).encode('utf-8')).hexdigest()

            # Step 6a: Check if the link is from a blacklisted domain
            domain = re.search(r'://(www\.)?([^/]+)', link)
            if domain and domain.group(2) in blacklist_domains:
                print(f"Skipping article from blacklisted domain: {link}")
                continue

            # Step 6b: Scrape the article to get the content
            page_content = scrape_article_content(link)

            if not page_content:
                continue  # Skip to the next article if the content couldn't be fetched

            # Step 6c: Classify and categorize the article
            classification_result, category = classify_and_categorize_article_gpt4o(page_content)

            if classification_result == "not relevant":
                continue  # Skip to the next article since it's not relevant

            if classification_result == "relevant":
                # Step 6d: Score the article
                score = score_article_gpt4o(page_content)

                # Save article information in a dictionary
                article_data = {
                    "news_id": news_id,
                    "title": title,
                    "content_link": link,
                    "summary": text_summary,
                    "published_at": published_at,
                    "author": author,
                    "rss_source": rss_url,
                    "image_links": image_links,
                    "category": category,
                    "score": score
                }
                articles.append(article_data)
    return articles