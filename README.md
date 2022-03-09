# BOULDR: A Climbing Gym Rating Site
BOULDR is a climbing gym rating website that links together users and gym staff members. By using BOULDR, staff members are able to keep tabs on what works and what doesn't when designing problems for all sorts of athletes.

BOULDR implements a custom React Bootstrap frontend along with Firebase.
Firebase Authentication, Firestore, and Firebase Cloud Storage are all utilized.

# Getting Started with BOULDR

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), so setup is easy!

## Installing and Running BOULDR Locally

Clone the repository using git:
### `git clone https://github.com/TJ178/BOLDR.git`

Install all dependencies:
### `npm install`


Ensure that your Firebase configuration is setup correctly in `src/firebase-config.js`
Firebase should simply be setup with 2 empty collections named `users` and `problems`.
Make sure that Firebase has been setup to allow unrestricted read/write access.


Then run the app locally:
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



## Compiling BOULDR for production

### `npm run build`

Builds BOULDR for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
BOULDR is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
