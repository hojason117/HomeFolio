/* Signup */
SELECT * FROM acc_user WHERE email = &var1 and password = &var2
INSERT INTO acc_user VALUES (&var1, &var2, &var3, &var4, &var5, &var6, &var7)
INSERT INTO seller VALUES (&var1)
INSERT INTO buyer VALUES (&var1)

/* Login */
SELECT * FROM acc_user WHERE email = &var1 and password = &var2
SELECT * FROM seller WHERE u_id = &var1
SELECT * FROM buyer WHERE u_id = &var1

/* FetchUserInfo */
SELECT * FROM acc_user WHERE u_id = &var1
SELECT * FROM seller WHERE u_id = &var1
SELECT * FROM buyer WHERE u_id = &var1

/* UpdateUserInfo */
SELECT * FROM acc_user WHERE u_id = &var1
UPDATE acc_user SET username = &var1, password = &var2, age = &var3, area = &var4, bio = &var5 WHERE u_id = &var6

/* FetchSingleHouseInfo */
SELECT * FROM house WHERE h_id = &var1

/* FetchRegionHouseInfo */
SELECT *
FROM (
	SELECT h_id, latitude, longitude
	FROM house
	WHERE latitude < &var1 and latitude > &var2 and longitude < &var3 and longitude > &var4
	ORDER BY DBMS_RANDOM.VALUE)
WHERE ROWNUM <= &var5

/* FetchTopLikedHouses */
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

/* FetchTopViewedHouses */
SELECT *
FROM
	(SELECT h_id, latitude, longitude, count(*) as num
	FROM
		(SELECT h_id, latitude, longitude
		FROM house 
		WHERE latitude < &var1 and latitude > &var2 and longitude < &var3 and longitude > &var4)
		NATURAL JOIN
		viewed
	GROUP BY h_id, latitude, longitude
	ORDER BY num DESC)
WHERE ROWNUM <= &var5

/* GetTupleCount */
SELECT COUNT(*)
FROM acc_user;

SELECT COUNT(*)
FROM buyer;

SELECT COUNT(*)
FROM seller;

SELECT COUNT(*)
FROM chat;

SELECT COUNT(*)
FROM comments;

SELECT COUNT(*)
FROM house;

SELECT COUNT(*)
FROM viewed;

SELECT COUNT(*)
FROM likes;

/* BuyHouse */
DELETE FROM viewed WHERE h_id = &var1
DELETE FROM likes WHERE h_id = &var1
DELETE FROM house WHERE h_id = &var1


/*************************************************************************************************************************/

/* INSERT */
/* 1. New user sign up */
/* INSERT INTO CHHO.ACC_USER VALUES ('u_id','email','username','password','age','area','bio');*/
/* INSERT INTO acc_user VALUES (:var1, :var2, :var3, :var4, :var5, :var6, :var7, :var8) */


/* DELETE */


/* UPDATE */



/* SELECT */
/* 1. Enter house info page, show selected house all the info */
SELECT * from CHHO.HOUSE h
where h.h_id = 'dc83b8c7-46e0-4885-9874-05053b0c7c0f';

/* SELECT h.U_ID as u, h.BATHROOMCNT as ba, h.BEDROOMCNT as be, h.BUILDINGQUALITYID as q, h.LIVINGAREASIZE as area,
h.LOTSIZE as lot, h.LATITUDE as lat, h.LONGITUDE as long, h.CITYID as c, h.COUNTY as co, h.ZIP as zip,
h.YEARBUILT as year, h.STORYNUM as st, h.PRICE as p, h.TAX as tax from CHHO.HOUSE h
where h.H_ID = 'dc83b8c7-46e0-4885-9874-05053b0c7c0f'; */

/* 2. Select the most liked 50 houses */
SELECT t.c as likes, h.ZIP, h.BEDROOMCNT, h.BATHROOMCNT, h.LIVINGAREASIZE, h.PRICE from
(select * from
(SELECT H_ID, count(U_ID) as c from CHHO.LIKES
group by H_ID
order by c desc nulls last)
where rownum <=50) t, CHHO.HOUSE h
where t.H_ID = h.H_ID;


/* 3. Select the most viewed 50 houses in 30 days */
SELECT t.c as viewed, h.ZIP, h.BEDROOMCNT, h.BATHROOMCNT, h.LIVINGAREASIZE, h.PRICE from
(select * from
(SELECT H_ID, count(U_ID) as c from CHHO.VIEWED
group by H_ID
order by c desc nulls last)
where rownum <=50) t, CHHO.HOUSE h
where t.H_ID = h.H_ID;

/* need add DATEDIFF(day, '2005-12-30 23:59:59.9999999', '2006-01-01 00:00:00.0000000') < 30 */

/*estimate the price*/
select AVG(price) from CHHO.HOUSE h, 
(SElECT livingAreaSize, yearBuilt, zip from CHHO.HOUSE
where 
CHHO.HOUSE.u_id = '30d41ea8-135a-436b-bff4-794e8d5ebdc3' and 
livingAreaSize = 2033 and
yearBuilt = 1984 and
zip = 96364) e
where 
h.livingAreaSize in (select livingAreaSize from CHHO.HOUSE
where livingAreaSize
Between e.livingAreaSize + 50 and e.livingAreaSize - 50 
)
and h.yearBuilt in (select yearBuilt from CHHO.HOUSE
where yearBuilt
Between e.yearBuilt + 5 and e.yearBuilt - 5
)
and 
h.zip = e.zip;




