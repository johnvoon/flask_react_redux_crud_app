import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './store';
import '../styles/styles.scss';
import '../styles/styles.less';
import 'react-date-picker/index.css';
import App from './App/index';
import HomePage from './HomePage/index';
import BlogHome from './BlogHome/index';
import AdminDashboard from './AdminDashboard/index';
import AdminPosts from './AdminPages/AdminPosts';
import AdminUsers from './AdminPages/AdminUsers';
import AdminComments from './AdminPages/AdminComments';
import BlogPost from './BlogPost/index';
import PracticeAreas from './PracticeAreas/index';
import PracticeArea from './PracticeArea/index';
import Login from './Authentication/Login';
import Logout from './Authentication/Logout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import fetchPracticeAreas from './Entities/actions';

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
          <Route path="admin/posts/:id/comments" component={AdminComments}/>
          <Route path="/blog/:id" component={BlogPost}/>
          <Route path="/practice-areas" component={PracticeAreas}/>
          <Route path="/practice-areas/:practiceArea" component={PracticeArea} onEnter={fetchPracticeAreas}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root')
);

