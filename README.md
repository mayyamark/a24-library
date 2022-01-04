# A24 library

## Project Description

An end-to-end application for a Library System, where the users can borrow and return books, rate them, write a review about a book they have borrowed, read all the reviews about a book and rate the reviews.

The application has:

- **Public part**, which is accessible without authentication. It includes:
  - Homepage
  - Register form
  - Login form
- **Private part**, which is available for registered users. It includes UI for:
  - Retrieving all books
  - Viewing individual book
  - Borrowing/Returning a book
  - Creating/Reading/Updating/Deleting book reviews
  - Liking reviews
  - Rating books
- **Administration part**, which is available for admin users only. It includes a UI for:
  - CRUD any books/reviews
  - Banning users
  - Deleting users

## Tech stack

The main technologies that are used in this project are:

- JavaScript:
  - [React JS](https://reactjs.org/)
  - [Bootstrap](https://getbootstrap.com/)
  - [Express JS](https://expressjs.com/)
  - [Passport JS](https://www.passportjs.org/)
- [MariaDB](https://mariadb.org/)
- [Docker](https://www.docker.com/)

## Directory Structure

```bash
├── client
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── common
│   │   │   └── **/*.js
│   │   ├── components
│   │   │   ├── AllBooks
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── CreateBook
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── Footer
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── Home
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── Loader
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── Logout
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── NavigationBar
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── NotFound
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── RateStars
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── Register
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── Reviews
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── Seacher
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── SingleBook
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   └── UserBookActivity
│   │   │       ├── **/*.js
│   │   │       └── **/*.css
│   │   ├── containers
│   │   │   ├── AdminUsers
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── AllBooks
│   │   │   │   └── **/*.js
│   │   │   ├── CreateBook
│   │   │   │   └── **/*.js
│   │   │   ├── MyReviews
│   │   │   │   ├── **/*.js
│   │   │   │   └── **/*.css
│   │   │   ├── Rate
│   │   │   │   └── **/*.js
│   │   │   ├── Reviews
│   │   │   │   └── **/*.js
│   │   │   ├── Search
│   │   │   │   └── **/*.js
│   │   │   ├── SingleBook
│   │   │   │   └── **/*.js
│   │   │   └── UserBookActivity
│   │   │       ├── **/*.js
│   │   │       └── **/*.css
│   │   ├── contexts
│   │   │   └── **/*.js
│   │   ├── custom-hooks
│   │   │   └── **/*.js
│   │   ├── resources
│   │   │   ├── **/*.css
│   │   │   └── **/*.png
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── .dockerignore
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── database
│   └── library.sql
└── server
│   ├── src
│   │   ├── auth
│   │   │   └── **/*.js
│   │   ├── controllers
│   │   │   └── **/*.js
│   │   ├── data
│   │   │   └── **/*.js
│   │   ├── middlewares
│   │   │   └── **/*.js
│   │   ├── services
│   │   │   └── **/*.js
│   │   ├── user-logout-data
│   │   │   └── **/*.js
│   │   ├── validators
│   │   │   └── **/*.schema.js
│   │   ├── app.js
│   │   └── config.js
│   ├── .dockerignore
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── docker-compose.yml
└── README.md
```

## Running guide

All you need is [Docker Compose](https://docs.docker.com/compose/). [Click here](https://docs.docker.com/compose/install/#install-compose) to get it.

### Start the application

Open a terminal in the root directory and run these commands:

- Build the services

```sh
docker-compose build
```

- Allow Docker to start and run the entire application

```sh
docker-compose up -d
```

### Interact with the application

There are a few options:

- Open `http://localhost:3000/` in a browser to see the web application.
- Open Postman and send a request. See the available endpoints in the readme file in the _server_ directory.
- Open `http://localhost:8080/` to open [phpMyAdmin](https://www.phpmyadmin.net/). It allows you to handle the administration of MySQL over the Web. The username and the password are pointed in the docker-compose.yml file.

### Tear it down

Open a terminal in the root directory and run this command:

```sh
docker-compose down --volumes
```
