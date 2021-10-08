CREATE SCHEMA IF NOT EXISTS `user_logout_db`;
USE `user_logout_db` ;

CREATE TABLE IF NOT EXISTS `user_logout_db`.`blacklist` (`token` VARCHAR(256) NOT NULL PRIMARY KEY);