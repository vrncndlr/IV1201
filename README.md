# IV1201 Recruitment App
Architecture &amp; design of web applications

## Project
In this project assignment, we are hired by a company to build a new, robust, scalable and well-documented web based recruitment application.
The aim is to have a functioning prototype of the system but the project also serves as an exercise in taking architectural decisions, understanding the design and structuring of applications and working together as a group towards a goal.

## Architecture overview
Our application follows a semi-monolithic architecture, combining client-side rendering with separate backend and frontend servers for enhanced modularity and scalability.
### Frontend
Frontend repository is found here: https://github.com/blomquiste/IV1201-frontend
### Backend
The backend is powered by Node.js and Express, handling server-side logic, data processing, and API endpoints.

### Database
PostgreSQL

## Setup
* Install Node.js and PostgreSQL
* Create the database by running the existing-database.sql script in psql
* Clone this repository ```git clone ...```
* In you terminal, go to the cloned directory ```cd .../IV1201```
* Install all required packages with npm install in both frontend and backend directories ```cd backend; npm install; cd ../frontend; npm install```
* In both backend and frontend run ```npm start```

## File structure
```
IV1201-backend
├── src
│   ├── api
│   │   ├── Authorization.js
│   │   ├── ErrorHandler.js
│   │   ├── fetch.js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── registration.js
│   │   ├── competence.js
│   │   ├── availability.js
│   │   ├── sendRestoreMail.js
│   │   ├── update.js
│   │   └── UpdateAccountByEmailCode.js
│   ├── controller
│   │   └── Controller.js
│   ├── integration
│   │   ├── DAO.js
│   │   └── Email.js
│   ├── model
│   │   ├── Application.js
│   │   └── User.js
│   ├── util
│   │   └── Validate.js
│   └── server.js
└── package.json
```


________________________________________

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
