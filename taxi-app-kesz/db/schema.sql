-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: mysql_host:3306
-- Létrehozás ideje: 2020. Máj 16. 03:38
-- Kiszolgáló verziója: 10.1.39-MariaDB-1~bionic
-- PHP verzió: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `test_db`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `licenseNumber` varchar(7) NOT NULL,
  `hourlyRate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `cars`
--

INSERT INTO `cars` (`id`, `name`, `licenseNumber`, `hourlyRate`) VALUES
(1, 'Mercedes C', 'ASD-123', 3500),
(2, 'Suzuki Swift', 'DFG-456', 2000),
(3, 'Skoda Fabia', 'FGH-456', 3100);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `trips`
--

CREATE TABLE `trips` (
  `id` int(11) NOT NULL,
  `numberOfMinutes` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `carId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `trips`
--

INSERT INTO `trips` (`id`, `numberOfMinutes`, `date`, `carId`) VALUES
(1, 30, 1589414219, 2),
(2, 30, 1589515219, 1),
(3, 50, 1589515314, 2),
(4, 40, 1589516314, NULL),
(5, 70, 1589515218, NULL),
(6, 150, 1589514218, 1),
(7, 30, 1589514218, 2),
(8, 60, 1589514218, 2),
(9, 80, 1589512248, 3);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carId` (`carId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
