<template>
  <div v-loading.lock="showLoading">
      <el-tabs v-model="activeTab" @tab-click="handlerTabtoggle">
          <el-tab-pane label="分类添加" name="insert">
               <el-form :model="courseCateInsertForm" :rules="courseCateInsertFormRules" ref="courseCateInsertForm">
                    <el-form-item label="课程分类名称" prop="catename">
                        <el-input v-model="courseCateInsertForm.catename" placeholder="请输入课程分类名称"></el-input>
                    </el-form-item>
                   <el-form-item label="课程分类数字排序" >
                       <el-input type="number" v-model.number="courseCateInsertForm.catesort" placeholder="请输入课程分类数字排序"></el-input>
                   </el-form-item>
                   <el-form-item label="课程分类图标">

                   </el-form-item>
                   <el-form-item>
                        <el-upload :action="uploadpath+'/admin/upload'"  :show-file-list="false"
                                   :on-success="handlerIconupload"
                        >
                            <img v-if="courseCateInsertForm.cateicon" :src="uploadpath+courseCateInsertForm.cateicon" width="200"  class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                   </el-form-item>
                   <el-form-item>
                       <el-button type="primary" @click="handlerCourseCateInsert">提交</el-button>
                   </el-form-item>
               </el-form>
          </el-tab-pane>
          <el-tab-pane label="分类查看" name="query">
               <el-table :data="courseCateTable">
                   <el-table-column label="分类名称" prop="catename"></el-table-column>
                   <el-table-column label="分类排序" prop="catesort"></el-table-column>
                   <el-table-column label="分类icon">
                       <template slot-scope="scope">
                           <img :src="scope.row.cateicon" :alt="scope.row.catename" width="100">
                       </template>
                   </el-table-column>
                   <el-table-column label="操作">
                       <template slot-scope="scope">
                           <el-button type="primary" @click="handlerCourseCateEdit(scope.row.id)">编辑</el-button>
                           <el-button type="warning">删除</el-button>
                       </template>

                   </el-table-column>
               </el-table>

          </el-tab-pane>
      </el-tabs>

<!--  编辑    -->
        <el-dialog title="课程分类编辑" :visible.sync="showUpdateDialog">
            <div v-if="courseCateOne">
                <el-form :model="courseCateOne">
                    <el-form-item label="课程分类名称">
                        <el-input v-model="courseCateOne.catename"></el-input>
                    </el-form-item>
                    <el-form-item label="课程分类数字排序">
                        <el-input v-model.number="courseCateOne.catesort"></el-input>
                    </el-form-item>
                    <el-form-item label="课程分类名称"></el-form-item>
                    <el-form-item>
                        <el-upload :action="uploadpath+'/admin/upload'"  :show-file-list="false"
                                   :on-success="handlerIconupload"
                        >
                            <img v-if="courseCateOne.cateicon" :src="uploadpath+courseCateOne.cateicon" width="200"  class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>

            <div slot="footer">
                底部插槽
            </div>
        </el-dialog>
  </div>
</template>

<script>
    import axios from 'axios';
    import  {SUCCESS,URLPATH} from "../../config";

    export default {
        name: "Coursecate",
        data() {
            return {
                uploadpath:URLPATH,
                showLoading:false,
                activeTab: 'query',
                courseCateInsertForm:{
                    catename:'',
                    cateicon:'',
                    catesort:10
                },
                courseCateInsertFormRules:{
                    catename:[
                        {required:true,message:"分类名称必填",trigger:"blur"},
                        {type:'string',min:2,max:6,message: "2-6个字符",trigger: "blur"}
                    ]
                },
                // 课程分类数据
                courseCateTable:[],
                // 课程分类编辑
                courseCateOne:null,
                showUpdateDialog:true
            }
        },
        methods:{
            // tab切换事件
            handlerTabtoggle(){
                this.activeTab === 'query' && this.initCourseCate()
            },
            // 添加图片上传
            handlerIconupload(res){
                if(res.code === SUCCESS){

                    this.courseCateInsertForm.cateicon = res.url;
                }else{
                    this.$message.warning(res.msg);
                }
            },
            // 课程分类添加
            handlerCourseCateInsert(){
                 this.$refs.courseCateInsertForm.validate(valid=>{
                     if(valid){
                         let token = sessionStorage.getItem('islogin');
                         let url = URLPATH + '/admin/coursecate/insert';
                         this.showLoading = true;
                         axios.post(url,this.courseCateInsertForm,{
                             headers:{
                                 token
                             }
                         }).then(res=>{
                             this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                         }).catch(err=>{
                             console.log(err);
                         }).finally(()=>{
                             this.showLoading = false;
                         })
                     }
                 })
            },
            // 课程分类获取
            initCourseCate(){
                let url = URLPATH + '/admin/coursecate/query';
                let token = sessionStorage.getItem('islogin');
                this.showLoading = true;
                axios.get(url,{
                    headers:{
                        token
                    }
                }).then(res=>{
                    let {msg, data} = res.data;
                    data = data.map(ele=>{
                        ele.cateicon = this.uploadpath + ele.cateicon;
                        return ele;
                    })
                    this.$message.success(msg);
                    this.courseCateTable = data;
                }).catch(err=>{
                    console.log(err);
                }).finally(()=>{
                    this.showLoading = false;
                })
            },
            // 课程分类编辑 --- 查看
            /*
            *  1. 显示编辑弹框
            *  2. 获取编辑数据
            * */
            handlerCourseCateEdit(id){
                console.log(id);
                this.showUpdateDialog = true;
                let token = sessionStorage.getItem('islogin');
                let url = URLPATH + '/admin/coursecate/find';
                axios.get(url,{
                    headers:{token},
                    params:{id}
                }).then(res=>{
                    let {msg,data} = res.data;
                    if(data){
                        this.$message.success(msg);
                        this.courseCateOne = data;
                    }else{
                        this.$message.warning(msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            // 编辑图片上传
            handlerIconEditupload(res){
                if(res.code === SUCCESS){

                    this.courseCateOne.cateicon = res.url;
                }else{
                    this.$message.warning(res.msg);
                }
            }
        }
    }
</script>

<style scoped>

</style>
