import instance from "./index";
let url = '/admin/coursecate/query';
function couseCateIndex() {
  return   instance.get('/admin/coursecate/query')
}
function courseCateInsert(data) {
  return instance.post(url,data)
}
export {courseCateInsert , couseCateIndex}
/*
* 网站设置
* 轮播图管理
* 课程
*
* 前台：首页 列表 详情
* */
