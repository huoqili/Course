import instance from "./http";
import api from "./apipath";
function index(){
 return instance.get(api.index);
}
function courseList(params){
    return instance.get(api.courseList,{
        params
    })
}
function coursrInfo(cid){
   return instance.get(api.courseInfo+'/'+cid)
}

export {index,coursrInfo,courseList}
