<template>
    <div>
        <el-form :model="courseForm" :inline="true">
            <el-form-item label="课程分类">
                <el-select v-model="courseForm.id">
                     <el-option v-for="item in coursecate" :key="item.id" :value="item.id" :label="item.catename"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程名称">
                <el-input v-model="courseForm.cname"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button >搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="courseTable">
            <el-table-column label="课程名称" prop="cname"></el-table-column>
            <el-table-column label="课程价格" prop="cprice"></el-table-column>
            <el-table-column label="课程缩略图">
                <template slot-scope="scope">
                    <img :src="scope.row.cthumb" width="200" alt="">
                </template>
            </el-table-column>
            <el-table-column label="所属分类" prop="catename"></el-table-column>
            <el-table-column label="创建时间" prop="ctimes"></el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="primary">
                        <router-link :to="{name:'chapterindex',query:{cid:scope.row.cid}}">
                            章节目录
                        </router-link>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          :current-page.sync="paginate.page"
          :page-size="paginate.limit"
          :page-sizes="[paginate.limit,15,20,25]"
          @current-change="handlerCurrentChange"
          layout="total,sizes,prev,pager,next,jumper"
        ></el-pagination>
    </div>
</template>

<script>
   import {courseIndex} from "../../http/course";
   import {couseCateIndex} from "../../http/coursecate";
   import {URLPATH} from "../../config";
    export default {
        name: "index",
        data(){
          return {
             coursecate:[],
             courseForm:{id:'',cname:''},
             courseTable:[],
             total:0,
             paginate:{
                 limit:2,
                 page:1
             }
          }
        },
        methods:{
            initCourseCate(){
                couseCateIndex().then(res=>{
                    this.coursecate = res.data;
                }).catch()
            },
            initCourseTable(){
                let params = Object.assign({},this.paginate,this.courseForm);
                courseIndex(params).then(res=>{
                    if(res.data.result.length){
                        let data = res.data.result.map(ele=>{
                            ele.cthumb = URLPATH + ele.cthumb;
                            return ele;
                        });
                        this.total = res.data.count;
                        this.courseTable = data;
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            handlerCurrentChange(value){
                this.paginate.page = value;
                this.initCourseTable();
            },
            handlerSearch(){
                this.paginate.page = 1;
                this.initCourseTable();
            }
        },
        created() {
            this.initCourseCate();
            this.initCourseTable();
        }
    }
</script>

<style scoped>
  a{
      color: white;
  }
</style>
