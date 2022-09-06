'use strict';
const Controller = require('egg').Controller;
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');
class UploadController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { SUCCESS, FAIL } = app.config.code;
    try {
      // 接受文件
      const stream = await ctx.getFileStream();
      // 移动文件
      // upload/img/20211016/时间戳随机数.后缀
      const basedir = 'app/public/upload/img';
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const date1 = date.getDate();
      const timeJoin = '/' + year + month + date1;
      let uploaddir = basedir + timeJoin;
      if (!fs.existsSync(uploaddir)) {
        fs.mkdirSync(uploaddir);
      }
      const timestamp = date.getTime();
      const randomNumber = Math.round(Math.random() * 1000);
      // index.html index.css 1.1.jpg 2.png
      // /(\.[a-zA-Z]+)$/i   RegExp.$1
      const extname = path.extname(stream.filename);
      const filename = '/' + timestamp + randomNumber + extname;
      uploaddir += filename;
      const writeStream = fs.createWriteStream(uploaddir);
      stream.pipe(writeStream);
      const urlpath = '/public/upload/img' + timeJoin + filename;
      ctx.body = {
        code: SUCCESS,
        msg: '文件上传成功',
        url: urlpath,
      };
    } catch (err) {
      await sendToWormhole(stream);
      ctx.body = {
        code: FAIL,
        msg: '文件上传失败',
      };
    }
  }
}

module.exports = UploadController;
