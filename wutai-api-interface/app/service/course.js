'use strict';

const Service = require('egg').Service;

class CourseService extends Service {
  async create(data) {
     let result = await  this.app.mysql.insert('course',data);
     return result.affectedRows;
  }
  //   .index({whereobj,orders,field,limit,page});
  //  {}  {id:1,cname:['','like']}
  async index({whereobj,orders,limit,page,field}){
     let sql = `select ${field} from course,course_cate where  `;
     let countSql = `select count(*) as count from course,course_cate where `
     if(JSON.stringify(whereobj) != JSON.stringify({})){
        for(let i in whereobj){
           let value = whereobj[i];
           if(Array.isArray(value)){
              let [v,op] = value;
              sql += ` ${i} ${op} '${v}' and`;
              countSql += ` ${i} ${op} '${v}' and`;
           }else{
              sql += ` ${i}='${value}' and`;
              countSql += ` ${i}='${value}' and`;
           } 
        } 
     }
     sql+="  course.id=course_cate.id "; 
     countSql+="  course.id=course_cate.id "; 
     sql += ` order by ${orders.order} ${orders.type} `;
     let offset = (page - 1) * limit;
     sql += ` limit ${offset},${limit}`;

     let result = await this.app.mysql.query(sql);
     let count = await this.app.mysql.query(countSql);
     return  {result,count:count[0].count};
  }
  // 最新6课程 , 推荐课程， 收藏课程
  // select xxx from course order by cid desc limit 0,6
  /*
   options
  {
      attributes:[''],
      order:[ ['cid','desc'] ],
      limit:6 
   }
   control ---  params
   server.course.query()
   {
      attributes:['cid','cthumb','cname',''],
      order:['cid','desc'] || 'cid',
      limit:6 
   }
   */ 
  // select xxx from course where id=1 and cid!=2 order by cid desc limit 0,6
  /*
   {
      attributes:[''],
      order:[ ['cid','desc'] ],
      limit:6 ,
      where:{

      }
   } 
  
    control ---  params
   server.course.query()
   {
      attributes:['cid','cthumb','cname',''],
      order:['cid','desc'] || 'cid',
      limit:6,
      where:{
         id:1,
         cid:{
            [Op.ne]:2
         } 
      } 
   }
  */
  
  // select xxx from course where cid in (1,2,3)
 /*  {
   attributes:[''],
   order:[ ['cid','desc'] ],
   where:{

   }

  } */

  async query({where,order,limit,attributes=['cid','cdesc','cname','cthumb','cprice','csales','cperiod']}={}){
        let {app} = this;
        let options = {};
        if(where){
           options.where = where;
        }
        if(attributes){
           options.attributes = attributes;
        }
        if(order){
           options.order = [ order ];
        }
        if(limit){
           options.limit = limit;
        }
        let result = await app.model.Course.findAll(options);
        return result;
  }
  async queryOne(cid){
     let result = await this.app.model.Course.findByPk(cid);
     return result;
  }
  async findAndCountAll({where,order='cid',limit=10,offset=0,attributes=['cid','cdesc','cname','cthumb','cprice','csales','cperiod']}={}){
   let {app} = this;
   let options = {};
   if(where){
      options.where = where;
   }
   if(attributes){
      options.attributes = attributes;
   }
   if(order){
      options.order = [ order ];
   }
   if(limit){
      options.limit = limit;
   }
   if(offset){
      options.offset = offset;
   }
   let result = await app.model.Course.findAndCountAll(options);
   return result;
  }
}

module.exports = CourseService;
