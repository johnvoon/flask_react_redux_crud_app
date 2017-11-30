# Concept Law Firm Website

A mock mobile-responsive law firm website with custom CMS hosted on Digital Ocean. My first experience with Flask and React.

## Login

Whenever prompted, enter:

- username: "admin"
- password: "password" 

to login and access admin functionality.

## Features:

- Blog page with keyword search, practice area or author filters, infinite scrolling
- Simple authentication
- CMS for adding/editing blog posts, users (client, staff, public), practice areas and matters; with instantaneous success and error feedback, JWT authentication system, client-side form field validation, rich text editing, address autocomplete, datepicker, image uploading, multiselect fields, etc.

## Testing

- The project is still being tested. Check out the "/src/App", "/src/BlogHome" and "/src/PostsActions" folders to see some written tests.  
 
## Implementation

| Technology | Description |
|------|-------------|
| [<b>Flask</b>](http://flask.pocoo.org/) |  Python web framework |
| [<b>Gunicorn</b>](http://gunicorn.org/) | Web application server |
| [<b>Nginx</b>](https://www.nginx.com/) | Reverse proxy server serving static resources and handling gzip and SSL |
| [<b>Docker</b>](https://www.docker.com/) | Containerization of app |
| [<b>PostgreSQL</b>](https://www.postgresql.org/) | Database |
| [<b>SQLAlchemy</b>](http://www.sqlalchemy.org/) | ORM |
| [<b>Flask-RESTful</b>](http://flask-restful-cn.readthedocs.io/en/0.3.4/) | For building APIs with Flask |
| [<b>Flask-Login</b>](https://pypi.python.org/pypi/Flask-Login) | User authentication |
| [<b>Flask-JWT</b>](https://pythonhosted.org/Flask-JWT/) | Protection of API endpoints using JSON Web Token |
| [<b>Bcrypt</b>](https://pypi.python.org/pypi/bcrypt/3.1.3) | Password hashing |
| [<b>Pillow</b>](https://python-pillow.org/) | Image compression |
| [<b>React</b>](https://facebook.github.io/react/) | JavaScript library for building user interfaces |
| [<b>Redux</b>](https://redux.js.org/docs/introduction/) | Application state management |
| [<b>Redux-Thunk</b>](https://github.com/gaearon/redux-thunk) | Middleware for dispatching Redux actions |
| [<b>React-Router</b>](https://github.com/ReactTraining/react-router) | Client-side routing |
| [<b>Redux-Form</b>](http://redux-form.com/) | Form state management |
| [<b>Moment.js</b>](https://momentjs.com/) | Date-time formatting |
| [<b>Normalizr</b>](https://github.com/paularmstrong/normalizr) | JSON data normalization |
| [<b>Axios</b>](https://github.com/mzabriskie/axios) | Performing AJAX requests |
| [<b>Reselect</b>](https://github.com/reactjs/reselect) | Memoized selectors |
| [<b>Bootstrap</b>](http://getbootstrap.com/) | Styling |
| [<b>Redux Infinite Scroll</b>](https://github.com/RealScout/redux-infinite-scroll) | Infinite scrolling |
| [<b>React-RTE</b>](https://github.com/sstur/react-rte) | RichTextEditor element |
| [<b>React-Select</b>](https://github.com/JedWatson/react-select) | Multiselect form controls |
| [<b>React-Dropzone</b>](https://github.com/okonet/react-dropzone) | Image upload form field |
| [<b>React-Geosuggest</b>](https://github.com/ubilabs/react-geosuggest) | Address autocomplete form field |
| [<b>Lodash</b>](https://lodash.com/) | JavaScript helper functions |
| [<b>Webpack 2</b>](https://webpack.github.io/) | Module bundling |
| [<b>ESLint</b>](http://eslint.org/) | JavaScript linting |
| [<b>Jest</b>](https://facebook.github.io/jest/) | JavaScript testing framework |
| [<b>Enzyme</b>](https://facebook.github.io/jest/) | JavaScript testing utility for React |

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

## In the works

- Server rendering
- New user registration
- Appointment scheduling
- Staff/client portal portal
- Internationalization
