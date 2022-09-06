'use strict';

const Service = require('egg').Service;

class IndexService extends Service {
  async index() {
     // 轮播 课程分类 课程 咨询
     let {app} = this;
     app.model.Course.index();
     app.model.CourseCate.index();
  }
}

module.exports = IndexService;
