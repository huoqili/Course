import instance from "./index";
const url = '/admin/chapter';

function chapterInsert(data){
    return instance.post(url,data)
}
function chapterQuery(params){
    return instance.get(url,{
        params
    })
}

export  {chapterInsert, chapterQuery}
