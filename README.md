# Concept Law Firm Website

A modern law firm website I would enjoy using.

<strong>LIVE AT: TBA</strong>

<strong>Development process documented at: medium.com</strong>

<strong>Note: Please use Chrome for now as cross-browser compatibility is still being implemented.</strong>

## Overview

A law firm website 

## Instructions

Login with username: "admin", password: "devpassword" for access to account with admin privileges.

## Features
- Designed and developed with UX in mind
- Mobile responsive
- Blog index page with instantaneous filters (by keyword, practice area or author) and infinite scrolling
- General public user account allows scheduling appointments and commenting on posts
- Individual client and staff accounts can only be created by a user with admin privileges
- Individual blog posts show list of related posts and comments
- Admin pages with instantaneous keyword search filter, column sorting and full CRUD functionality 
- Forms feature client-side field validation, server-side async validation, image file uploading, address autocomplete and RichTextEditor input.
- Forms prompt different information for adding different types of users, e.g. (staff, clients or public users)
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
- <b>Bootstrap</b> for CSS
- User authentication with <b>Flask</b> and <b>Flask-Login</b>
- Password hashing using <b>Bcrypt</b>
- Automated emails generated with and <b>Flask-Mail</b> and <b>Celery</b>
- Back-end API built using <b>Flask-RESTful</b>
- API endpoints protected using <b>Flask-JWT</b>
- Interactive user interface with <b>React</b> (code written in ES6)
- Application state management with <b>Redux</b>
- <b>Redux-Thunk</b> middleware for dispatching Redux actions
- Front-end routing with <b>React-Router</b>
- Form state management and validation using <b>Redux-Form</b>
- Date-time formatting with <b>Moment.js</b> 
- JSON data normalization with <b>Normalizr</b>
- HTTP requests with <b>Axios</b>
- Memoized selectors with <b>Reselect</b>
- Modal implementation with <b>React-Bootstrap</b>
- Infinite scrolling with <b>Redux Infinite Scroll</b>
- RichTextEditor element using <b>React-RTE</b>
- <b>Lodash</b> JavaScript helper functions
- Front-end module bundling with <b>Webpack</b>
- <b>Docker</b> for containerization
- <b>PostgreSQL</b> database with <b>SQLAlchemy</b> ORM
- Images uploaded with <b>React-dropzone</b>
- JavaScript linting with <b>ESLint</b>
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
- Staff portal for viewing appointment diary, sending invoices/receipts and case status updates
- Client portal for receiving invoices/receipts and case status updates
- Instant chat pop-up for answering enquiries from website visitors
- Security enhancements