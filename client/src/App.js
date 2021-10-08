import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { UserRoleRoute, AdminRoleRoute } from './common/route-wrapper.js';
import { AuthProvider } from './contexts/AuthContext.js';
import AdminUsers from './containers/AdminUsers/AdminUsers';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './components/Home/Home.js';
import Register from './components/Register/Register';
import AllBooks from './containers/AllBooks/AllBooks';
import SingleBook from './containers/SingleBook/SingleBook';
import CreateBook from './containers/CreateBook/CreateBook.js';
import UserBookActivity from './containers/UserBookActivity/UserBookActivity';
import MyReviews from './containers/MyReviews/MyReviews.js';
import Search from './containers/Search/Search';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer.js';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationBar />
        <Switch>
          <Redirect path="/" exact to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Register} />
          <Route path="/logout" component={Register} />
          <UserRoleRoute exact path="/books" component={AllBooks} />
          <UserRoleRoute exact path="/books/:id" component={SingleBook} />
          <UserRoleRoute exact path="/reviews" component={MyReviews} />
          <UserRoleRoute exact path="/activity" component={UserBookActivity} />
          <UserRoleRoute exact path="/search" component={Search} />
          <AdminRoleRoute exact path="/admin/users" component={AdminUsers} />
          <AdminRoleRoute
            exact
            path="/admin/createBook"
            component={CreateBook}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
