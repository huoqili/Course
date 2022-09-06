<template>
    <div class="main">
        <div class="header">
            <div class="title">
                <i class="iconfont icon-xiangzuo"></i>
                <span>热门课程</span>
            </div>
        </div>
        <div class="course-search">
            <van-dropdown-menu>
                <van-dropdown-item v-model="params.search" :options="searchOptions" />
                <van-dropdown-item v-model="params.order" :options="orderOptions" />
            </van-dropdown-menu>
        </div>
        <div style="height:1.8rem"></div>

        <div class="course1">
<!--            <img src="../../images/course1.png" alt="">-->
            <div class="course_cord">
                <p>高级VIP直通车专项课</p>
                <p>后台设置讲解，推广工具使用</p>
                <div class=""></div>
                <div class="course_pay">
                    <div>
                        <span>10课时<b>·</b></span>

                        <span>￥550</span>
                    </div>
                    <span>已售320</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    /*
    *  请求地址
    *     某一个分类的课程列表  /courselist?id=1
    *     所有的课程列表   /courselist
    *   功能：
    *     分页
    *        触发： 移动端上拉   pc点击页码
    *        查看分页： 移动端逐页  pc任意页
    *        展示内容： 移动端加载的所有页内容  pc当前页
    *     搜索
    *        全部 免费  收费
    *     排序
    *        默认  销量  点击量
    * */
import {courseList} from "../../http";

export default {
    name:"List",
    data(){
       return {
           // 课程分类id
          id:0,
          courseList: [],
          paginate:{page:1,limit:10},
          total:0,
          searchOptions:[
              {text:'全部',value:-1},
              {text:'收费',value:1},
              {text:'免费',value:0}
          ],
          orderOptions:[
              {text:'默认',value:'cid'},
              {text:'价格',value:'cprice'},
              {text:'点击量',value:'cviews'}
          ],
          params:{
              search:-1,
              order:'cid'
          }
       }
    },
    methods:{
      initData(){
          let params = Object.assign({},this.paginate,this.params,{id:this.id})
          courseList(params).then(res=>{
              console.log(res);
          }).catch(err=>{
              console.log(err);
          })
      }
    },
    mounted() {
        let id = this.$route.query.id || 0;
        this.id = id;
        this.initData();
    }
}
</script>
<style scoped>
   @import url('../../css/courselist.css');
</style>
