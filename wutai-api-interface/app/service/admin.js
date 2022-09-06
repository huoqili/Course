'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
    // {username:"admin"} {id:1}
  async find(whereObj) {
      let result = await  this.app.mysql.get('admin',whereObj);
      return result;
  }
  // dataobj ==> {password:'12222'}
  // whereobj ==> {id:111,username:''}
  async update(dataobj,whereobj){
    let result =   await this.app.mysql.update('admin',dataobj,{
          where:whereobj
      })
      return result.affectedRows;
  }
}

module.exports = AdminService;
