import pandas as pd

url = 'https://data.nasa.gov/resource/y77d-th95.json'
df = pd.read_json(url)

total_entries = len(df)

max_meteorite = df.loc[df['mass'].astype(float).idxmax()]

df['year'] = pd.to_datetime(df['year'], errors='coerce').dt.year
most_frequent_year = df['year'].mode()[0]

print(f"Total entries: {total_entries}")
print(f"Most massive meteorite: {max_meteorite['name']} with mass {max_meteorite['mass']}")
print(f"Most frequent year: {most_frequent_year}")
