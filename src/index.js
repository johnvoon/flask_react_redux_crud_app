import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './store';
import '../styles/styles.scss';
import '../styles/styles.less';
import App from './App/index';
import HomePage from './HomePage/index';
import BlogHome from './BlogHome/index';
import AdminDashboard from './AdminDashboard/index';
import AdminPosts from './AdminPages/AdminPosts';
import AdminUsers from './AdminPages/AdminUsers';
import BlogPost from './BlogPost/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore();

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={HomePage}/>
          <Route path="/blog" component={BlogHome}/>
          <Route path="/admin" component={AdminDashboard}/>
          <Route path="admin/posts" component={AdminPosts}/>
          <Route path="admin/users" component={AdminUsers}/>
          <Route path="/blog/:id" component={BlogPost}/>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root')
);

