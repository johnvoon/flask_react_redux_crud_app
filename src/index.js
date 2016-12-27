import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from './store';

import App from './components/App';
import BlogHome from './containers/BlogHome/index';
import AdminPosts from './containers/AdminPosts/index';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/blog" component={BlogHome}/>
        <Route path="admin/blogs" component={AdminPosts}/>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);

