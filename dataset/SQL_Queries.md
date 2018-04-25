# SQL Queries
## Index 
* [General user opertions](#general-user-operations)
	* [Sign up](#sign-up)
	* [Login](#login)
	* [Fetch user's information](#fetch-users-information)
	* [Update user's information](#update-users-information)
* [General house searching](#general-house-searching)
	* [Fetch information of a single house](#fetch-information-of-regional-houses)
	* [Fetch information of top liked houses](#fetch-information-of-top-liked-houses)
	* [Fetch information of top viewed houses](#fetch-information-of-top-viewed-houses)
	* [Counting function](#counting-function)
* [Advanced search](#advanced-search)
	* [Search houses](#search-houses)
* [Home Buyers](#home-buyers)
	* [Buy a house](#buy-a-house)
	* [Fetch houses which have already been bought by the user](#fetch-houses-which-have-already-been-bought-by-the-user)
* [Home sellers](#home-sellers)
	* [Fetch information of own houses](#fetch-information-of-own-houses)
	* [Delete a house](#delete-a-house)
	* [Sell a house](#sell-a-house)
	* [Update information of a house](#update-information-of-a-house)
* [Preferences](#preferences)
	* [Add a house to like list](#add-a-house-to-like-list)
	* [Remove a house from like list](#remove-a-house-from-like-list)
	* [Fetch liked houses of the user](#fetch-liked-houses-of-the-user)
	* [Fetch viewed houses of the user](#fetch-viewed-houses-of-the-user)
* [Others](#others)
	* [Fetch users who liked the house](#fetch-users-who-liked-the-house)
	* [Fetch users who viewed the house](#fetch-users-who-viewed-the-house)
	* [Add visited pages to viewed list](#add-visited-pages-to-viewed-list)
	* [Get buy history](#get-buy-history)
	* [Determine whether a user is popular](#determine-whether-a-user-is-popular)
	* [Determine whether a user is active](#determine-whether-a-user-is-active)
  
	

## General user operations

### Sign up
Join HomeFolio: create a new account by providing email and password
```SELECT * FROM acc_user WHERE email = &var1 and password = &var2
INSERT INTO acc_user VALUES (&var1, &var2, &var3, &var4, &var5, &var6, &var7)
INSERT INTO seller VALUES (&var1)
INSERT INTO buyer VALUES (&var1)
```
### Login
Login your existing account
```
SELECT * FROM acc_user WHERE email = &var1 and password = &var2
SELECT * FROM seller WHERE u_id = &var1
SELECT * FROM buyer WHERE u_id = &var1
```

### Fetch user's information
```
SELECT * FROM acc_user WHERE u_id = &var1
SELECT * FROM seller WHERE u_id = &var1
SELECT * FROM buyer WHERE u_id = &var1
```

### Update user's information
Update your information: username/password/age/area/biography
```
SELECT * FROM acc_user WHERE u_id = &var1
UPDATE acc_user SET username = &var1, password = &var2, age = &var3, area = &var4, bio = &var5 WHERE u_id = &var6
```

## _General house searching_

### Fetch information of a single house
Search of single house
```
SELECT * FROM house WHERE h_id = &var1
```

### Fetch information of regional houses
Positioning houses by latitude and longtitude
```
SELECT *
FROM (
	SELECT h_id, latitude, longitude
	FROM house
	WHERE latitude < &var1 and latitude > &var2 and longitude < &var3 and longitude > &var4
	ORDER BY DBMS_RANDOM.VALUE)
WHERE ROWNUM <= &var5
```

### Fetch information of top liked houses
Search result of top liked houses in selected area
```
SELECT *
FROM
	(SELECT h_id, latitude, longitude, count(*) as num
	FROM
		(SELECT h_id, latitude, longitude
		FROM house 
		WHERE latitude < &var1 and latitude > &var2 and longitude < &var3 and longitude > &var4)
		NATURAL JOIN
		likes
	GROUP BY h_id, latitude, longitude
	ORDER BY num DESC)
WHERE ROWNUM <= &var5
```


### Fetch information of top viewed houses
Search result of top viewed houses in selected area
```
SELECT *
FROM
	(SELECT h_id, latitude, longitude, count(*) as num
	FROM
		(SELECT h_id, latitude, longitude
		FROM house 
		WHERE latitude < &var1 and latitude > &var2 and longitude < &var3 and longitude > &var4)
		NATURAL JOIN
		(SELECT * FROM viewed
		UNION
		SELECT * FROM FANG.viewed)
	GROUP BY h_id, latitude, longitude
	ORDER BY num DESC)
WHERE ROWNUM <= &var5
```
### Counting function
The total amount of user(buyer/seller), houses, and history record of like/viewed operation
```
SELECT COUNT(*)
FROM acc_user

SELECT COUNT(*)
FROM buyer

SELECT COUNT(*)
FROM seller

SELECT COUNT(*)
FROM house

SELECT COUNT(*)
FROM viewed

SELECT COUNT(*) 
FROM FANG.viewed

SELECT COUNT(*)
FROM likes

SELECT COUNT(*) 
FROM FANG.bought_house
```


## _Advanced search_
User can search their aimed houses by inputting several keywords
### Search houses
```
SELECT *
FROM (
	SELECT h_id, latitude, longitude, bedroomCnt, bathroomCnt, buildingQualityID, livingAreaSize, lotSize, zip, storyNum, price, yearBuilt
	FROM house
	WHERE zip = &var1 and price >= &var2 and price <= &var3 and bedroomCnt >= &var4 and bathroomCnt >= &var5 and buildingQualityID >= &var6
		and livingAreaSize >= &var7 and story >= &var8 and lotSize >= &var9 and yearBuilt >= &var10)
WHERE ROWNUM <= &var11
```

## _Home Buyers_

### Buy a house
```
DELETE FROM viewed WHERE h_id = &var1
DELETE FROM FANG.viewed WHERE h_id = &var1
DELETE FROM likes WHERE h_id = &var1
SELECT * FROM house WHERE h_id = &var1
INSERT INTO FANG.bought_house VALUES (&var1, &var2, &var3, &var4, &var5, &var6, &var7, &var8, 
	&var9, &var10, &var11, &var12, &var13, &var14, &var15, &var16)
DELETE FROM house WHERE h_id = &var1
```
### Fetch houses which have already been bought by the user
```
SELECT h_id, latitude, longitude FROM FANG.bought_house WHERE u_id = &var1
```

## _Home sellers_

### Fetch information of own houses
```
SELECT h_id, latitude, longitude FROM house WHERE u_id = &var1
```

### Delete a house
Seller can delete own house record
```
DELETE FROM viewed WHERE h_id = &var1
DELETE FROM FANG.viewed WHERE h_id = &var1
DELETE FROM likes WHERE h_id = &var1
DELETE FROM house WHERE h_id = &var1
```

### Sell a house
```
INSERT INTO house VALUES (&var1, &var2, &var3, &var4, &var5, &var6, &var7, &var8, &var9, &var10, &var11, &var12, &var13, &var14, &var15, &var16)
```

### Update information of a house
```
UPDATE house SET bathroomCnt = &var1, bedroomCnt = &var2, buildingQualityID = &var3, livingAreaSize = &var4, latitude = &var5, longitude = &var6, 
    lotSize = &var7, zip = &var8, yearBuilt = &var9, storyNum = &var10, price = &var11, tax = &var12 WHERE h_id = &var13
```

## _Preferences_

### Add a house to like list
```
INSERT INTO likes VALUES(&var1, &var2)
```

### Remove a house from like list
```
DELETE FROM likes WHERE u_id = &var1 and h_id = &var2
```

### Fetch liked houses of the user
A like list of the user
```
SELECT house.h_id, latitude, longitude FROM house, likes WHERE house.h_id = likes.h_id and likes.u_id = &var1
```

### Fetch viewed houses of the user
A browsing history of the user
```
SELECT house.h_id, latitude, longitude, time
FROM (SELECT * FROM viewed 
	 union 
	 SELECT * FROM FANG.viewed) v,
	 house 
WHERE house.h_id = v.h_id and v.u_id = &var1
```

## _Others_

### Fetch users who liked the house
```
SELECT u_id FROM likes WHERE h_id = &var1
```

### Fetch users who viewed the house
```
SELECT u_id
FROM (SELECT * FROM viewed
	 UNION
	 SELECT * FROM FANG.viewed)
WHERE h_id = &var1
```

### Add visited pages to viewed list
```
INSERT INTO viewed VALUES(&var1, &var2, to_date(&var3,'YYYY-MM-DD'))
```

### Get buy history
```
SELECT h_id, latitude, longitude FROM FANG.bought_house WHERE u_id = &var1
```

### Determine whether a user is popular
```
SELECT *
FROM
	(SELECT count(*) as likecount
	FROM
		((SELECT h_id
		FROM house
		WHERE u_id = &var1)
		NATURAL JOIN
		likes)),
	(SELECT count(*) as viewcount
	FROM
		((SELECT h_id
		FROM house
		WHERE u_id = &var1)
		NATURAL JOIN
		(SELECT * FROM viewed
		UNION
		SELECT * FROM FANG.viewed)))
```

### Determine whether a user is active
```
SELECT count(*)
FROM (SELECT * FROM viewed
      UNION
      SELECT * FROM FANG.viewed)
WHERE u_id = &var1 and time > to_date(&var2,'YYYY-MM-DD')
```