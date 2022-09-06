'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index() {
     let {ctx, service, app} = this;
     let {Op} = app.Sequelize; 
     let courseOption = {
       order:['cid','desc'],
       limit:4
     }
     let course =await service.course.query(courseOption);
     let courseCate = await service.coursecate.query();
     let banner = [
        {bid:1,img:'http://m.sxuek.com/subject/20210425/image/bb.jpg'},
        {bid:2,img:'http://m.sxuek.com/uploadfile/2021/0305/20210305093857527.png'},
        {bid:3,img:'http://m.sxuek.com/uploadfile/2020/1020/20201020094938891.jpg'}
     ];
     let news = [
         {nid:1,title:'高薪就业 就来优逸客',ctime:'2021-08-11'},
         {nid:2,title:'数智时代你需要更加努力',ctime:'2021-10-11'},
         {nid:3,title:'未来数字新方向 优逸客老师云栖大会探索学习之旅',ctime:'2021-08-11'}
     ];


     ctx.body = {
         code:200,
         msg:"success",
         data:{
             banner:banner,
             coursecate:courseCate,
             news:news,
             course:course
         }
     }
  }
}

module.exports = IndexController;
