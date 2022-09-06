'use strict';

const Controller = require('egg').Controller;

class ChapterController extends Controller {
  async create() {
    const { ctx, app, service } = this;
    const { SUCCESS, FAIL } = app.config.code;
    const postdata = ctx.request.body;

    // 数据校验
    // 业务逻辑
    try {
      const result = await service.chapter.create(postdata);
      if (result) {
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
        code: FAIL,
        msg: '服务器错误',
      };
      ctx.status = 500;

    }
  }
  async index() {
    const { ctx, app, service } = this;
    const { SUCCESS, FAIL } = app.config.code;
    const { Op } = app.Sequelize;
    const { chname, page, limit, cid } = ctx.query;
    const queryObj = {};
    queryObj.where = {
      cid,
    };
    if (chname) {
      queryObj.where.chname = {
        [Op.substring]: chname,

      };
    }
    page && limit && (queryObj.offset = (page - 1) * limit);
    limit && (queryObj.limit = limit * 1);
    //   queryObj.attributes = [];

    const { count, rows } = await service.chapter.findAndCountAll(queryObj);
    if (count) {
      ctx.body = {
        code: SUCCESS,
        msg: '数据获取成功',
        count,
        data: rows,
      };
    } else {
      ctx.body = {
        code: SUCCESS,
        msg: '暂无数据',
        data: [],
      };
    }
  }
}

module.exports = ChapterController;
