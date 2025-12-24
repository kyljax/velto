// import { validationResult } from 'express-validator/check';
// import Query from '../db/db';
// import Tokenizer from '../Helper/tokenizer';
// import HashPassword from '../Helper/hashPassword';
// import CheckEmail from '../Helper/checkEmail';
// import CheckPassword from '../Helper/checkPassword';

// const { hashPassword } = HashPassword;
// const { tokenizer } = Tokenizer;
// // const { checkAndAdd } = CheckEmail;
// const  checker = new CheckEmail('./data.json');
// const { checkPassword } = CheckPassword;
// const { query } = Query;

// class userController {
//   static async signUp(req, res) {
    
//     const {
//       email, fname, lname, password,cpassword
//     } = req.body;
//     const existingUser = await checkAndAdd(email);
    

//     if (existingUser.length > 0) {
//       return res.status(409).json({
//         status: 409,
//         error: 'Email already exists',
//       });
//     }
//     if (!existingUser[0]) {
//       // const hashedPassword = await hashPassword(password);
//       const data = req.body
//       // await query(insertUser, [email, firstName, lastName, password, 'client', false]);
//       const { id } = data.length+1;
//       // const token = await tokenizer({ id, email });
//       // const token = 
//       console.log(data);
//       return res.status(201).json({
        
//         status: 201,
//         message: 'Sign up successful',
//         data,
//       });
//     }
//     // console.log(data);
//   }

//   static async signIn(req, res) {
//     const errors = validationResult(req);
//     // console.log("hey");
//     // if (!errors.isEmpty()) {
//     //   return res.status(400).json({ status: 400, errors: errors.array() });
//     // }
//     const { email, password } = req.body;
//     const validUser = await checkAndAdd(email);
//     console.log(req.body);
//     // if (validUser.length <= 0) {
//     //   return res.status(404).json({
//     //     status: 404,
//     //     error: 'User does not exist',
//     //   });
//     // }
    // const validPassword = await checkPassword(password, validUser[0].password);
//     // if (!validPassword) {
//     //   return res.status(401).json({
//     //     status: 401,
//     //     error: 'Incorrect password',
//     //   });
//     // }
//     // const { id, firstname, lastname } = validUser[0];
//     // const token = await tokenizer({ id, email });
//     // return res.status(200).json({
//     //   status: 200,
//     //   message: 'Sign in successful',
//     //   data: {
//     //     token, id, email, firstname, lastname,
//     //   },
//     // });
//   }

//   static async newStaff(req, res) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ status: 400, errors: errors.array() });
//     }
//     const insertUser = `INSERT INTO users(email, firstname, lastname, password, type, isadmin)
//                         VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
//     const {
//       email, firstName, lastName, password,
//     } = req.body;
//     const existingUser = await checkAndAdd(email);
//     if (existingUser.length > 0) {
//       return res.status(409).json({
//         status: 409,
//         error: 'Email already exists',
//       });
//     }
//     if (!existingUser[0]) {
//       const hashedPassword = await hashPassword(password);
//       if (req.body.isAdmin === true) {
//         req.body.isAdmin = true;
//       } else req.body.isAdmin = false;
//       const data = await query(insertUser, [email, firstName, lastName, hashedPassword, 'staff', req.body.isAdmin]);
//       const { id } = data.rows[0];
//       const token = await tokenizer({ id, email });
//       return res.status(201).json({
//         status: 201,
//         message: 'New staff successfully created',
//         data: {
//           token, id: data.rows[0].id, email, firstName, lastName, type: data.rows[0].type, isAdmin: data.rows[0].isadmin,
//         },
//       });
//     }
//   }

//   static async viewUserAccounts(req, res) {
//     const { email } = req.params;
//     const getUserAccounts = `SELECT createdon, accountnumber, accounts.type, status, balance
//                               FROM users
//                               INNER JOIN accounts
//                               ON users.id = accounts.owner
//                               WHERE email = $1`;
//     try {
//       const result = await query(getUserAccounts, [email]);
//       return res.status(200).json({ Status: 200, data: result.rows });
//     } catch (err) {
//       return res.status(400).json({ Status: 400, error: err });
//     }
//   }
// }

// export default userController;

const path = require('path');
const CheckEmail = require('../Helper/checkEmail'); // path relative to this file
const { messages } = require('babel-core');
const checker = new CheckEmail(path.join(__dirname, 'data.json'));

const userController = {
  signUp: (req, res) => {
    const { fname, lname, email, password, cpassword, role,loginStatus,balance,transactions } = req.body.data;
    const accountNumber = Math.floor(1000000000*Math.random(9000000000));
    
    // console.log('Received signup data:', req.body.data.fname);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    console.log('Received signup data:', req.body);
    // Basic field check
    if (!req.body.data.fname || !req.body.data.lname || !req.body.data.email || !req.body.data.password || !req.body.data.cpassword || !req.body.data.role) {
      console.log('All fields are required.');
      return res.status(400).send({message:'All fields are required.'});
    }

    if (req.body.data.password !== req.body.data.cpassword) {
      console.log('Passwords do not match.');
      return res.status(400).send({message:'Passwords do not match.'});
    }

    const newUser = { accountNumber,fname, lname, email, password, cpassword, role,loginStatus,balance,transactions };

    const exists = checker.checkAndAdd(newUser);
   
    if (exists) {
      console.log('Signup failed: Email already exists.');
      return res.status(409).send({message:'User already exists.'});
    }

    console.log('User successfully registered.');
    // return res.status(201).send('Signup successful.');
    return res.status(201).send({message:'Signup successful.'});
  },
  signIn: (req, res) => {
    const { email, password } = req.body.data;

    console.log('Received sign in data:', req.body);
    // console.log('Received signup data:', req.body.data.fname);

    // Basic field check
    if (!req.body.data.email || !req.body.data.password) {
      console.log('All fields are required.');
      return res.status(400).send({message:'All fields are required.'});
    }

    // if (req.body.data.password !== req.body.data.cpassword) {
    //   console.log('Passwords do not match.');
    //   return res.status(400).send({message:'Passwords do not match.'});
    // }

    const User = {email, password};
    console.log(User);
    const exists = checker.checkAndLogin(User);
    console.log(exists)
   
    if (exists == undefined) {
      console.log("Signin failed: accountNumber doesn't exists.");
      return res.status(409).send({message:"User doesn't exists yet."});
    }
    console.log(User.password)
    if (exists.password===User.password) {
      exists.loginStatus = true;
       try {
        if (exists.loginStatus) {
          console.log('User successfully logged in.',exists.fname);
          console.log('User successfully logged in.',exists.loginStatus);
          const dataToFrontend = [exists.fname,exists.lname,exists.accountNumber,exists.loginStatus,exists.email,exists.role,exists.balance,exists.transactions]
         
           return res.status(201).json({message:'Sign In successful.',dataToFrontend});
   
          
        }
      } catch (error) {
        console.error(error);
      }
      // return res.status(201).send('Signup successful.');
     
      
    } 
    else{
      console.log('User password mismatch.');
      // return res.status(201).send('Signup successful.');
      return res.status(400).send({message:'Sign In failed.'});
   

    }
  },
  // loginData:(req,res)=>{
  //   const userId = req.body;
  //   console.log(userId);
  //   const user = 602432478;
  //   const exists = checker.checkAndLoadData(user)
  //   if(!exists){
  //     return res.status(400).json({message:"something went wrong"})
  //   }
  //   if(exists){
  //     const userBalance = exists.balance;
     
  //     return res.status(200).json({userBalance});
  //   }
  //   else{
  //     console.log("error")
  //   }
  // }
};

module.exports = userController;