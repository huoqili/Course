'use strict';

const Service = require('egg').Service;

class CoursecateService extends Service {
  async insert(data) {
     let result = await  this.app.mysql.insert('course_cate',data);
     return result.affectedRows;   
  }
  async query(){
      let result = await this.app.mysql.select('course_cate');
      return result;
  }
  async find(id){
      let result = await this.app.mysql.get('course_cate',{id});
      return result;
  }
}

module.exports = CoursecateService;
