<template>
    <div class="loginWarpper">
        <div class="modal">
            <el-form 
                label-width="120px" 
                class="el-form"
                :model="user"
                :rules="rules"
                ref="userForm"
            >
                <div class="title">后台管理系统</div>
                <el-form-item label="name" prop="userName">
                    <!-- <el-icon><UserFilled /></el-icon> -->
                    <el-input 
                        type="text" 
                        class="input"
                        v-model="user.userName" 
                    >
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input 
                        type="password"
                        class="input"
                        v-model="user.password"
                     >
                        <template #prefix>
                            <el-icon><Crop /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" @click="login">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return {
            user:{
                userName:'',
                password:''
            },
            rules:{
                userName:[
                    {
                        required:true,
                        message:"请输入用户名",
                        trigger:"blur"
                    }
                ],
                password:[
                    {
                        required:true,
                        message:"请输入密码",
                        trigger:"blur"
                    }
                ]
            }
        }
    },
    methods:{
        login(){
            this.$refs.userForm.validate(async (valid)=>{
                if(valid){
                    try {
                        const res = await this.$api.login(this.user)
                        this.$store.commit("saveUserInfo",res)
                        this.$router.push("/welcome")
                    } catch (error) {
                        console.log(error)
                    }
                }else{
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
.loginWarpper{
    background-color: #f6f8fa;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .modal{
        display: flex;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        width: 500px;
        padding: 50px;
        border-radius: 4px;
        box-shadow: 0px 0px 10px 3px #c7c9cb4d;
        .el-form{
            position: relative;
            left: -40px;
            // background-color: #409eff;
            margin-left: -10px;
            .title{
                padding-left: 100px;
                text-align: center;
                height: 50px;
                font-size: 25px;
                // line-height: 100px;
            }
            .input{
                width: 350px;
                height: 40px;
            }
            .login-btn{
                width: 100%;
                height: 30px;
                background-color: #409eff;
                color: #fff;
            }
            .el-form-item--small .el-form-item__label{
                // background-color: #409eff;
                line-height: 40px;
            }
        }
        
    }

}
</style>