import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from './store';
import App from './components/App';
import BlogHome from './BlogHome/index';
import AdminDashboard from './AdminDashboard/index';
import AdminPosts from './AdminPages/AdminPosts';
import AdminUsers from './AdminPages/AdminUsers';
import BlogPost from './BlogPost/index';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/blog" component={BlogHome}/>
        <Route path="/admin" component={AdminDashboard}/>
        <Route path="admin/posts" component={AdminPosts}/>
        <Route path="admin/users" component={AdminUsers}/>
        <Route path="/blog/:id" component={BlogPost}/>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);


