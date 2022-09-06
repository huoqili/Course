<template>
    <div class="main">
        <!-- 背景 -->
        <div class="back"></div>
        <!-- 搜索栏 -->
        <form action="" >
            <div class="search">
                <div class="nav_icon_search">
                   <img src="../../imgs/search.png" alt="">
                </div>
                <div class="input">
                    <input type="text" name="title" id="" placeholder="请搜索你想要的内容">
                </div>
            </div>
            <a><img src="../../imgs/talk.png" alt=""></a>
        </form>
        <!-- 轮播 -->
        <div class="banner">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="item in banner" :key="'banner'+item.bid">
                    <img v-lazy="item.img" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 分类 -->
        <div class="cate">
            <ul>
                <li v-for="item in courseCate" :key="'cate'+item.id">
                    <router-link :to="{name:'courselist',query:{id:item.id}}">
                        <img :src="urlpath+item.cateicon" :title="item.catename" :alt="item.catename"><br>
                        <span>{{item.catename}}</span>
                    </router-link>
                </li>

                <li>
                    <img src="../../imgs/cate4.png" alt="我的课程"><br>
                    <span>我的课程</span>
                </li>
            </ul>
        </div>
        <!-- 咨询 -->
        <aishe-title url="/news">
            <slot>最新咨询</slot>
        </aishe-title>

        <div class="zx_cord">
            <ul>
                <li v-for="item in news" :key="'news'+item.nid">
                    <router-link :to="{name:'news',query:{nid:item.nid}}">
                        <img src="../../imgs/jin.png" alt="">
                        <div>
                            <b>{{item.title}}</b><br>
                            <span>【咨讯】</span>
                            <span>{{item.ctime}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 热门课程 -->

        <aishe-title url="/courselist">
            <slot>热门课程</slot>
        </aishe-title>

        <div class="containter">
            <div class="course" v-for="item in course" :key="'course'+item.cid">
                <router-link :to="{name:'coursedetail',query:{cid:item.cid}}">
                    <img :src="urlpath+item.cthumb" :alt="item.cname" :title="item.cname">
                    <div class="course_content">
                        <p>{{item.cname}}</p>
                        <p>{{item.cdesc}}</p>
                        <div class="course_pay">
                            <div>
                                <span>{{item.cperiod}}课时</span>
                                <b>·</b>
                                <span>￥{{item.cprice}}</span>
                            </div>
                            <span>已售 {{item.csales}}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <aishe-tab current="study"></aishe-tab>
    </div>
</template>
<script>
    import Vue from 'vue';
    import { Lazyload } from 'vant';
    Vue.use(Lazyload);
    import { index } from '../../http'
    import {URLPATH} from "../../config/config";
    import AisheTitle from "../../components/title/AisheTitle";
    import AisheTab from "../../components/tab/AisheTab";
  export default {
    name:"Index",
    data(){
        // 轮播图 课程分类 咨询 热门课程
        return{
            urlpath:URLPATH,
            banner:[],
            courseCate:[],
            news:[],
            course:[]
        }
    },
    methods:{
       initData(){
           index().then(res=>{
              let {banner, course, coursecate, news} = res.data;
              this.banner = banner;
              this.course = course;
              this.news = news;
              this.courseCate = coursecate;
           }).catch(err=>{
               console.log(err);
           })
       }
    },
    components:{
       AisheTitle, AisheTab
    },
    mounted() {
        this.initData();
    }
}
</script>
<style>
</style>
<style scoped>
    @import url('../../css/main.css');
</style>
