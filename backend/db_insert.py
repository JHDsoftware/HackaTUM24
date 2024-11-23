import pymysql
from sshtunnel import SSHTunnelForwarder
from constents import *

def save_articles_to_db(articles):
    # Set up an SSH tunnel to connect to the Azure server
    with SSHTunnelForwarder(
        (ssh_host, 22),
        ssh_username=ssh_user,
        ssh_pkey=ssh_key_path,
        remote_bind_address=(db_host, db_port)
    ) as tunnel:
        try:
            # Connect to the MySQL database through the SSH tunnel
            connection = pymysql.connect(
                host=db_host,
                user=db_user,
                password=db_password,
                database=db_name,
                port=tunnel.local_bind_port
            )
            with connection.cursor() as cursor:
                for article in articles:
                    # Insert relevant article into the database
                    cursor.execute(
                        """
                        INSERT INTO Articles (news_id, title, content_link, summary, published_at, author, rss_source, image_links, category, score)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        ON DUPLICATE KEY UPDATE title=VALUES(title), content_link=VALUES(content_link), summary=VALUES(summary),
                        published_at=VALUES(published_at), author=VALUES(author), rss_source=VALUES(rss_source),
                        image_links=VALUES(image_links), category=VALUES(category), score=VALUES(score);
                        """,
                        (
                            article["news_id"], article["title"], article["content_link"], article["summary"],
                            article["published_at"], article["author"], article["rss_source"], article["image_links"],
                            article["category"], article["score"]
                        )
                    )
                connection.commit()
                print("RSS news entries inserted successfully.")

                # Show the created table
                cursor.execute("DESCRIBE Articles;")
                columns = cursor.fetchall()
                print("Table 'Articles' structure:")
                for column in columns:
                    print(column)

                # Show all records in the table (if any)
                cursor.execute("SELECT * FROM Articles;")
                records = cursor.fetchall()
                print("\nRecords in 'Articles' table:")
                for record in records:
                    print(record)
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            connection.close()