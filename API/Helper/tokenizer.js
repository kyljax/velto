import jwt from 'jsonwebtoken';
const secret= "JWT_KEY"

class Tokenizer {
  static async tokenizer(payload, expiresIn = '1h') {
    const token = await jwt.sign(
      payload,
      // process.env.JWT_KEY,
      secret,
      { expiresIn },
    );
    return token;
  }
}

export default Tokenizer;
