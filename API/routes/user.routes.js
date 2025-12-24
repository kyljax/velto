const express = require( 'express');
// import validateSignIn from '../middlewares/validateSignIn';
// import validateSignUp from '../middlewares/validateSignUp';
// import aunthenticate from '../middlewares/authenticate';

// import userController from '../controllers/user.controller';
const userController = require('../controllers/userDB.controller.js');
// const transactionController = require('../controllers/transactions.routes.js');
console.log(userController.signIn)
console.log(userController.signUp)

// import signInValidation from '../middlewares/signInValidation';
// import signUpValidation from '../middlewares/signUpValidation';

const userRouter = express.Router();

// POSTGRES DB
// userRouter.post('/auth/signin', validateSignIn, userControllerDB.signIn);
userRouter.post('/auth/signin', userController.signIn); 
// userRouter.get('/auth/loginData', userController.loginData); 
userRouter.post('/auth/signup', userController.signUp);
// userRouter.post('/auth/staff', validateSignUp, userController.newStaff);

// userRouter.get('/user/:email/accounts', aunthenticate.client, aunthenticate.staff, validateSignUp, userController.viewUserAccounts);

// DUMMY DATA
// userRouter.post('/signin', signInValidation, userController.signIn);
// userRouter.post('/signup', signUpValidation, userController.signUp);
// userRouter.post('/staff', signUpValidation, userController.newStaff);

module.exports = userRouter;
