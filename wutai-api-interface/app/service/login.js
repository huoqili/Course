'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async find(username) {
    const result = await this.app.mysql.get('admin', { username });
    return result;
  }
}

module.exports = LoginService;
