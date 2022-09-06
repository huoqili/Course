'use strict';

const Controller = require('egg').Controller;

class CoursecateController extends Controller {
  async insert() {
    const { ctx, app, service } = this;
    const { SUCCESS, FAIL } = app.config.code;
    const postdata = ctx.request.body;
    const rules = {
      catename: { type: 'string', required: true, min: 2, max: 10 },
      cateicon: 'string',
      catesort: 'int?',
    };

    const validateResult = app.validator.validate(rules, postdata);
    if (validateResult) {
      const { field, message } = validateResult[0];
      ctx.body = {
        code: FAIL,
        msg: field + ':' + message,
      };
      return;
    }
    try {
      const insertResult = await service.coursecate.insert(postdata);
      if (insertResult >= 0) {
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
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: '服务器错误',
      };
    }
  }
  async query() {
    const { ctx, app, service } = this;
    const { SUCCESS, FAIL } = app.config.code;
    const result = await service.coursecate.query();
    if (result.length) {
      ctx.body = {
        code: SUCCESS,
        msg: '数据获取成功',
        data: result,
      };
    } else {
      ctx.body = {
        code: SUCCESS,
        msg: '暂无数据',
        data: result,
      };
    }
  }
  async find() {
    const { ctx, app, service } = this;
    const { SUCCESS, FAIL } = app.config.code;
    const id = ctx.query.id;
    if (id && Number.isInteger(id)) {
      ctx.body = {
        code: FAIL,
        msg: '查询id是整数',
      };
    }
    const result = await service.coursecate.find(id);
    if (result) {
      ctx.body = {
        code: SUCCESS,
        msg: '数据获取成功',
        data: result,
      };
    } else {
      ctx.body = {
        code: SUCCESS,
        msg: '暂无数据',
      };
    }
  }
}

module.exports = CoursecateController;
