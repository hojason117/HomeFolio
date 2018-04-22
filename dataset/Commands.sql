/* Database schema and initializations */

drop table comments cascade constraints;
drop table likes cascade constraints;
drop table viewed cascade constraints;
drop table buyer cascade constraints;
drop table acc_user cascade constraints;
drop table house cascade constraints;
drop table seller cascade constraints;

/*-------------------------------------------------------------*/

create table acc_user (
    u_id        varchar2(50)     primary key,
    email       varchar2(50)     unique not null,
    username    varchar2(30)     not null,
    password    varchar2(20)     not null,
    age         number(3),
    area        varchar2(40),
    bio         varchar2(300));

create table buyer (
    u_id   varchar2(50) references acc_user(u_id)   primary key);

create table seller (
    u_id   varchar2(50) references acc_user(u_id)   primary key);
    
create table house(
    h_id                varchar2(50)    primary key,
    u_id                varchar2(50)    references seller(u_id),
    address             varchar2(100)   not null,
    bathroomCnt         number(3)       not null,
    bedroomCnt          number(3)       not null,
    buildingQualityID   number(2)       not null,
    livingAreaSize      number(10)      not null,
    latitude            number(10, 6)   not null,
    longitude           number(10, 6)   not null,
    lotSize             number(10)      not null,
    cityID              number(10)      not null,
    county              varchar(30)     not null,
    zip                 number(5)       not null,
    yearBuilt           number(4)       not null,
    storyNum            number(3)       not null,
    price               number(10)      not null,
    tax                 number(10, 2)   not null);
    
create table comments(
    u_id    varchar2(50)    references buyer(u_id),
    h_id    varchar2(50)    references house(h_id),
    time    timestamp       not null,
    content varchar2(300)   not null,
    
    constraint comments_id primary key (u_id, h_id, time));

create table likes(
    u_id    varchar2(50)    references buyer(u_id),
    h_id    varchar2(50)    references house(h_id),
    
    constraint likes_id primary key (u_id, h_id));
    
create table viewed(
    u_id    varchar2(50)    references acc_user(u_id),
    h_id    varchar2(50)    references house(h_id),
    time    date            not null,
    
    constraint viewed_id primary key (u_id, h_id));

/*-------------------------------------------------------------*/

grant ALL PRIVILEGES on acc_user to FANG, TIANYU, CWEI;
grant ALL PRIVILEGES on buyer to FANG, TIANYU, CWEI;
grant ALL PRIVILEGES on comments to FANG, TIANYU, CWEI;
grant ALL PRIVILEGES on house to FANG, TIANYU, CWEI;
grant ALL PRIVILEGES on likes to FANG, TIANYU, CWEI;
grant ALL PRIVILEGES on seller to FANG, TIANYU, CWEI;
grant ALL PRIVILEGES on viewed to FANG, TIANYU, CWEI;

/*-------------------------------------------------------------*/   

INSERT INTO acc_user VALUES ('fa4a980e-3e05-11e8-a64f-4a0005fac3b0','test@gmail.com','test','test', null, null, null);
INSERT INTO seller VALUES ('fa4a980e-3e05-11e8-a64f-4a0005fac3b0');
INSERT INTO buyer VALUES ('fa4a980e-3e05-11e8-a64f-4a0005fac3b0');

/*************************************************************************************************************************/

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

/* SearchHouse */
SELECT *
FROM (
	SELECT h_id, latitude, longitude, bedroomCnt, bathroomCnt, buildingQualityID, livingAreaSize, lotSize, zip, storyNum, price, yearBuilt
	FROM house
	WHERE zip = &var1 and price >= &var2 and price <= &var3 and bedroomCnt >= &var4 and bathroomCnt >= &var5 and buildingQualityID >= &var6
		and livingAreaSize >= &var7 and story >= &var8 and lotSize >= &var9 and yearBuilt >= &var10)
WHERE ROWNUM <= &var11

/* FetchOwnHouse */
SELECT h_id, latitude, longitude FROM house WHERE u_id = &var1

/* FetchLikedHouse */
SELECT house.h_id, latitude, longitude FROM house, likes WHERE house.h_id = likes.h_id and likes.u_id = &var1

/* FetchViewedHouse */
SELECT house.h_id, latitude, longitude, time FROM house, viewed WHERE house.h_id = viewed.h_id and viewed.u_id = &var1

/* Sell */
INSERT INTO house VALUES (&var1, &var2, &var3, &var4, &var5, &var6, &var7, &var8, &var9, &var10, &var11, &var12, &var13, &var14, &var15, &var16)

/* UpdateHouseInfo */
UPDATE house SET bathroomCnt = &var1, bedroomCnt = &var2, buildingQualityID = &var3, livingAreaSize = &var4, latitude = &var5, longitude = &var6, 
    lotSize = &var7, zip = &var8, yearBuilt = &var9, storyNum = &var10, price = &var11, tax = &var12 WHERE h_id = &var13


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




