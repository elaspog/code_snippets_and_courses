
# Cheatsheet

pretty print of a wider dataframe:
```
with pd.option_context('display.max_rows', None, 'display.max_columns', None):
    print(df)
```
