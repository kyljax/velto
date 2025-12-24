// const users = [
  // {
  //   id: 1,
  //   email: 'ileriayo@gmail.com',
  //   firstName: 'Ileriayo',
  //   lastName: 'Adebiyi',
  //   password: 'password',
  //   type: 'client',
  //   isAdmin: false,
  // },
  // {
  //   id: 2,
  //   email: 'dave@gmail.com',
  //   firstName: 'Dave',
  //   lastName: 'Dave',
  //   password: 'password',
  //   type: 'staff',
  //   isAdmin: false,
  // },
  // {
  //   id: 3,
  //   email: 'joe@gmail.com',
  //   firstName: 'Joe',
  //   lastName: 'Joe',
  //   password: 'password',
  //   type: 'client',
  //   isAdmin: false,
  // },
  // {
  //   id: 4,
  //   email: 'Dan@gmail.com',
  //   firstName: 'Dan',
  //   lastName: 'Dan',
  //   password: 'password',
  //   type: 'staff',
  //   isAdmin: true,
  // },
// ];

// export default users;

class User{
  constructor(
    firstname,
    lastname,
    email,
    phone,
    password,
    role = "default"
  )
  {
    this.id= 1;
    this.firstname = firstname;
    this.lastname= lastname;
    this.email = email.toLowerCase();
    this.phone = phone;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
    this.account = {
      accountNumber:this.generateAccountNumber(),
      balance:0.0,
    };
  }
  generateAccountNumber(){
    
    return Math.floor(1000000000 + Math.random()*9000000000).toString();
  }
}
module.exports = User;