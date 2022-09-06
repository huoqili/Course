<template>
    <div>
        <el-form :model="passwordForm" :rules="rules" ref="passwordform">
            <el-form-item label="原密码" prop="oldpass">
                <el-input v-model="passwordForm.oldpass" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpass">
                <el-input v-model="passwordForm.newpass" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmpass">
                <el-input v-model="passwordForm.confirmpass" placeholder="请输入确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  axios from 'axios';
    import  {SUCCESS , URLPATH} from "../../config";

    export default {
        name: "Password",
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
            const cheakPasswordAgain = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordForm.newpass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                passwordForm:{
                    oldpass:'',
                    newpass:'',
                    confirmpass:''
                },
                rules:{
                    oldpass:[
                        {validator:checkPassword, trigger:'blur'}
                    ],
                    newpass:[
                        {validator:checkPassword, trigger:'blur'}
                    ],
                    confirmpass: [
                        {validator:cheakPasswordAgain, trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            handlerSubmit(){
                this.$refs.passwordform.validate(valid=>{
                    if(valid){
                        let url = URLPATH + '/admin/changepassword';
                        let token = sessionStorage.getItem('islogin');
                        /* axios({
                            method:'post',
                            url:url,
                            data:this.passwordForm,
                            headers:{}
                        })*/

                        axios.post(url,this.passwordForm,{
                            headers:{
                                token
                            }
                        }).then(res=>{
                            let {code,msg} = res.data;
                            if(code === SUCCESS){
                                this.$message.success(msg);
                                sessionStorage.clear();
                                this.$router.push({name:'login'});
                            }else{
                                this.$message.warning(msg);
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else{
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
