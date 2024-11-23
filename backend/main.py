from utils import parse_and_process_rss_feeds
from db_insert import save_articles_to_db

if __name__ == "__main__":
    articles = parse_and_process_rss_feeds()
    save_articles_to_db(articles)