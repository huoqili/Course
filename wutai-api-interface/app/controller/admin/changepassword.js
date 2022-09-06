'use strict';

const Controller = require('egg').Controller;

class ChangepasswordController extends Controller {
  async index() {
    const { ctx, app, service } = this;
    const { SUCCESS, FAIL } = app.config.code;
    const id = ctx.id;
    // 数据校验
    const postdata = ctx.request.body;
    const rules = {
      oldpass: { type: 'string', required: true, min: 6, max: 8 },
      newpass: { type: 'string', required: true, min: 6, max: 8 },
      confirmpass: { type: 'password', compare: 'newpass' },
    };
    const validate = app.validator.validate(rules, postdata);
    if (validate) {
      const { field, message } = validate[0];
      ctx.body = {
        code: FAIL,
        msg: field + ':' + message,
      };
      return;
    }
    // 获取用户信息
    const userinfo = await service.admin.find({ id });
    // oldpass === password
    if (ctx.setPassword(postdata.oldpass) !== userinfo.password) {
      ctx.body = {
        code: FAIL,
        msg: '原密码错误',
      };
      return;
    }
    const newpass = ctx.setPassword(postdata.newpass);
    const updateResult = await service.admin.update({ password: newpass }, { id });
    if (updateResult === 1) {
      ctx.body = {
        code: SUCCESS,
        msg: '密码修改成功',
      };
    } else {
      ctx.body = {
        code: FAIL,
        msg: '密码修改失败',
      };
    }

  }
}

module.exports = ChangepasswordController;
