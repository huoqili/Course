<template>
    <el-container class="main">
        <el-aside width="200px">
            <h2></h2>
            <el-menu :router="true">
                <el-menu-item index="/datacenter">
                     <template slot="title">
                         <i class="el-icon-s-tools"></i>
                         <span>数据中心</span>
                     </template>
                </el-menu-item>
                <el-submenu index="coursecate">
                    <template slot="title">
                        <i class="el-icon-s-tools"></i>
                        <span>课程分类管理</span>
                    </template>
                    <el-menu-item index="/coursecate">课程分类</el-menu-item>
                </el-submenu>
                <el-submenu index="course">
                    <template slot="title">
                        <i class="el-icon-s-tools"></i>
                        <span>课程管理</span>
                    </template>
                    <el-menu-item index="/courseinsert">课程添加</el-menu-item>
                    <el-menu-item index="/courseindex">课程查看</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="main-header">
                <el-menu mode="horizontal" style="float: right">
                    <el-menu-item index="1-1">
                        <template slot="title">
                            <i class="iconfont icon-wo"></i>
                            <span v-if="userinfo">{{userinfo.username}}</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="1-2">
                        <template slot="title">
                            <i class="iconfont icon-wo"></i>
                            <span>设置</span>
                        </template>
                        <el-menu-item index="1-3">

                             <router-link :to="{name:'password'}">修改密码</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-4">
                             退出
                        </el-menu-item>

                    </el-submenu>
                </el-menu>
            </el-header>
            <el-main>
                <el-breadcrumb separator="/" >
                    <el-breadcrumb-item>首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>
                <div style="height: 30px"></div>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Main",
        data(){
            return {
                userinfo:null
            }
        },
        methods:{
            initUserinfo(){
              let userinfo =  JSON.parse( sessionStorage.getItem('userinfo'));
              this.userinfo = userinfo;
            }
        },
        mounted() {
            this.initUserinfo();
        }
    }
</script>

<style scoped>
  .main{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
  }
    .main-header{
        border-bottom: 1px solid #e6e6e6;
    }
  .el-menu.el-menu--horizontal{
      border-bottom: none;
  }
  .el-menu{
    background: transparent;
  }

</style>
