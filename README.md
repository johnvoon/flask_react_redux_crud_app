# Concept Law Firm Website

A modern law firm website with custom content management system.

<strong>LIVE AT: TBA</strong>

<strong>Development process documented at: medium.com</strong>

<strong>Note: Please use Chrome for now as cross-browser compatibility is still being implemented.</strong>

## Overview

A concept law firm website I built from the back- to front-end to learn Flask and React. 

## Instructions

Login with username: "admin", password: "devpassword" for access to account with admin privileges.

## Features
- Mobile responsive
- Custom content management system

### Blog Posts Index Page
- Instantaneous filters (by keyword, practice area or author)
- Infinite scrolling for loading more posts

### Blog Post Page
- Displays related posts
- Displays comments and comment form

### Admin Pages
- Instantaneous keyword search filter and column sort
- CRUD functionality with instantaneous success and error feedback.

### Admin User Page
- Integrated user management system where clients and staff can be managed in one place. No need for time-wasting switching between routes. 
- Individual client and staff user accounts can only be created by a user with admin privileges
- "Add User" and "Edit User" forms feature client- and server-side field validation, address autocomplete.
- If added user role is "staff", "Add Staff" form will be automatically displayed.
- If added user role is "client", "Add Client" form will be automatically displayed.
- "Add Staff" form features client-side field validation, datepicker, image uploading, multiselect fields.
- "Add Client" form features

### Admin Posts Page
- "Add Post" and "Edit Post" forms feature client- and server-side field validation, image file uploading and RichTextEditor input. 


- Admin dashboard and pages are protected and require authentication and admin user privileges
- Certain admin operations (e.g. POST, PUT, DELETE requests) additionally require a JWT (obtained client-side from admin pages).
- On expiry of JWT, user is redirected back to JWT request page (inputted data is automatically saved)
- Contact form on every page
- Interactive home and staff pages.

## Implementation
- <b>Flask</b> web framework
- Website hosted on <b>Digital Ocean</b>
- <b>Gunicorn</b> web server
- <b>Nginx</b> reverse proxy
- <b>Bootstrap</b> (customized using LESS) CSS framework
- User authentication with <b>Flask</b> and <b>Flask-Login</b>
- Password hashing using <b>Bcrypt</b>
- Automated emails generated with and <b>Flask-Mail</b> and <b>Celery</b>
- Back-end API built using [<b>Flask-RESTful</b>](http://flask-restful-cn.readthedocs.io/en/0.3.4/)
- API endpoints protected using [<b>Flask-JWT</b>](https://pythonhosted.org/Flask-JWT/)
- Interactive user interface with [<b>React</b>](https://facebook.github.io/react/) (code written in ES6)
- Application state management with <b>Redux</b>
- [<b>Redux-Thunk</b>](https://github.com/gaearon/redux-thunk) middleware for dispatching Redux actions
- Front-end routing with [<b>React-Router</b>](https://github.com/ReactTraining/react-router)
- Form state management and validation using [<b>Redux-Form</b>](http://redux-form.com/)
- Date-time formatting with [<b>Moment.js</b>](https://momentjs.com/) 
- JSON data normalization with [<b>Normalizr</b>](https://github.com/paularmstrong/normalizr)
- HTTP requests with [<b>Axios</b>](https://github.com/mzabriskie/axios)
- Memoized selectors with [<b>Reselect</b>](https://github.com/reactjs/reselect)
- Modal implementation with <b>React-Bootstrap</b>
- Infinite scrolling with <b>Redux Infinite Scroll</b>
- RichTextEditor element from [<b>React-RTE</b>](https://github.com/sstur/react-rte)
- Select controls from [<p>React-Select</p>](https://github.com/JedWatson/react-select)
- [<b>Lodash</b>](https://lodash.com/) JavaScript helper functions
- Front-end module bundling with [<b>Webpack</b>](https://webpack.github.io/)
- [<b>Docker</b>](https://www.docker.com/) for containerization
- <b>PostgreSQL</b> database with [<b>SQLAlchemy</b>](http://www.sqlalchemy.org/) ORM
- Images uploaded with [<b>React-dropzone</b>](https://github.com/okonet/react-dropzone)
- JavaScript linting with [<b>ESLint</b>](http://eslint.org/)
- Fake data generated with <b>fake-factory</b>
- Address form autocomplete using <b>Google Places API</b> and [<b>React-Geosuggest</b>](https://github.com/ubilabs/react-geosuggest)

## Resources Consulted
- Web Development (Steve Huffman, Udacity, https://www.udacity.com/course/web-development--cs253)
- Build a SAAS App with Flask (Nick Janetakis, Udemy, https://www.udemy.com/the-build-a-saas-app-with-flask-course/)
- The Docker for DevOps Course (Nick Janetakis, Udemy, https://www.udemy.com/the-docker-for-devops-course-from-development-to-production/)
- Explore Flask (Robert Picard, https://exploreflask.com/en/latest/)
- Modern React with Redux (Stephen Grider, Udemy, https://www.udemy.com/react-redux/)
- REST APIs with Flask and Python (Jose Salvatierra, Udemy, https://www.udemy.com/rest-api-flask-and-python/)
- mxstbr/react-boilerplate (https://github.com/mxstbr/react-boilerplate)
- andrewngu/sound-redux (https://github.com/andrewngu/sound-redux)
- carlosrocha/react-data-components (https://github.com/carlosrocha/react-data-components)
- dmeents/redux-form-tut (https://gist.github.com/dmeents/62151997c2eb17a2daf535111778efa2)
- okonet/react-dropzone (https://github.com/okonet/react-dropzone)
- BBB/dropzone-redux-form-example(https://github.com/BBB/dropzone-redux-form-example)

## Todo
- Migrate to Node.js
- Enable server-side rendering
- Staff portal for viewing appointment diary, sending invoices/receipts and case status updates
- Client portal for receiving invoices/receipts and case status updates
- Instant chat pop-up for answering enquiries from website visitors
- Security enhancements