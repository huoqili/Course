const { Controller } = require('egg');

class LoginController extends Controller {
  async check() {
    const { ctx, app, service } = this;
    const { SUCCESS, FAIL } = app.config.code;
    // 用户名 密码
    const postdata = ctx.request.body;
    // 校验参数
    // ctx.validate()
    const rules = {
      username: { type: 'string', required: true, min: 3, max: 10 },
      password: { type: 'string', required: true, min: 6, max: 8 },
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
    const userInfo = await service.login.find(postdata.username);
    if (!userInfo) {
      ctx.body = {
        code: FAIL,
        msg: '该用户名不存在',
      };
      return;
    }
    const pass = ctx.setPassword(postdata.password);
    if (pass === userInfo.password) {
      const payload = { id: userInfo.id, username: userInfo.username };
      const token = app.jwt.sign(payload, app.config.jwt.secret);
      ctx.body = {
        code: SUCCESS,
        msg: '登录成功',
        token,
        userinfo: payload,
      };
    } else {
      ctx.body = {
        code: FAIL,
        msg: '密码错误',
      };
    }

  }
}
module.exports = LoginController;
