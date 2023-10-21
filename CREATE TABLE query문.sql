-- board table create
CREATE TABLE `board` (
  `boardid` int NOT NULL AUTO_INCREMENT,
  `loginid` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL DEFAULT 'pw',
  `name` varchar(20) NOT NULL,
  `date` varchar(8) DEFAULT NULL,
  `content` text,
  `title` varchar(200) NOT NULL,
  PRIMARY KEY (`boardid`)
);
-- book table create
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `publisher` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `stock` int NOT NULL,
  `pubdate` varchar(8) NOT NULL,
  `pagenum` int DEFAULT NULL,
  `ISBN` varchar(30) NOT NULL,
  `ebook` varchar(1) NOT NULL,
  `kdc` varchar(20) DEFAULT NULL,
  `img` varchar(30) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `nation` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
-- calendar table create
CREATE TABLE `calendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);
-- cart table create
CREATE TABLE `webdb2022`.`cart` (
  `cartid` int NOT NULL AUTO_INCREMENT,
  `custid` varchar(10) NOT NULL,
  `bookid` int NOT NULL,
  `cartdate` varchar(8) NOT NULL,
  `qty` int DEFAULT NULL,
  PRIMARY KEY (`cartid`)
);
-- namecard table create
CREATE TABLE `namecard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
-- person table create
CREATE TABLE `person` (
  `loginid` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `tel` varchar(13) DEFAULT NULL,
  `birth` varchar(8) NOT NULL,
  `class` varchar(2) NOT NULL DEFAULT 'B',
  `grade` varchar(2) NOT NULL DEFAULT 'B',
  PRIMARY KEY (`loginid`)
);
-- purchase table create
CREATE TABLE `purchase` (
  `purchaseid` int NOT NULL AUTO_INCREMENT,
  `custid` varchar(10) NOT NULL,
  `bookid` int NOT NULL,
  `purchasedate` varchar(8) NOT NULL,
  `price` int DEFAULT NULL,
  `point` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `cancel` varchar(1) NOT NULL DEFAULT 'N',
  `refund` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`purchaseid`)
);