const fs = require('fs');
const path = require('path');

class CheckAcc {
  constructor(filePath) {
    this.filePath = filePath || path.join(__dirname, 'data.json');
  }

checkLoginAndCreate(acc){
    const {accType,dob,initdeposit,ssn,loginStatus}=acc;
    console.log(acc)
    let accountsDB = [];

    // If file doesn't exist, create it
    if (!fs.existsSync(this.filePath)) {
      accountsDB.push(acc);
      fs.writeFileSync(this.filePath, JSON.stringify(accountsDB, null, 2));
      console.log('File not found. Created new file and added account.');
      return false;
    }

    // Read and parse existing file
    const data = fs.readFileSync(this.filePath, 'utf-8');
    try {
      accountsDB = JSON.parse(data);
      console.log('Current users in file:', accountsDB);
    } catch (err) {
      console.log('Error parsing file. Reinitializing with new user.');
      accountsDB = [acc];
      fs.writeFileSync(this.filePath, JSON.stringify(accountsDB, null, 2));
      return false;
    }

    // Check if email already exists
    const exists = accountsDB.some(account => account.ssn === ssn);
    console.log(`SSN "${ssn}" exists:`, exists);
    const accountIndex = accountsDB.find(tyO => tyO.ssn === ssn);
    console.log(accountIndex)

    if (!exists) {
    //   console.log(shouldAddAcc);
      accountsDB.push(acc);
      fs.writeFileSync(this.filePath, JSON.stringify(accountsDB, null, 2));
      console.log('New user added.');
    } else if (exists) {
         
    const shouldAddAcc =  accType;
    // console.log(shouldAddAcc);
      console.log(shouldAddAcc);
      console.log(accountIndex.accType,' already exists. Skipped adding.',ssn);
    }
    else{
        console.log("else");

    }

    return exists;
  }
}

  module.exports = CheckAcc;