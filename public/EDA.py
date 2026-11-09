import pandas as pd
import numpy as py

df = pd.read_csv("Zomato_Cleaned.csv")


# Factors affecting delivery time
factors = [
    'Road_traffic_density',
    'Weather_conditions',
    'City',
    'multiple_deliveries',
    'Vehicle_condition',
    'Festival'
]

for col in factors:
    print(f"\n--- {col} ---")
    print(
        df.groupby(col)['Time_taken (min)']
        .agg(['count', 'mean', 'median'])
        .round(2)
        .sort_values('mean', ascending=False)
    )