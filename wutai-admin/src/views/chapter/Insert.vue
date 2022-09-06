<template>
 <div>
    <el-form :model="chapterForm">
       <el-form-item label="章节名称">
           <el-input v-model="chapterForm.chname"  placeholder="请输入章节名称"></el-input>
       </el-form-item>
     <el-form-item label="视频时长">
      <el-input v-model="chapterForm.chduration" placeholder="请输入视频的时长，单位是秒"></el-input>
     </el-form-item>
     <el-form-item label="上传视频"></el-form-item>
     <el-form-item>
      <el-upload
              class="avatar-uploader"
              :action="urlpath+'/admin/upload'"
              :show-file-list="false"
              :on-success="handleVideoSuccess"
              :before-upload="beforeVideoUpload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
     </el-form-item>
     <el-form-item v-if="chapterForm.chvideo">
      <video width="300" :src="urlpath+chapterForm.chvideo" controls preload="auto"></video>
     </el-form-item>
        <el-form-item>
            <el-button @click="handlerSumbit" type="primary">提交</el-button>
        </el-form-item>
    </el-form>
 </div>
</template>

<script>
   import {URLPATH} from "../../config";
   import {chapterInsert} from "../../http/chapter";
    export default {
        name: "Insert",
        data(){
            return {
                urlpath:URLPATH,
                chapterForm:{
                    chname:'',
                    chduration:'',
                    chvideo:'',
                    cid:''
                }
            }
        },
        methods:{
          handleVideoSuccess(res){
              this. chapterForm.chvideo =  res.url;
          },
          beforeVideoUpload(file){
              file;
          },
          handlerSumbit(){
              chapterInsert(this.chapterForm).then(res=>{
                  console.log(res);
              }).catch(err=>{
                  console.log(err);
              })
          }
        },
        mounted() {
            let cid = this.$route.query.cid;
            this.chapterForm.cid = cid;
        }
    }
</script>

<style scoped>
 .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
 }
 .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
 }
 .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
 }
 .avatar {
  width: 178px;
  height: 178px;
  display: block;
 }
</style>
