import '@babel/polyfill';
import express from 'express';
import ValidateUser from '../middlewares/users/validateUser';
import ValidateSMS from '../middlewares/sms/validateSMS';
import ErrorHandler from '../middlewares/ErrorHandler';
import UserController from '../controllers/UserController';
import SMSController from '../controllers/SMSController';

const router = express.Router();

// create the error object in the request object
router.all('*', (request, response, next) => {
  request.errors = {};
  next();
});

router.get('/', (request, response) => {
  response.status(200)
    .json({ message: 'Welcome to SMS API version 1.' });
});

router.post('/users/signup', ValidateUser.validateEmail, ValidateUser.validatePassword,
  ValidateUser.validatePhoneNumber, ValidateUser.validateUsername, ErrorHandler.handleErrors,
  UserController.createUser);

router.post('/users/signin', UserController.signin);

router.post('/sms/:phoneNumber', ValidateUser.validateToken, ValidateUser.validateUserExists,
  ValidateSMS.validatePhoneNumber, ValidateSMS.validateMessage, ErrorHandler.handleErrors,
  SMSController.sendSMS);

export default router;
