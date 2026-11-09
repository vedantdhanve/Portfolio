import pandas as pd
import numpy as py

df = pd.read_csv("Zomato Dataset.csv")



print(df.head())
print(df.shape)
print(df.columns)
print(df.describe())
df.info()


# Duplicated records
print(df.duplicated().sum())


# Unique values in categorical column
print(df['Weather_conditions'].unique())
print(df['Road_traffic_density'].unique())
print(df['City'].unique())
print(df['Festival'].unique())


# Check duplicate ID'S
print("Duplicated ID'S:",df['ID'].duplicated().sum())

# Check vehicle conditions
print("Vehicle condtions:",df['Vehicle_condition'].unique())

# Check delivery range
print("Delivery time range:",
      df['Time_taken (min)'].min(),
      df['Time_taken (min)'].max())

# Check age range
print("Age range:",
      df['Delivery_person_Age'].min(),
      df['Delivery_person_Age'].max())


# Identifying missing values
print(df.isnull().sum())



# Handling missing numerical values
df['Delivery_person_Age'] = df['Delivery_person_Age'].fillna(
    df['Delivery_person_Age'].median()
)

df['Delivery_person_Ratings'] = df['Delivery_person_Ratings'].fillna(
    df['Delivery_person_Ratings'].median()
)


print(df.isnull().sum())



# Handling catrgorical values
# Instead of applying changes for each columns execute in a loop
categorical_cols = [
    'Weather_conditions',
    'Road_traffic_density',
    'Festival',
    'City'
]

for col in categorical_cols:
    df[col] = df[col].fillna(df[col].mode()[0])

for col in categorical_cols:
    print(col, ":", df[col].isnull().sum())

print(df.isnull().sum())




# Handling Multiple deliveries
print(df['multiple_deliveries'].value_counts(dropna=False))
df['multiple_deliveries'] = df['multiple_deliveries'].fillna(
    df['multiple_deliveries'].mode()[0]
)

print(df.isnull().sum())



print(df[['Order_Date', 'Time_Orderd', 'Time_Order_picked']].head(10))
print(df[['Order_Date', 'Time_Orderd', 'Time_Order_picked']].dtypes)


print(df[['Order_Date', 'Time_Orderd', 'Time_Order_picked']].dtypes)
print(df['Time_Orderd'].value_counts(dropna=False).head(15))
print(df['Time_Order_picked'].value_counts(dropna=False).head(15))
print(df.isnull().sum())



print(df['Time_Orderd'].unique()[:30])
print(df['Time_Order_picked'].unique()[:30])
df['Order_Date'] = pd.to_datetime(
    df['Order_Date'],
    format='%d-%m-%Y'
)


print(df.dtypes)
print(df.isnull().sum())


print(df[['Time_Orderd', 'Time_Order_picked']].dtypes)
print(df[['Time_Orderd', 'Time_Order_picked']].isna().sum())

df.to_csv("Zomato_Cleaned.csv", index=False)