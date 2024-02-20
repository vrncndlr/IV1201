# IV1201 Recruitment App
Architecture &amp; design of web applications

## Project 
In this project assignment, we are hired by a company to build a new, robust, scalable and well-documented web based recruitment application.
The aim is to have a functioning prototype of the system but the project also serves as an exercise in taking architectural decisions, understanding the design and structuring of applications and working together as a group towards a goal.

## Architecture overview
Our application follows a semi-monolithic architecture, combining client-side rendering with separate backend and frontend servers for enhanced modularity and scalability.
### Frontend
On the frontend, we use the JavaScript library React for building component-based user interfaces.
### Backend
The backend is powered by Node.js and Express, handling server-side logic, data processing, and API endpoints.

### Database
PostgreSQL
Extra scripts needed:
To be able to add username and password to users that dont have it an extra table is needed:
CREATE TABLE public.account_reset_code (
    person_id integer NOT NULL,
    reset_code character varying(255)
);
ALTER TABLE public.competence OWNER TO postgres;

## Setup
* Install Node.js and PostgreSQL
* Create the databse by runing the existing-database.sql script in psql
* Clone this repository ```git clone ...```
* In you teminal, go the the cloned directory ```cd .../IV1201```
* Install all required packaged with npm install in both frontend and backend directories ```cd backend; npm install; cd ../frontend; npm install```
* In both backend and frontend run ```npm start```

## File structure
```
IV1201
├──frontend
|   ├── src
|   │   ├── integration
|   |   │   └── DBCaller.js.js
|   │   ├── presenter
|   |   │   ├── LoginPresenter.js
|   |   │   ├── RegistrationPresenter.js
|   |   │   └── ...
|   │   └── view
|   |   │   ├── LoginView.js
|   |   │   ├── RegistrationView.js
|   |   │   └── ...
|   └── package.json
|   └── App.js - acts as the head controller
|   └── ...
├──backend
|    ├── src
|    │   ├── api -> this is the view, this is called by express
|    │   |  ├── login.js
|    │   |  └── registration.js
|    │   ├── controller -> calls integration and model layers
|    │   ├── model -> application state
|    │   ├── integration -> database calls
|    │      └── DAO.js
|    │   ├── util
|    |   └── server.js
|    └── package.json
|    └── ...
└── package.json
```
