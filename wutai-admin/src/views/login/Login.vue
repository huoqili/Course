<template>
    <div class="box" v-loading.body.fullscreen.lock="showLoading">
        <h2 ref="h2">爱设管理系统</h2>
        <el-form  ref="loginform" :model="loginForm" :rules="loginRules">
            <el-form-item label="用户名" prop="username">
                 <el-input placeholder="请输入用户名" v-model="loginForm.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="password">
                <el-input placeholder="请输入密码" type="password" v-model.trim="loginForm.password" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="submit-btn" type="primary" @click="handlerLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios';
    import {SUCCESS,URLPATH} from "../../config";

    export default {
        name: "Login",
        data(){
            const  checkPassword = (rule,value,callback)=>{
                if(!value){
                    callback(new Error('密码不能为空'));
                }
                let passreg = /^[a-zA-Z0-9]{6,8}$/;
                if(!passreg.test(value)){
                    callback(new Error('6-8位数字字母'))
                }else{
                    callback();
                }
            }
            return {
                showLoading:false,
                loginForm:{
                    username:'',
                    password:''
                },
                loginRules:{
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password:[
                        {validator:checkPassword, trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            handlerLogin(){
                this.$refs.loginform.validate((valid)=>{
                    if(valid){
                       // 发请求
                        this.showLoading = true;
                        let url =  URLPATH +  '/admin/login';
                        axios.post(url,this.loginForm).then(res=>{
                            let data = res.data;
                            if(data.code === SUCCESS){
                                this.$message.success(data.msg);
                                sessionStorage.setItem('islogin',data.token);
                                sessionStorage.setItem('userinfo',JSON.stringify( data.userinfo));
                                this.$router.push({name:"main"})
                            }else{
                                this.$message.warning(data.msg)
                            }

                        }).catch(err=>{
                            console.log(err);
                        }).finally(()=>{
                            this.showLoading = false;
                        })


                    }
                })
            }
        }
    }
</script>

<style scoped>
   .box{
       width: 600px;
       height: auto;
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%,-50%);
       background: rgba(0,0,0,0.2);
       padding: 10px 20px;
   }
    .submit-btn{
        width: 100%;
    }
</style>
