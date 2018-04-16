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
(SElECT livingAreaSize, yearBuilt, lotSize from CHHO.HOUSE
where 
CHHO.HOUSE.u_id = '30d41ea8-135a-436b-bff4-794e8d5ebdc3' and 
livingAreaSize = 1612 and
yearBuilt = 1953 and
lotSize = 8108) e
where 
h.livingAreaSize in (select livingAreaSize from CHHO.HOUSE
where livingAreaSize
Between e.livingAreaSize + 100 and e.livingAreaSize - 100 
)
and h.yearBuilt in (select yearBuilt from CHHO.HOUSE
where yearBuilt
Between e.yearBuilt + 5 and e.yearBuilt - 5
)
and 
h.lotSize in (select lotSize from CHHO.HOUSE
where lotSize
Between e.lotSize + 500 and e.lotSize - 500
)

/*ratio of tax and price (local)*/
select h.tax/h.price * 100 as tax_price_ratio, h.h_id ,h.zip from (select h_id, price, tax, zip from CHHO.HOUSE) h
where h.zip = 96336
order by tax_price_ratio desc;

/*The oldest houses and their prices(local)*/
select h.h_id, h.yearBuilt, h.price, h.zip from CHHO.HOUSE h
where h.zip = 96336
order by h.yearBuilt asc;