<template>
    <div class="details">
        <!-- 试看 -->
        <div class="proved">
            <div class="top w">
                <van-icon name="arrow-left" color="#ffffff" />
                <van-icon name="arrow-left" color="#ffffff" />
            </div>
            <div class="middle">
                <div class="video" v-if="currentvideo">
                    <video :src="currentvideo" controls autoplay></video>
                </div>
                 <div  class="bg" v-if="courseInfo && !currentvideo" :style="{backgroundImage:'url('+urlpath+courseInfo.cbg+')'}">

                 </div>

            </div>
        </div>
        <!-- 中间字体 -->
        <div class="middlefont w" v-if="courseInfo">
            <h2>{{courseInfo.cname}}</h2>
            <h3>{{courseInfo.cteacher}}：{{courseInfo.cteacher_position}} </h3>
            <h4>{{courseInfo.cviews}} 观看- {{courseInfo.cevaluate}}评价-4转发</h4>
        </div>
        <!-- 内容 -->
        <div class="content w">
            <van-tabs v-model="activeName" animated>
                 <van-tab title="简介" name="intro">
                      <div v-if="courseInfo">
                          {{courseInfo.cintro}}
                      </div>
                 </van-tab>
                <van-tab title="目录" name="chapter">
                      <div v-if="courseChapter.length">
                          <div v-for="(item,index) in courseChapter" :key="item.chid">
                              <div class="contentbottom-contentfont" >
                                  <span>第 {{index+1}} 节：</span>
                                  <span>《{{item.chname}}》</span>

                              </div>
                              <div class="time">
                                  {{item.chduration | secondToMin }}
                              </div>
                          </div>
                      </div>
                </van-tab>
                <van-tab title="评价" name="recommend">
                    评价
                </van-tab>
            </van-tabs>

        </div>
        <!-- foot -->
        <div class="clear">
        </div>
        <!--   评价 底部      -->
        <div class="footer" v-if="activeName ==='recommend'">
            <div class="w">
                <div class="small">
                    <div class="headset">

                        <h2>客服-评价</h2>
                    </div>
                    <div class="collection">
                        <h2>收藏</h2>
                    </div>
                </div>
                <div class="buy">
                    <h2>评价</h2>
                </div>
            </div>
        </div>
       <!--   简介 目录底部      -->
        <div class="footer" v-else>
            <div class="w">
                <div class="small">
                    <div class="headset">
                        <i class="iconfont icon-yonghufill"></i>
                        <h2>客服</h2>
                    </div>
                    <div class="collection">
                        <i class="iconfont icon-shoucang"></i>
                        <h2>收藏</h2>
                    </div>
                </div>
                <div class="buy">
                    <h2>立即购买</h2>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {coursrInfo} from "../../http";
    import {URLPATH} from "../../config/config";
    export  default {
        name:'coursedetail',
        data(){
            return {
                urlpath:URLPATH,
                courseInfo: null,
                courseChapter:[],
                comment:[],
                recommend:[],
                cid:0,
                // 播放视频路径
                currentvideo:'',
                // 选项卡
                activeName:'intro',
                /*numberToChar:{
                    1:'一',
                    2:'二'
                }*/
            }
        },
        methods:{
           initData(){
               coursrInfo(this.cid).then(res=>{
                   let data = res.data;
                   let {courseinfo,chapter,recommend} = data;
                   this.courseInfo = courseinfo;
                   this.courseChapter = chapter;
                   this.recommend = recommend;
               }).catch(err=>{
                   console.log(err);
               })
           }
        },
        mounted() {
           let cid = this.$route.query.cid;
           this.cid = cid;
           this.initData();
        }
    }
</script>

<style>
    @import url("../../css/details.css");
    .van-tabs__line{
       background-image: linear-gradient(173deg, #3382ff 0%, #00f6ff 100%);
    }
</style>
