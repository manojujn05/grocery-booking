-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2024 at 01:49 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grocery_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `grocery_items`
--

CREATE TABLE `grocery_items` (
  `Id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float(10,2) NOT NULL,
  `quantity` float(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grocery_items`
--

INSERT INTO `grocery_items` (`Id`, `name`, `price`, `quantity`) VALUES
(1, 'Lorem Ipsum', 100.00, 5.00),
(2, 'Pulses', 100.00, 50.00),
(3, 'Rice', 100.00, 50.00),
(4, 'Biscuit', 10.00, 50.00),
(6, 'Sugar', 40.00, 500.00);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `order_date` date NOT NULL,
  `total_amount` float(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Id`, `user_id`, `order_date`, `total_amount`) VALUES
(4, 1, '0000-00-00', 100.00),
(6, 1, '2024-02-26', NULL),
(7, 1, '2024-02-26', NULL),
(8, 1, '2024-02-26', NULL),
(9, 1, '2024-02-26', NULL),
(10, 1, '2024-02-26', NULL),
(11, 1, '2024-02-26', NULL),
(12, 1, '2024-02-26', NULL),
(13, 1, '2024-02-26', NULL),
(19, 2, '2024-02-26', 1000.00),
(20, 2, '2024-02-26', 1000.00),
(21, 2, '2024-02-26', 1200.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `Id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `item_id` int(10) NOT NULL,
  `quantity` int(10) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`Id`, `order_id`, `item_id`, `quantity`, `date`) VALUES
(11, 6, 1, 5, '2024-02-26'),
(12, 6, 2, 5, '2024-02-26'),
(13, 7, 1, 5, '2024-02-26'),
(14, 7, 2, 5, '2024-02-26'),
(15, 8, 1, 5, '2024-02-26'),
(16, 8, 2, 5, '2024-02-26'),
(17, 9, 1, 5, '2024-02-26'),
(18, 9, 2, 5, '2024-02-26'),
(19, 10, 1, 5, '2024-02-26'),
(20, 10, 2, 5, '2024-02-26'),
(21, 11, 1, 5, '2024-02-26'),
(22, 11, 2, 5, '2024-02-26'),
(23, 12, 1, 5, '2024-02-26'),
(24, 12, 2, 5, '2024-02-26'),
(25, 13, 1, 5, '2024-02-26'),
(26, 13, 2, 5, '2024-02-26'),
(37, 19, 1, 5, '2024-02-26'),
(38, 19, 2, 5, '2024-02-26'),
(39, 20, 1, 5, '2024-02-26'),
(40, 20, 2, 5, '2024-02-26'),
(41, 21, 1, 5, '2024-02-26'),
(42, 21, 2, 7, '2024-02-26');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(25) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `name`, `email`, `mobile`, `password`) VALUES
(1, 'manoj', 'manoj@gmail.com', '', '$2b$10$ExYm8/9axtTOpsr/5MBYru3OIZmVraLF0bpjzM9u0jkLVeWbeWTra');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grocery_items`
--
ALTER TABLE `grocery_items`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grocery_items`
--
ALTER TABLE `grocery_items`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
