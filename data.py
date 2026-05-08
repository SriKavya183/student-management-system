
import pandas as pd
import sqlite3

# CSV file path
csv_file = "student_dataset_100_records.csv"

# SQLite database file
database_file = "students.db"

# Table name
table_name = "students"

# Read CSV file
df = pd.read_csv(csv_file)

# Display first few rows
print("CSV Data Preview:")
print(df.head())

# Connect to SQLite database
conn = sqlite3.connect(database_file)

# Clean column names
df.columns = [col.strip().lower().replace(" ", "_") for col in df.columns]

# Insert data into SQLite table
df.to_sql(
    table_name,
    conn,
    if_exists="replace",   # replace existing table
    index=False
)

print(f"\nSuccessfully inserted {len(df)} records into '{table_name}' table.")

# Verify inserted data
query = f"SELECT * FROM {table_name} LIMIT 5;"
result = pd.read_sql(query, conn)

print("\nInserted Data Preview:")
print(result)

# Close connection
conn.close()

print("\nSQLite database created successfully.")


