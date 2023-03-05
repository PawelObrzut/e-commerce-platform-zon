# E-commerce-platform
  _an online stores collection like eBay, amazon_


  A web application for merchandising. It contains different stores collection in one place. A user can browse through all products and shop online. 

***

  This is an extensive project that is build of three sections - FrontEnd, BackEnd and DataBase. Implements authentication, protected routes, data pagination, data hasing, CRUD operations, and more...

  Technologies used: [_node_, _typescript_, _bcrypt_, _passport_, _react_, _vite_, _tailwind_, _sqlite_, _express_, _morga_, _react-hook-forms_, _yup_, _js-cookie_, _eslint_, _react-icons_ ]
***

## Backend

  The backend is built in Node.js. Uses Express to handle routes, jwtWebToken for signing JWTs, Passport for authenticating user, Bcrypt to protect sensitive data.
  It is well structured into middlewares, utils and routes directories. Also adds Morgan for requests loging, Linting to keep every file unified and Typescript to keep everything type safe. Thus, the whole is easly maintanable and scalable.

  ### Routes:

  - `http://localhost:8080/product` - a route for adding, updating, and deleting products. Route retrieve data from DB and pagintes and filters the data before responding to a client.

  - `http://localhost:8080/store` - a route for adding, updating, and deleting stores.

  - `http://localhost:8080/user` - a route for registering and authenticating users. Uses Bcrypt and Passport libraries for authenticating together with jwtWebToken for signing JWT. Credentials are sent to client using a cookie.

***

## Database

  A fully mocked but functioning database full of _users_, _stores_ and _products_ created in sqlite3. The script reads through json files with fake data and creates three tables:
        
          ProductData
          StoreData
          UserData
        
  A Backend is able to access different routes using typical REST-conventions

  ### Routes:
  - `http://localhost:8000/api/user/` - gets, updates, posts and delete users

  - `http://localhost:8000/api/product` - gets, updates, posts and delete products

  - `http://localhost:8000/api/stores` - gets, updates, posts and delete stores

***

## Frontend

  The frontend is built with Vite configuration for React. Implements several packages: 

  - React Router Dom for managing routes. 
  - Typescript
  - Tailwind for styling
  - React Hook Form for handling forms
  - Js-Cookie for parsing cookies

  The styling aim was to make the website look like amazon. Protected routes are available after sucessfully loggin in and receiving credentials in a cookie from the server.

  The project is well structured; divided into components, pages, context, hooks and utils.

***

![LangingPageDemo](/landingPage_readme.png)

***

![CartPageDemo](/cartPage_readme.png)

***

# Installation
To get started, you will need to clone the repository. 

```bash
git clone https://github.com/PawelObrzut/e-commerce-platform-zon.git
```

You will get three folder - one for the frontend, one for the backend and one for the database. You need to get into each of them and install dependencied for each part. 

### _backend_ 
>runs on port 8080

```bash
cd saltazonBackend
npm install
npm run build
npm run start
```

You may want to run it in development mode. If so, after installing dependencies run this command:

```bash
npm run dev
```

### _frontend_ 
> runs on port 4173


```bash
cd saltazonFrontend
npm install
npm run build
npm run preview
```

You may want to run it in development mode. If so, after installing dependencies run this command:

```bash
npm run dev
```
> dev_mode runs on port 5173

### _database_
> runs on port 8000

```bash
cd saltazonDatabase
npm install
npm run start
```