import express from 'express';

// import aunthenticate from '../middlewares/authenticate';
import ValidateTransaction from '../middlewares/validateTransaction';
// import validateTransactionInput from '../middlewares/validateTransactionInput';
// import transactionController from '../controllers/transactions.controller';
// import transactionDBController from '../controllers/transactionsDB.controller';

// const { validateTransaction } = ValidateTransaction;

const transactionController = require('../controllers/transactions.controller.js');

const transactionRouter = express.Router();

// Postgres DB
// transactionRouter.get('/:accountNumber/transactions', aunthenticate.client, transactionDBController.viewAllTransactions);
// transactionRouter.get('/:transactionId', aunthenticate.client, transactionDBController.viewOneTransaction);
// transactionRouter.post('/:accountNumber/debit', validateTransactionInput, validateTransaction, transactionDBController.debitAccount);
transactionRouter.post('/debit', transactionController.debitAccount);
transactionRouter.post("/postOtp",transactionController.postOtp);
transactionRouter.post("/confirmOtp",transactionController.confirmOtp);
// transactionRouter.post('/:accountNumber/credit', validateTransactionInput, validateTransaction, transactionDBController.creditAccount);

// withdraw route :::
transactionRouter.post('/withdrawFnds', transactionController.withdrawfds);



// Dummy DB
// transactionRouter.get('/', aunthenticate.client, transactionController.viewTransactions);
// transactionRouter.post('/:accountNumber/credit', aunthenticate.client, aunthenticate.staff, transactionController.creditAccount);


export default transactionRouter;
