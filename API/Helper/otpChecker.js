const fs = require('fs');
const path = require('path');


class CheckOtp {
    constructor(filePath) {
      this.filePath = filePath || path.join(__dirname, 'accounts.json');
    }
}