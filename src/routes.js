import React from 'react';
import App from 'App/index';

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    getComponent(location, cb) {
      System.import('HomePage/index')
        .then(loadRoute(cb))
        .catch(errorLoading);
    }
  },
  childRoutes: [
    {
      path: 'blog',
      getComponent(location, cb) {
        System.import('BlogHome/index')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'admin',
      getComponent(location, cb) {
        System.import('AdminDashboard/index')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }     
    },
    {
      path: 'admin/posts',
      getComponent(location, cb) {
        System.import('Admin/Posts/index')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'admin/users',
      getComponent(location, cb) {
        System.import('Admin/Users/index')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'admin/practice-areas',
      getComponent(location, cb) {
        System.import('Admin/PracticeAreas/index')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }      
    },
    {
      path: 'admin/matters',
      getComponent(location, cb) {
        System.import('Admin/Matters/index')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'admin/posts/:id/comments',
      getComponent(location, cb) {
        System.import('Admin/Comments/index')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'blog/:id/:slug',
      getComponent(location, cb) {
        System.import('BlogPost/index')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'practice-areas',
      getComponent(location, cb) {
        System.import('PracticeAreas/index')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'practice-areas/:slug',
      getComponent(location, cb) {
        System.import('PracticeArea/index')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'login',
      getComponent(location, cb) {
        System.import('Authentication/Login')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'logout',
      getComponent(location, cb) {
        System.import('Authentication/Logout')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    }
  ]
}

export default routes;
