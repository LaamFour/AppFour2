-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 01, 2024 at 03:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `delivery`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `import_price` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `promotional_price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` longtext NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `import_price`, `price`, `promotional_price`, `quantity`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Hamburger', 'description', 100, 100, 100, 100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HbfeqzdXyNb9IREQFJAwvxqTKlVbSIXAOm7jpZL5L3W_UOZpjACzfMXRawNIMOn0vU&usqp=CAU', '2024-10-26 12:55:03', '2024-10-26 12:55:03'),
(5, 'Cơm Phúc Lộc Thọ', 'description', 100, 100, 100, 100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HbfeqzdXyNb9IREQFJAwvxqTKlVbSIXAOm7jpZL5L3W_UOZpjACzfMXRawNIMOn0vU&usqp=CAU', '2024-10-28 15:15:07', '2024-10-28 15:15:07'),
(6, 'Cơm Phúc Lộc Thọ', 'description', 100, 100, 100, 100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HbfeqzdXyNb9IREQFJAwvxqTKlVbSIXAOm7jpZL5L3W_UOZpjACzfMXRawNIMOn0vU&usqp=CAU', '2024-10-28 15:15:08', '2024-10-28 15:15:08'),
(7, 'Cơm Phúc Lộc Thọ', 'description', 100, 100, 100, 100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HbfeqzdXyNb9IREQFJAwvxqTKlVbSIXAOm7jpZL5L3W_UOZpjACzfMXRawNIMOn0vU&usqp=CAU', '2024-10-28 15:15:10', '2024-10-28 15:15:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
