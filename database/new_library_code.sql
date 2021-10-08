-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema library
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema library
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `library` DEFAULT CHARACTER SET utf8mb4 ;
USE `library` ;

-- -----------------------------------------------------
-- Table `library`.`authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`authors` (
  `author_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`author_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`generes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`generes` (
  `genre_id` INT NOT NULL AUTO_INCREMENT,
  `genre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`genre_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`book_statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`book_statuses` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`status_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`books` (
  `book_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `image` text NOT NULL,
  `description` text NOT NULL,
  `author_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `is_deleted` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`book_id`),
  INDEX `fk_books_authors_idx` (`author_id` ASC),
  INDEX `fk_books_generes1_idx` (`genre_id` ASC),
  INDEX `fk_books_book_statuses1_idx` (`status_id` ASC),
  CONSTRAINT `fk_books_authors`
    FOREIGN KEY (`author_id`)
    REFERENCES `library`.`authors` (`author_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_books_generes1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `library`.`generes` (`genre_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_books_book_statuses1`
    FOREIGN KEY (`status_id`)
    REFERENCES `library`.`book_statuses` (`status_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`ban_statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`ban_statuses` (
  `ban_status_id` INT NOT NULL AUTO_INCREMENT,
  `is_banned` TINYINT NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`ban_status_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(75) NOT NULL,
  `is_admin` TINYINT NULL,
  `ban_status_id` INT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_users_ban_statuses1_idx` (`ban_status_id` ASC),
  CONSTRAINT `fk_users_ban_statuses1`
    FOREIGN KEY (`ban_status_id`)
    REFERENCES `library`.`ban_statuses` (`ban_status_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`reviews` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `book_id` INT NOT NULL,
  `user_id` INT NULL,
  `text` VARCHAR(45) NOT NULL,
  `is_deleted` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`review_id`),
  INDEX `fk_reviews_books1_idx` (`book_id` ASC),
  INDEX `fk_reviews_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_reviews_books1`
    FOREIGN KEY (`book_id`)
    REFERENCES `library`.`books` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reviews_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `library`.`users` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `library`.`votes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`votes` (
  `vote_id` INT NOT NULL AUTO_INCREMENT,
  `vote` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`vote_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`user_liked_reviews`
-- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `library`.`user_liked_reviews` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `user_id` INT NULL,
   `review_id` INT NOT NULL,
   `vote_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_liked_reviews_users1_idx` (`user_id` ASC),
  INDEX `fk_user_liked_reviews_reviews1_idx` (`review_id` ASC),
  INDEX `fk_user_liked_reviews_votes1_idx` (`vote_id` ASC),
  CONSTRAINT `fk_user_liked_reviews_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `library`.`users` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_liked_reviews_reviews1`
    FOREIGN KEY (`review_id`)
    REFERENCES `library`.`reviews` (`review_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_liked_reviews_votes1`
    FOREIGN KEY (`vote_id`)
    REFERENCES `library`.`votes` (`vote_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `book_id` INT NOT NULL,
  `borrowed` DATETIME NULL DEFAULT NULL,
  `returned` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_history_users1_idx` (`user_id` ASC),
  INDEX `fk_history_books1_idx` (`book_id` ASC),
  CONSTRAINT `fk_history_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `library`.`users` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_history_books1`
    FOREIGN KEY (`book_id`)
    REFERENCES `library`.`books` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`book_rates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`book_rates` (
  `rate_id` INT NOT NULL AUTO_INCREMENT,
  `book_id` INT NOT NULL,
  `user_id` INT NULL,
  `rate` INT NOT NULL,
  PRIMARY KEY (`rate_id`),
  INDEX `fk_book_rates_books1_idx` (`book_id` ASC),
  INDEX `fk_book_rates_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_book_rates_books1`
    FOREIGN KEY (`book_id`)
    REFERENCES `library`.`books` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_book_rates_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `library`.`users` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

