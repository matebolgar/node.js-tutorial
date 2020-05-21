-- SELECT
--     select_expr [, select_expr] ...
--     [FROM table_references
--     [WHERE where_condition]
--     [GROUP BY]
--     [HAVING]
--     [ORDER BY {col_name | expr | position}
--       [ASC | DESC]
--     [LIMIT {[offset,] row_count | row_count OFFSET offset}]

-- 1.
-- Összes kocsi "nev", "oradij" oszlopokkal
SELECT name AS nev, hourlyRate AS oradij FROM `cars`

-- 2.
-- Összes olyan járat, amelyik 1 óránál tovább tartott
SELECT * FROM `trips` WHERE `numberOfMinutes` > 60

-- 3.
-- Összes olyan kocsi, amelyiknek az óradíja 2000 és 4000 között van 
SELECT * FROM `cars` WHERE `hourlyRate` BETWEEN 2000 AND 4000

-- 4.
-- Legrégebbi járat
SELECT * FROM `trips` ORDER BY date ASC LIMIT 1

-- 5.
-- A 2-es id-jú kocsi összes menetideje 
SELECT carId, SUM(numberOfMinutes) FROM `trips` GROUP BY carId HAVING carId = 2

-- 6.
-- Csak azon járatok, amelyek 3000-nél nagyobb óradíjú kocsihoz tartoznak
SELECT * FROM `trips` JOIN cars ON trips.carId = cars.id WHERE cars.hourlyRate > 3000


