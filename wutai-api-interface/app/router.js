'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 管理端路由
  // 管理端登录
  router.post('/admin/upload',controller.admin.upload.index);
  router.post('/admin/login', controller.admin.login.check);
  router.get('/admin/info',controller.admin.info.index);
  router.post('/admin/changepassword',controller.admin.changepassword.index);
  router.post('/admin/coursecate/insert',controller.admin.coursecate.insert)
  router.get('/admin/coursecate/query',controller.admin.coursecate.query)
  router.get('/admin/coursecate/find',controller.admin.coursecate.find);
  // restful
  router.resources('/admin/course',controller.admin.course);
  router.resources('/admin/chapter',controller.admin.chapter);
  //  /admin/course/:id   .course.show
  // router.delete('/admin/course',controller.admin.course.destory);
  // router.put('/admin/course',controller.admin.course.update);
  // router.get('/admin/course/find',controller.admin.course.find);
  // *******
  router.resources('/index',controller.index.index)
  router.resources('/index/courseinfo',controller.index.courseinfo)
  router.resources('/index/courselist',controller.index.courselist)
};
