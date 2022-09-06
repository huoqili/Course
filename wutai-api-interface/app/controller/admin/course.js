'use strict';

const Controller = require('egg').Controller;

class CourseController extends Controller {
// /admin/course?cname=xxx&id=1&page=1&limit=10&order=id&type=desc
  async index() {
    const { ctx, service, app } = this;
    const { SUCCESS, FAIL } = app.config.code;
    const { cname, id, page = 1, limit = 10, order = 'cid', type = 'desc' } = ctx.query;
    const whereobj = {};
    if (id) {
      whereobj['course.id'] = id;
    }
    if (cname) {
      whereobj.cname = [ '%' + cname + '%', 'like' ];
    }
    // 搜索条件:名称，分类
    // 排序：
    const orders = { order, type };
    // 分页信息: 页面 个数
    const field = 'cid,cname,cthumb,cprice,ctimes,catename';
    try {

      const result = await service.course.index({ whereobj, orders, field, limit, page });
      ctx.body = {
        code: SUCCESS,
        data: result,
      };
    } catch (err) {
      console.log(err);
      ctx.body = '出错';
    }
  }
  async show() {
    const { ctx } = this;
    ctx.body = 'course---show';
  }
  async destory() {

  }
  async edit() {

  }
  async create() {
    const { ctx, service, app } = this;
    const { SUCCESS, FAIL } = app.config.code;
    const postdata = ctx.request.body;
    const result = await service.course.create(postdata);
    if (result > 0) {
      ctx.body = {
        code: SUCCESS,
        msg: '数据添加成功',
      };
    } else {
      ctx.body = {
        code: FAIL,
        msg: '数据添加失败',
      };
    }
  }

}

module.exports = CourseController;
