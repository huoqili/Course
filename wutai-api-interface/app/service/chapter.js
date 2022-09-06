'use strict';

const Service = require('egg').Service;

class ChapterService extends Service {
  async create(data) {
    //   this.app.mysql
    let {app} = this;
    console.log('模型文件名字首字母大写');
    let result = await  app.model.Chapter.create(data);
    return result.chid;
  }
  async update(data,chid){
      let {app} = this;
      let result = await app.model.Chapter.update(data,{
          where:{
              chid:chid
          }
      });
      return result[0];
  }
  async destroy(chid){
      let { app } = this;
      let result = await app.model.Chapter.destroy({
          where:{
              chid:chid
          }
      });
      // 删除行数
      return  result;
  }

  async findAll({where,order}={}){
     let {app} = this;
     let options = {};
      if(where){
         options.where = where;
      }
      if(order){
         options.order = [ order ];
      }
      let result = await app.model.Chapter.findAll(options);
      return result;
  }

  async findOrCreate(){
    let {app} = this;
    let {Op, fn, col} =  app.Sequelize ;
    let result =await app.model.Chapter.findOrCreate({
        where:{
           cid:9
        },
        defaults:{
           chname:'findorCreate',
           chduration:100,
           chvideo:'1.mp4',
           cid:20
        }
    })
    return result;
  }
  /**
   * 
   * @returns 
   * .findAndCountAll()
   * .findAndCountAll({})
   * .findAndCountAll({attributes:['xx']})
   * .findAndCountAll({where:{}})
   * .findAndCountAll({where:{},attributes:['xx']})
   * .findAndCountAll({where:{},attributes:['xx'],limit:'',offset:''})
   * { where:{
   *     chname:{
   *        [Op.substring]:'xxx'
   *     }
   *   }
   * }
   * {where,attributes,order,limit=10,offset=0}={}
   */
  async findAndCountAll({where,attributes,order,limit=10,offset=0}={}){
    
    let {app} = this;
    let {Op, fn, col} =  app.Sequelize ;
    let obj = {
        limit,offset
    };
    console.log('chapter------------------------------------------');
    console.log(where);
    console.log(where && typeof where === 'object' && Object.keys(where).length);
    
    if(where && typeof where === 'object' && Object.keys(where).length){
        obj.where = where
    }
    console.log(obj);
    if(attributes && Array.isArray(attributes) && attributes.length){
        obj.attributes = attributes;
    }
    // 存在 数据类型  非空
    if(order && Array.isArray(order) && order.length){
        obj.order = order;
    }
    
    
    let result = app.model.Chapter.findAndCountAll(obj)
    return result;
  }
}

module.exports = ChapterService;
