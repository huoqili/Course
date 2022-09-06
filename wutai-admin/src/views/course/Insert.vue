<template>
    <div>
        <el-form :model="courseForm">
            <el-form-item label="所属分类:">
                <el-select v-model="courseForm.id" placeholder="请选择所属分类">
                    <el-option
                            v-for="item in coursecate"
                            :key="item.id"
                            :label="item.catename"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程名称:">
                <el-input v-model="courseForm.cname" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="课程描述:">
                <el-input v-model="courseForm.cdesc" placeholder="请输入课程描述"></el-input>
            </el-form-item>
            <el-form-item label="课程缩略图: 最佳比例1:1,上传类型png,jpg,webp">
            </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="urlpath+'/admin/upload'"
                        :show-file-list="false"
                        :on-success="handlerThumbUpload"
                        :before-upload="handlerBeforeThumbUpload">
                    <img v-if="courseForm.cthumb" :src="urlpath + courseForm.cthumb" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="课程价格:">
                <el-input v-model="courseForm.cprice" placeholder="请输入课程价格"></el-input>
            </el-form-item>
            <el-form-item label="课程课时:">
                <el-input v-model="courseForm.cperiod" placeholder="请输入课程课时"></el-input>
            </el-form-item>
            <el-form-item label="授课教师:">
                <el-input v-model="courseForm.cteacher" placeholder="请输入授课教师姓名"></el-input>
            </el-form-item>
            <el-form-item label="课程教师职称:">
                <el-input v-model="courseForm.cteacher_postion" placeholder="请输入授课教师职称"></el-input>
            </el-form-item>
            <el-form-item label="课程背景图:">
            </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="urlpath+'/admin/upload'"
                        :show-file-list="false"
                        :on-success="handlerBgUpload"
                        :before-upload="handlerBeforeBgUpload">
                    <img v-if="courseForm.cbg" :src="urlpath + courseForm.cbg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="课程简介:">
                <el-input v-model="courseForm.cintro" type="textarea" :autosize="{ minRows: 2}" placeholder="请输入课程简介"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerCourseSubmit">
                    提交
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {SUCCESS, URLPATH} from "../../config";
    import {courseInsert} from "../../http/course";
    import  axios from 'axios';
    export default {
        name: "Insert",
        data(){
            return {
                urlpath:URLPATH,
                courseForm:{
                    cname:'',
                    cdesc:'',
                    cthumb:'',
                    cprice:'',
                    cperiod:'',
                    cteacher:'',
                    cteacher_position:'',
                    cbg:'',
                    cintro:'',
                    id:''
                },
                coursecate:[]
            }
        },
        methods:{
            // 初始化课程分类
            initCourseCate(){
                let url = URLPATH + '/admin/coursecate/query';
                let token = sessionStorage.getItem('islogin');
                axios.get(url,{
                    headers:{
                        token
                    }
                }).then(res=>{
                    let {msg, data} = res.data;
                    this.$message.success(msg);
                    this.coursecate = data;
                }).catch(err=>{
                    console.log(err);
                })
            },
            handlerBeforeThumbUpload(file){
                let imgTypeFlag =true , imgSizeFlag = true;
                let maxSize = 200 * 1024;
                let imgType = ['image/png','image/jpg','image/jpeg','image/gif','image/webp']
                let {size, type} = file;
                if(size > maxSize){
                    imgTypeFlag = false;
                    this.$message.warning('文件最大不能超过200KB');
                }
                if(!imgType.includes(type)){
                    imgSizeFlag = false;
                    this.$message.warning('上传文件格式错误');
                }

                return imgTypeFlag && imgSizeFlag;
            },
            handlerThumbUpload(res){
                if(res.code === SUCCESS){
                    this.courseForm.cthumb = res.url;
                }
            },
            handlerBeforeBgUpload(){

            },
            handlerBgUpload(res){
                if(res.code === SUCCESS){
                    this.courseForm.cbg = res.url;
                }
            },
            handlerCourseSubmit(){
                let data= this.courseForm;
              courseInsert(data).then(res=>{
                  console.log(res);
              }).catch(err=>{
                  console.log('出错了');
                  console.log(err);
              })
            }
        },
        created() {
           this.initCourseCate();
        }
    }
</script>

<style scoped>

</style>
<style>
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
