const { Controller } = require('egg');

class InfoController extends Controller {
  async index() {
    const { ctx, app } = this;
    const token = ctx.request.headers.token;
    const result = app.jwt.verify(token, app.config.jwt.secret);
    ctx.body = {
      result,
    };
  }
}
module.exports = InfoController;
