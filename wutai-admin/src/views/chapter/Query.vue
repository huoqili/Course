<template>
    <div>
         <el-form :model="searchForm" :inline="true">
             <el-form-item>
                 <el-input v-model="searchForm.chname" placeholder="请输入章节名称"></el-input>
             </el-form-item>
             <el-form-item>
                 <el-button type="primary" @click="handlerSearch">搜索</el-button>
             </el-form-item>
         </el-form>
         <el-table :data="chapterTable">
             <el-table-column  type="expand">
                 <template slot-scope="scope">
                     <video  width="400" :src="scope.row.chvideo" controls></video>
                 </template>
             </el-table-column>
             <el-table-column prop="chname" label="章节名称"></el-table-column>
             <el-table-column prop="chduration" label="视频时长"></el-table-column>
         </el-table>
    </div>
</template>

<script>
    import {chapterQuery} from "../../http/chapter";
    import {URLPATH} from "../../config";
    export default {
        name: "Query",
        data(){
            return {
                searchForm:{chname:''},
                chapterTable:[],
                paginate:{page:1,limit:5},
                total:0,
                cid:0,
                t:''
            }
        },
        methods:{
            initChapterTable(){
                let parmas = Object.assign({},this.paginate,this.searchForm,{cid:this.cid});
                chapterQuery(parmas).then(res=>{
                    let {count,data,msg} = res;
                    if(data.length){
                         data = data.map(ele=>{
                             ele.chvideo = URLPATH + ele.chvideo;
                             return ele;
                         })
                         this.chapterTable = data;
                         this.total = count;
                    }else{
                        this.$message.warning(msg)
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            handlerSearch(){
                this.paginate.page = 1;
                this.initChapterTable();
            },
            handlerCurrentChange(val){
                this.paginate.page = val;
                // this.initChapterTable();
            },
            handlerPagesSizeChange(val){
                 this.paginate = {
                     page:1,
                     limit: val
                 }
                 // this.initChapterTable();
            }
        },
        watch:{
             total(){
                 console.log(this.total)
             },
             'searchForm.chname'(){
                 if(this.t){
                     clearTimeout(this.t);
                 }
                 this.t = setTimeout(()=>{
                     console.log('搜索字段变化')
                 },200)

             },
             paginate:{
                 handler:function(){
                     console.log('paginate--change')
                 },
                 deep:true
             }

        },
        mounted() {
            let cid = this.$route.query.cid;
            this.cid = cid;
            this.initChapterTable();
        }
    }
</script>

<style scoped>

</style>
