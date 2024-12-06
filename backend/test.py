import pandas as pd

# Sample data for employees
data = {
    "name": ["John Doe", "Jane Smith", "Mary Johnson", "James Brown", "Linda White"],
    "department": ["HR", "IT", "Finance", "Marketing", "Sales"],
    "salary": [50000, 60000, 55000, 45000, 70000],
}

# Create a DataFrame
df = pd.DataFrame(data)

# Save it as a CSV file
csv_file_path = 'sample_employees.csv'
df.to_csv(csv_file_path, index=False)

csv_file_path
