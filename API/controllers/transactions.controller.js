// import allTransactions from '../utils/transactions';
// import allAccounts from '../utils/accounts';
// import { database } from 'pg/lib/defaults';
const fs = require('fs');
const path = require('path');
import { timeStamp } from 'console';
import allAccounts from '../controllers/data.json';
const CheckEmail = require('../Helper/checkEmail'); 
const userdb = userdb||path.join(__dirname, 'data.json');
const otpFilePath = otpFilePath || path.join(__dirname, 'accounts.json');
let RcvrAccDetails = RcvrAccDetails;
let allTransaction = [];

const transactionController = {
//   static viewTransactions(req, res) {
//     return res.status(200).json({
//       status: 200,
//       data: allTransactions,
//     });
//   }

//   static debitAccount(req, res) {
//     const { accountNumber } = req.params;
//     const { debitAmount, transactionType } = req.body;
//     for (let i = 0; i < allAccounts.length; i += 1) {
//       if (allAccounts[i].accountNumber === Number(accountNumber)) {
//         const oldBalance = allAccounts[i].balance;
//         const newTransaction = {
//           transactionId: allTransactions.length + 1,
//           acountNumber: accountNumber,
//           amount: debitAmount,
//           oldBalance,
//           cashier: 2,
//           transactionType,
//           accountBalance: oldBalance - parseFloat(debitAmount),
//         };
//         allAccounts[i].balance = newTransaction.accountBalance;
//         allTransactions.push(newTransaction);
//         return res.status(200).json({
//           status: 200,
//           data: {
//             transactionId: newTransaction.transactionId,
//             accountNumber: newTransaction.accountNumber,
//             debitAmount,
//             transactionType,
//             accountBalance: newTransaction.accountBalance,
//           },
//         });
//       }
//     }
//     return res.status(404).json({ status: 404, error: 'Account not found' });
//   }

//   static creditAccount(req, res) {
//     const { accountNumber } = req.params;
//     const { debitAmount, transactionType } = req.body;
//     for (let i = 0; i < allAccounts.length; i += 1) {
//       if (allAccounts[i].accountNumber === Number(accountNumber)) {
//         const oldBalance = allAccounts[i].balance;
//         const newTransaction = {
//           transactionId: allTransactions.length + 1,
//           acountNumber: accountNumber,
//           amount: debitAmount,
//           oldBalance,
//           cashier: 2,
//           transactionType,
//           accountBalance: oldBalance + Number(debitAmount),
//         };
//         allAccounts[i].balance = newTransaction.accountBalance;
//         allTransactions.push(newTransaction);
//         return res.status(200).json({
//           status: 200,
//           data: {
//             transactionId: newTransaction.transactionId,
//             accountNumber: newTransaction.accountNumber,
//             debitAmount,
//             transactionType,
//             accountBalance: newTransaction.accountBalance,
//           },
//         });
//       }
//     }
//     return res.status(404).json({ status: 404, error: 'Account not found' });
//   }
   


viewTransactions:(req, res) => {
    let allTransactions;
    for (let i = 0; i < allAccounts.length; i++) {
         allTransactions = allAccounts[i].transactions;
        
    }
    allTransactions=allTransactions;
        return res.status(200).json({
          status: 200,
          data: allTransactions,
        });
      },

debitAccount:(req, res) =>{
    const {accSelectio,recVacctNumber,sendAmount,transactionType,userBala} = req.body.data;
    // const senderDetails = 
    // console.log(allAccounts)
    for(let i = 0;i<=allAccounts.length;i++){
        console.log(allAccounts[i].accountNumber)
        if (allAccounts[i].accountNumber == recVacctNumber){
            const newTransaction = { accSelectio,recVacctNumber,sendAmount,transactionType,userBala};
            // const senderBal = JSON.parse(localStorage.getItem("user"));
             RcvrAccDetails =  allAccounts[i]
            // const RcvrBal = allAccounts[i].balance + newTransaction.sendAmount;
            const dataTosend = [RcvrAccDetails.balance,RcvrAccDetails.accountNumber,RcvrAccDetails.email,RcvrAccDetails.fname,RcvrAccDetails.lname,RcvrAccDetails.transactions]
            console.log([dataTosend,newTransaction]);
            // if (newTransaction.sendAmount ) {
              
            // }
            allTransaction.push(newTransaction);
            console.log(allTransaction);

            return res.status(201).json({newTransaction,dataTosend})
        }
        // else if (allAccounts[i].accountNumber != recVacctNumber){
        //     return res.status(404).send({message:"account not found"})
        // } 
    }
    
},
postOtp:(req,res)=>{
    const otpCode = Math.floor(1000000*6*Math.random(999999));
    // console.log(RcvrAccDetails);
    console.log(req.body);
    // RcvrAccDetails = RcvrAccDetails;
    // const many = req.body;
    let correctOtp = [];
    // If file doesn't exist, create it
    if (!fs.existsSync(otpFilePath)) {
        correctOtp.push(otpCode)
      fs.writeFileSync(otpFilePath, JSON.stringify(correctOtp, null, 2));
      console.log('File not found. Created new file and added otp.');
      return false;
    }
    
    // Read and parse existing file
    const data = fs.readFileSync(otpFilePath, 'utf-8');
    try {
        correctOtp = JSON.parse(data);
        console.log('Current otp in file:', correctOtp);
      } catch (err) {
        console.log('Error parsing file. Reinitializing with new otp.');
        correctOtp = [otpCode];
        fs.writeFileSync(otpFilePath, JSON.stringify(correctOtp, null, 2));
        return false;
      }

      
    // Check if otp already exists
    const exists = correctOtp.some(otp => otp.otpCode === otpCode);
    console.log(`otp "${otpCode}" exists:`, exists);

    if (!exists) {
        correctOtp=[];

        correctOtp.push(otpCode);
        fs.writeFileSync(otpFilePath, JSON.stringify(correctOtp, null, 2));
        console.log('New otp added.');
      } else {
        console.log('otp already exists. Skipped adding.');
      }
    // const {rcvrFirstName,rcvrLastName,rcvrEmailaddress,newTransAmount,balAftrTrans,rcvrAccount}=req.body.transData;
    // const completeTfDetails = {rcvrFirstName,rcvrLastName,rcvrEmailaddress,newTransAmount,balAftrTrans,rcvrAccount};
    console.log(req.body);
    const rqbdy = req.body
    // let exist = checker.checkAndTransact(completeTfDetails);
    return res.status(200).json({exists,RcvrAccDetails,rqbdy});

// console.log(otpCode)
},
confirmOtp:(req,res)=>{
  const otpCode = fs.readFileSync(otpFilePath, 'utf-8');
  let dbcall = fs.readFileSync(userdb, 'utf-8');
    const codes = JSON.parse(otpCode);
    let userrs =  JSON.parse(dbcall);
    // const {reqbod} = req.body
    // RcvrAccDetails = RcvrAccDetails;
    // result.rcvrAccount
    console.log(allAccounts);
    console.log(codes[0]);
    const tfOtpInpt = req.body.newData.tfOtpInpt
    const rcvAC = req.body.newData.rqbdy.rcvrAccount
    const rcvfn = req.body.newData.rqbdy.rcvrFirstName
    const rcvln = req.body.newData.rqbdy.rcvrLastName
    const txnAmt = req.body.newData.rqbdy.newTransAmount
    const newBal = req.body.newData.rqbdy.rcvrBalAftTf
    const sendBalAfTf =  req.body.newData.rqbdy.balAftrTrans
    const sndDt = req.body.newData.rqbdy.senderDetails;
    console.log(sndDt)
        const txnId ="TX332"+ Date.now(); 
      const creditHistory = {
        txnId: txnId,
        txnType:"Credit",
        txnfn:sndDt[0],
        txnln:sndDt[1],
        txnSAcc:sndDt[2],
        txnAmt:txnAmt,
        txnDate:new Date().toISOString(),
        // description: description || ""
      }

      const debitHistory = {
        txnId: txnId,
        txnType:"Debit",
        txnfn:rcvfn,
        txnln:rcvln,
        txnSAcc:rcvAC,
        txnAmt:txnAmt,
        txnDate:new Date().toISOString(),
        // description: description || ""
      }

    userrs = userrs.map(obj => {
      if (obj.accountNumber == rcvAC) {
        obj.transactions.push(creditHistory)
        console.log(obj.transactions);
        return {
          ...obj,balance:newBal
          // ...obj,transactions:
        };
      }
      return obj;
    });
        userrs = userrs.map(obj2 => {
          if (obj2.accountNumber == sndDt[2]) {
            obj2.transactions.push(debitHistory)
            return {
              ...obj2,balance:sendBalAfTf
            };
          }
          return obj2;
        });
        fs.writeFileSync(userdb, JSON.stringify(userrs, null, 2));



    // for (let i = 0; i < allAccounts.length; i++) {
    //   const e = allAccounts[i];
    //   if (e.accountNumber == rcvAC) {
    //     // fs.writeFile()
    //     console.log(e.balance)
    //      e.balance = newBal;
        
    //     // userdb[0].push(e)
    //     // const rcvrUpdate = JSON.parse(userdb)
    //     // fs.writeFileSync(userdb, JSON.stringify(e, null, 2));
    //     console.log(userdb)
    //     // fs.writeFileSync
    //   }
      
    // }
    
    console.log(tfOtpInpt);
    console.log(rcvAC);
    const code = codes[0];
    try {
        if (code != tfOtpInpt) {
            return res.status(404).json({message:"otp doesn't match"})
        }

        
        return res.status(200).json(req.body.newData.rqbdy);
        
    } catch (error) {
        console.error(error);
    }
},

withdrawfds:(req,res)=>{
  console.log("withdrawfds clicked")
}
}

module.exports = transactionController;
