import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes/index';


const port = process.env.PORT || 3000;
const app = express();
const address = `http://localhost:${port}`;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Pass api/v1 requests to routes
app.use('/api/v1', routes);

// default request handler
app.get('/', (request, response) => {
  response.status(200).json({ message: 'Welcome to the SMS API' });
});

// Handle 404 errors and forward to error handler
app.use((request, response) => {
  response.status(404).json({ message: '404 Not Found' });
});


// Listen at designated port
app.listen(port, () => {
  console.log(`App running on ${address}`);
});

export default app;
