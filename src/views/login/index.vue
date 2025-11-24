<template>
  <div class="login">
    <el-card class="login-form-layout">
      <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          >
        <h2 class="login-title">科研项目管理系统</h2>
        <el-form-item >
          <el-input v-model="loginForm.username" placeholder="请输入用户名">
            <span slot="prefix"><svg-icon iconFileName="user" class="color-main"/></span>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input name="password"  v-model="loginForm.password" placeholder="请输入密码" show-password>
            <span slot="prefix"><svg-icon iconFileName="password" class="color-main"/></span>
<!--            <span slot="suffix"><svg-icon icon-class="eye" class="color-main"/></span>-->
          </el-input>
        </el-form-item>
        <el-form-item style=" text-align: center">
          <el-button :loading="loading" type="primary" @click="handleLogin">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
<!--      <svg-icon iconFileName="eye" class="color-main"></svg-icon>-->
    </el-card>
  </div>
</template>

<script>
// @--->src
//导入检验规则
import { isvalidUsername } from "@/utils/validate";
import {setCookie} from "@/utils/support";

export default {
  name: "login",
  data(){
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return{
      loginForm:{
        username:"",
        password:""
      },
      loginRules:{
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      },
      loading:false,
    }
  },
  created() {
    // this.loginForm.username = getCookie("username");
    // this.loginForm.password = getCookie("password");
    console.log(this.$store)
    this.loginForm.username = "1";
    this.loginForm.password = "123456";
    if (
        this.loginForm.username === undefined ||
        this.loginForm.username == null ||
        this.loginForm.username === ""
    ) {
      this.loginForm.username = "admin";
    }
    if (
        this.loginForm.password === undefined ||
        this.loginForm.password == null ||
        this.loginForm.password === ""
    ) {
      this.loginForm.password = "123456";
    }
  },
  methods:{
    handleLogin(){
      this.$refs.loginForm.validate((valid) => {
        if (valid){
          this.loading = true;
          let params = new URLSearchParams();
          params.append("username", this.loginForm.username);
          params.append("password", this.loginForm.password);
          this.$store.dispatch("Login",params).then(() =>{
            this.loading = false;
            setCookie("username",this.loginForm.username)
            this.$router.push('/home');
          }).catch(()=>{
            this.loading = false;
          })
          // console.log("Y")
          // console.log(this.loginForm.username)
          // login(params).then(res=>{
          //   console.log(res.data.data.user);
          // })

        }else {
          this.$message.error("错误")
          console.log("参数检验不合法")
        }
      })

    }
  }

}
</script>

<style scoped>

.login-form-layout {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 400px;
  margin: 200px auto;
  border-top: 5px solid #e2c0cd;
  height: 250px;
  border-radius: 10px;
}
.login-title {
  text-align: center;
}

.login {
  /*--olcb-folder-code-block-max-height:80vh; --cnb-code-bg:rgb(245, 245, 245); --cnb-code-font-size:12px; --cnb-code-color:rgb(68, 68, 68);*/
  background: url("../../assets/images/login-background.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
}

.form-item{
  width: 280px;
}
</style>
