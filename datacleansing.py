# Edit by Tianyu Ma
# coding: utf-8
"""
=====
Second step: data cleansing
=====

"""
import pandas as pd

# drop rows with NAN
df = pd.read_csv('csv/source1')
df.dropna(axis = 0, subset = ['parcelid', 'buildingqualitytypeid', 'calculatedfinfishedsquarefeet', 'latitude', 'longtitude', 'lotsizesquare', 'regionidcity', 'regionidzip', 'yearbuilt', 'taxvaluedollarcnt', 'taxamount'])

# fillNAN with certain values
df.fillna({'numberofstories' : 1})

# print total row number
print "Total row number is:  "
df.shape[0]

# write dataframe to new csv file
df.to_csv('cleansource1.csv')
