// import bcrypt from 'bcryptjs';
const bcrypt = require("bcryptjs")

class HashPassword {
  static async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}

export default HashPassword;
