-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2026 at 04:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `menuId` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `isBestSeller` tinyint(1) NOT NULL DEFAULT 0,
  `typeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`menuId`, `name`, `price`, `isBestSeller`, `typeId`) VALUES
(9, 'เค้กแครอท', 50, 1, 4),
(10, 'เค้กมัทฉะ', 50, 1, 4),
(11, 'เค้กฟักทอง', 50, 0, 4),
(12, 'แครอทลาเต้', 50, 0, 5),
(13, 'มัทฉะลาเต้', 50, 1, 5),
(14, 'ฟักทองลาเต้', 50, 0, 5),
(15, 'ไอศกรีมแครอท', 50, 0, 6),
(16, 'ไอศกรีมมัทฉะ', 50, 1, 6),
(17, 'ไอศกรีมฟักทอง', 50, 0, 6);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `userId` int(11) NOT NULL,
  `menuId` int(11) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`userId`, `menuId`, `value`) VALUES
(2, 9, 5);

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `tokenHash` varchar(64) NOT NULL,
  `userId` int(11) NOT NULL,
  `expiresAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`tokenHash`, `userId`, `expiresAt`) VALUES
('9a443e4b0804411804d3689629aa5da0d39cf9197aac15a83fabd23bd5bb161e', 2, '2026-10-26 14:39:03.057'),
('c36772c612bf6c3bd5c99a667d5e60504e642e540c30f79721d6683afab83daa', 2, '2026-10-26 14:45:15.692'),
('f870f066e41722982fa39cfac550bcf61394ae22e03ca6bc790d868f1eb5c32c', 2, '2026-10-26 14:25:27.531');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `typeId` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`typeId`, `name`) VALUES
(4, 'เค้ก'),
(5, 'ชา'),
(6, 'ไอศกรีม');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `name`, `email`, `passwordHash`, `role`) VALUES
(1, 'Admin', 'admin@neptuny.local', 'ff413af4ad98b50c254c86b1ccafc395:a97708f7e56feeb1e4f89b5f25b5efab67fde4c99ed3554d88c4965d5d705f8aac13fd2e7cc313452302436ad671312af4e1d124e82248c1cb807899a7834980', 'admin'),
(2, 'User', 'user@neptuny.local', 'a5a19eab8eb5796e4afe690163ad0d9e:986154b182a624e4e96fe0d345aeb0bc24023fac5c96c420259977de6100880175405216bd00f7454158ad24d564e868248aac87b03c28f865ba45d12334d6aa', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`menuId`),
  ADD KEY `Menu_typeId_fkey` (`typeId`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`userId`,`menuId`),
  ADD KEY `Rating_menuId_fkey` (`menuId`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`tokenHash`),
  ADD KEY `Session_userId_fkey` (`userId`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`typeId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `menuId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `typeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `Menu_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `type` (`typeId`) ON UPDATE CASCADE;

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `Rating_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu` (`menuId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Rating_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
