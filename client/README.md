# A24 Library Frontend

## Project description

The frontend part of the Library System, where the users can borrow and return books, rate them, write a review about a book they have borrowed, read all the reviews about a book and rate the reviews.

## Tech stack

This is a JavaScript application. The main packages, that are used are:

- ReactJS
- Bootstrap
- Sweetalert

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Directory Structure

```bash
client
├── public
│   ├── index.html
├── src
│   ├── common
│   │   ├── **/*.js
│   ├── components
│   │   ├── AllBooks
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── CreateBook
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── Footer
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── Home
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── Loader
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── Logout
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── NavigationBar
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── NotFound
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── RateStars
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── Register
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── Reviews
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── Seacher
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── SingleBook
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── UserBookActivity
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   ├── containers
│   │   ├── AdminUsers
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── AllBooks
│   │   │   └── **/*.js
│   │   ├── CreateBook
│   │   │   └── **/*.js
│   │   ├── MyReviews
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   │   ├── Rate
│   │   │   └── **/*.js
│   │   ├── Reviews
│   │   │   └── **/*.js
│   │   ├── Search
│   │   │   └── **/*.js
│   │   ├── SingleBook
│   │   │   └── **/*.js
│   │   ├── UserBookActivity
│   │   │   ├── **/*.js
│   │   │   └── **/*.css
│   ├── contexts
│   │   ├── **/*.js
│   ├── custom-hooks
│   │   ├── **/*.js
│   ├── resources
│   │   ├── **/*.css
│   │   └── **/*.png
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .dockerignore
├── .eslintrc.js
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

## Available scripts

In the project directory, you can run:

### Start

```sh
npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

### Build

```sh
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. The app is ready to be deployed!

### Eject

```sh
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
