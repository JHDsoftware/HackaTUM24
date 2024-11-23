#Set up API details
api_key = "2bBZn5pMnk003jcxoOLmZV9lKLflifdjC8mOOSpep0wB9lIaDoAyJQQJ99AKACfhMk5XJ3w3AAABACOGPo7V"  # Replace with your actual Azure API key
gpt4o_endpoint = "https://hackatum-2024.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview"

# URLs of the RSS feeds
rss_urls = [
    "https://rss.app/feeds/u6rcvfy6PTSf9vQ4.xml",
    # Add more RSS feed URLs here
]

# List of domains to blacklist due to paywalls
blacklist_domains = [
    "www.scmp.com",
    "www.edp24.co.uk"
]

# Database connection details
ssh_key_path = "/Users/angli/Documents/GitHub/HackaTUM24/hackatum_key.pem"
ssh_host = "48.209.8.200"
ssh_user = "azureuser"
db_user = "newuser"
db_password = "123456"
db_name = "articlesDB"
db_host = "127.0.0.1"
db_port = 3306