<template>
    <ul class="tabbar">
        <li :class="{active: current===item.name }" v-for="item in tabbar" :key="item.url">
            <router-link :to="{name:item.url}">
                <i :class="['iconfont',item.icon]"></i>
                <div>{{item.title}}</div>
            </router-link>
        </li>

    </ul>
</template>

<script>
    export default {
        name: "AisheTab",
        props:{
           current:{
               type:String,
               default:'home'
           }
        },
        data(){
            return {
                tabbar:[
                    {url:'home',icon:'icon-fenxiang',title:'首页',name:'home'},
                    {url:'study',icon:'icon-weibo',title:'学习',name:'study'},
                    {url:'community',icon:'icon-shejiaotubiao-39',title:'社区',name:'community'},
                    {url:'my',icon:'icon-weixin',title:'我的',name:'my'}
                ]
            }
        }
    }
</script>

<style scoped>
 .tabbar{
     position: fixed;
     left: 0;
     bottom: 0;
     z-index:999;
     width: 100%;
     height: 1.6rem;
     padding:0.1rem 0.16rem 0;
     box-sizing: border-box;
     background: #FFFFFF;
     display: flex;
     justify-content: space-between;
     text-align: center;
 }
 .tabbar > li.active i{
     color: #3382FF;
 }
 .tabbar > li.active div{
     color: #3382FF;
 }
</style>
