'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx , service } = this;
    // let putdata = {chname:'更新后的章节',chduration:500};
    // 更新返回数组  [1] [0]
    // let result = await service.chapter.update(putdata,1);
    // 删除 返回行数
    // let result = await service.chapter.destroy(1);
    // let result = await service.chapter.findAll({field:['chid','chduration']});
    // let result = await service.chapter.findAll();
    // let result = await service.chapter.findOrCreate();
    let result = await service.chapter.findAndCountAll();
    ctx.body = result;
  }
}

module.exports = HomeController;
