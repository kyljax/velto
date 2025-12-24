const fs = require('fs');
const path = require('path');

class CheckEmail {
  constructor(filePath) {
    this.filePath = filePath || path.join(__dirname, 'data.json');
  }

  checkAndAdd(userData) {
    const {accountNumber, fname, lname, email, password, cpassword, role, loginStatus,otpVerify } = userData;
    console.log('Checking user data for email:', userData.email);

    let users = [];

    // If file doesn't exist, create it
    if (!fs.existsSync(this.filePath)) {
      users.push(userData);
      fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
      console.log('File not found. Created new file and added user.');
      return false;
    }

    // Read and parse existing file
    const data = fs.readFileSync(this.filePath, 'utf-8');
    try {
      users = JSON.parse(data);
      console.log('Current users in file:', users);
    } catch (err) {
      console.log('Error parsing file. Reinitializing with new user.');
      users = [userData];
      fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
      return false;
    }

    // Check if email already exists
    const exists = users.some(user => user.email === email);
    console.log(`Email "${email}" exists:`, exists);

    if (!exists) {
      users.push(userData);
      fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
      console.log('New user added.');
    } else {
      console.log('User already exists. Skipped adding.');
    }

    return exists;
  }
  checkAndLogin(userData) {
    const {  email,accountNumber, password,loginStatus,otpVerify } = userData;
    console.log('Checking user data for email:', userData.email);

    let users = [];

    // If file doesn't exist, create it
    if (!fs.existsSync(this.filePath)) {
      // users.push(userData);
      // fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
      console.log('File not found...');
      return false;
    }

    // Read and parse existing file
    const data = fs.readFileSync(this.filePath, 'utf-8');
    try {
      users = JSON.parse(data);
      console.log('Current users in file:', users);
      // users.forEach(u => {
        // console.log(users)
      // });
    } catch (err) {
      console.log('Error parsing file. Reinitializing with new user.');
      users = [userData];
      // fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
      return false;
    }

    // Check if email already exists
    const exists = users.find(user => user.email === email);
    console.log(`email "${email}" exists:`, exists);

    if (!exists) {
      // users.push(userData);
      // fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
      console.log('user not found.');
      return false;
    }
    //  else {
    //   console.log('User exists. Signing user in.');
    // }
    if (exists !== undefined || exists !== null) {  
      return exists;

    }
    else{
      // exists = undefined;
      // return exists;
      console.log(exists)
    }
  }
  // checkAndLoadData(userData){
  //   const {  email,accountNumber, password,loginStatus,otpVerify } = userData;
  //   console.log('Checking user data for accountNumber:', userData.accountNumber);

  //   const data = fs.readFileSync(this.filePath, 'utf-8');
  //   let users;
  //   try {
  //     users = JSON.parse(data);
  //     console.log('Current users in file:', users);
  //     // users.forEach(u => {
  //       // console.log(users)
  //     // });
  //   } catch (err) {
  //     console.log('Error parsing file. Reinitializing with new user.');
  //     users = [userData];
  //     console.log(users);
  //     // fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
  //     return false;
  //   }
  //   // Check if account already exists
  //   const exists = users.find(user => users.accountNumber == accountNumber);
  //   console.log(`accountNumber "${accountNumber}" exists:`, exists);
  //   if (!exists) {
  //     // users.push(userData);
  //     // fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
  //     console.log('user not found.');
  //     return false;
  //   } if (exists !== undefined || exists !== null) {  
  //     return exists;

  //   }
  //   else{
  //     // exists = undefined;
  //     // return exists;
  //     console.log(exists)
  //   }

  // }
}

module.exports = CheckEmail;
