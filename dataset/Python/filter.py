# Edit by Tianyu Ma
# coding: utf-8
"""
=====
First step: CSV file segmentation
=====

"""

import os
import sys
import csv

# initial
reload(sys)
sys.setdefaultencoding('utf-8')

# read local csv file
csv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'csv', 'properties_2016.csv')
csv_reader = csv.reader(open(csv_path, 'rb'))
csv_reader.next()
i = j = 1
for row in csv_reader:
    if i % 100000 == 0:
        print u"CSV file source%s created" % j
        j += 1
    # write csv
    csv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'csv', 'source' + str(j) + '.csv')
    csv_file = file(csv_path, 'ab+')
    csv_write = csv.writer(csv_file)
    # write header in new csv file
    if os.path.getsize(csv_path) == 0:
        csv_write.writerow(['parcelid', 'bathroomcnt', 'bedroomcnt',
                            'buildingclasstypeid', 'buildingqualitytypeid', 'calculatedfinfishedsquarefeet', 'latitude', 'longtitude', 'lotsizesquare', 'regionidcity', 'regionidcounty', 'regionidzip', 'roomcnt', 'unitcnt', 'yearbuilt', 'numberofstories', 'structuretaxcaluedollarcnt', 'taxvaluedollarcnt', 'landtaxvaluedollarcnt', 'taxamount'])
    # write data
    csv_write.writerow([row[0], row[4], row[5], row[6], row[7], row[11], row[24], row[25], row[26], row[36], row[37], row[39], row[40], row[44], row[47], row[48], row[50], row[51], row[53], row[54]])
    csv_file.close()
    i += 1
# close