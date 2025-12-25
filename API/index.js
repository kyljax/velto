import express from 'express';
// import path from 'path';
const path = require("path");
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import 'babel-polyfill';

import AccountController from './controllers/accountsDB.controller';
const userRoutes = require('./routes/user.routes.js');
import accountRoutes from './routes/accounts.routes';
import transactionRoutes from './routes/transactions.routes';

const { viewUserAccounts } = AccountController;

const port = process.env.PORT || 3000;

const app = express();

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.json());
app.use(express.static(path.join("__dirname", "UI")));
app.use(express.static(path.join("__dirname", "UI/user")));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
  }
  next();
});

// app.get('/', (req, res) => res.send('Welcome to Banka'));

app.get('/', (req, res) => res.sendFile(path.join("__dirname","UI", "login.html")));

app.use('/api/v1/', userRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/transactions', transactionRoutes);

// Error Handler
app.use((req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Banka is listening on ${port}`);
});

export default app;
