-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 06, 2024 at 09:32 AM
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
CREATE DATABASE IF NOT EXISTS delivery;
USE delivery;

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(10) UNSIGNED NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `customer_id` int(10) UNSIGNED DEFAULT NULL,
  `specific_address` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `fullname`, `phone_number`, `is_default`, `created_at`, `updated_at`, `customer_id`, `specific_address`, `latitude`, `longitude`) VALUES
(7, 'Nguyen Van A', '0333444666', 1, '2024-11-03 12:51:25', '2024-11-03 12:51:25', 2, 'Yersin, Thu Dau Mot, Viet Nam', '10.989384698857984', '106.6672152876981'),
(8, 'Ho Tien', '033939393', 1, '2024-11-04 09:21:19', '2024-11-04 09:21:19', 11, 'Thanh Hoa, Viet Nam', '37.786000666713804', '-122.39972831942353');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `total_price` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `customer_id` int(10) UNSIGNED DEFAULT NULL,
  `delivery_id` int(10) UNSIGNED DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `specific_address` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `created_at`, `updated_at`, `total_price`, `status`, `customer_id`, `delivery_id`, `fullname`, `phone_number`, `specific_address`, `latitude`, `longitude`) VALUES
(15, '2024-11-03 12:59:34', '2024-11-04 09:25:16', 30000, 'canceled', 2, 10, 'Nguyen Van A', '0333444666', 'Yersin, Thu Dau Mot, Viet Nam', '10.989384698857984', '106.6672152876981'),
(16, '2024-11-04 09:21:53', '2024-11-04 09:25:06', 372000, 'delivering', 11, 10, 'Ho Tien', '033939393', 'Thanh Hoa, Viet Nam', '37.786000666713804', '-122.39972831942353');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `import_price` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `order_id` int(10) UNSIGNED DEFAULT NULL,
  `product_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `quantity`, `price`, `import_price`, `created_at`, `updated_at`, `order_id`, `product_id`) VALUES
(35, 1, 15000, '7000', '2024-11-03 12:59:34', '2024-11-03 12:59:34', 15, 16),
(36, 1, 15000, '7000', '2024-11-03 12:59:34', '2024-11-03 12:59:34', 15, 17),
(37, 1, 55000, '20000', '2024-11-04 09:21:53', '2024-11-04 09:21:53', 16, 10),
(38, 1, 159000, '50000', '2024-11-04 09:21:53', '2024-11-04 09:21:53', 16, 11),
(39, 1, 79000, '20000', '2024-11-04 09:21:53', '2024-11-04 09:21:53', 16, 13),
(40, 1, 79000, '20000', '2024-11-04 09:21:53', '2024-11-04 09:21:53', 16, 12);

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
(10, 'Cheese ring burger ( new )', 'Burger phô mai vòng', 20000, 55000, 55000, 9999, 'https://burgerking.vn/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/h/cheese-ring-burger_1.jpg', '2024-11-03 12:32:19', '2024-11-03 12:32:19'),
(11, 'Combo kuro ninja tempura burger', 'Combo 1 Kuro Ninja Tempura Burger. + 1 Nước + 1 Khoai', 50000, 159000, 159000, 9999, 'https://burgerking.vn/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/o/combo-kuro_downsize.jpg', NULL, NULL),
(12, 'Kuro ninja tempura burger jr.', 'Burger Tempura Rau Củ & Bò nướng lửa hồng với vỏ bánh đen', 20000, 79000, 79000, 9999, 'https://burgerking.vn/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/k/u/kuro-jr_1.jpg', NULL, NULL),
(13, 'Cheese ring burger combo', 'Combo Burger phô mai vòng', 20000, 79000, 79000, 9999, 'https://burgerking.vn/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/o/combo-cheese-ring-burger.jpg', NULL, NULL),
(14, 'Bbq wing rice combo', 'Cơm cánh gà nướng BBQ + 1 Đồ uống', 10000, 45000, 45000, 9999, 'https://burgerking.vn/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/o/combo-co_m-ga_.jpg', NULL, NULL),
(15, 'Cheese ring snack ( new )', 'Phô mai vàng', 5000, 35000, 3500, 9999, 'https://burgerking.vn/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/h/cheese-ring.jpg', NULL, NULL),
(16, 'Coca', 'Coca', 7000, 15000, 15000, 9999, 'https://burgerking.vn/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/o/coke-2.jpg', '2024-11-03 16:32:35', NULL),
(17, 'Dasani', 'Dasani', 7000, 15000, 15000, 9999, 'https://burgerking.vn/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/o/copy_of_n_c-su_i.jpg', NULL, NULL),
(18, 'New San Pham', 'San Pham moi', 100002, 200000, 200000, 9999, 'https://burgerking.vn/media/catalog/product/cache/1/small_image/1000x/9df78eab33525d08d6e5fb8d27136e95/c/o/copy_of_n_c-su_i.jpg', '2024-11-04 09:24:14', '2024-11-04 09:24:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `picture` longtext DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `otp_code` varchar(255) NOT NULL,
  `otp_expired` datetime NOT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `fullname`, `picture`, `role`, `otp_code`, `otp_expired`, `is_verified`, `created_at`, `updated_at`) VALUES
(2, 'customer@gmail.com', '$2a$10$Pp4fJ2KW.6upTOB69ZzHS.f/d/PRjTuAD8B0UTcN/4hWqE4NoC.Ta', 'Customer', 'https://tq1.mediacdn.vn/thumb_w/660/203336854389633024/2022/8/4/images290467124nwjc-16595980054491270570851.jpeg', 'customer', '408980', '2024-10-26 13:03:57', 1, '2024-10-26 12:53:57', '2024-10-26 12:53:57'),
(9, 'admin@gmail.com', '$2a$10$PBldrKLwOZUOZ5XaV5HO2e9GxKc1pNvs6mVrwr3gu6mcGPsN6Mr9i', 'Admin', NULL, 'admin', '090897', '2024-11-01 15:11:22', 1, '2024-11-01 15:01:22', '2024-11-01 15:01:41'),
(10, 'deliveryStaff@gmail.com', '$2a$10$Pp4fJ2KW.6upTOB69ZzHS.f/d/PRjTuAD8B0UTcN/4hWqE4NoC.Ta', 'Delivery Staff', NULL, 'delivery-staff', '', '2024-11-03 13:22:29', 1, NULL, NULL),
(11, 'keganvn2@gmail.com', '$2a$10$9jFeddita/Y.dIbgY1OO1uuZuI/YstO1UKm7IEfPKc7O208eKkkQy', 'Kegan', NULL, 'customer', '720619', '2024-11-04 09:29:43', 1, '2024-11-04 09:19:43', '2024-11-04 09:20:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `delivery_id` (`delivery_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`delivery_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_421` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_422` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
