import '@babel/polyfill';
import express from 'express';

const router = express.Router();

router.get('/', (request, response) => {
  response.status(200)
    .json({ message: 'Welcome to SMS API version 1.' });
});

export default router;
