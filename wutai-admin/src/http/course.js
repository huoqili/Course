import instance from "./index";
const url = '/admin/course';
function courseInsert(data){
  return  instance.post(url,data)
}
function courseIndex(params) {
  return instance.get(url,{
    params
  })
}
export  {courseInsert, courseIndex}
