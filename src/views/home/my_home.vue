<template>
  <div>
    <div>
      <el-upload
          class="avatar-uploader"
          :action="uploadAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          style="margin: 20px; text-align: center;">
        <img v-if="this.imageUrl" :src="this.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="70px" style="height: 90%; margin-left: 36%; margin-right: 35%">
        <el-form-item label="工号" prop="username">
          <el-input v-model="userForm.username" style="width: 90%" placeholder="" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" style="width: 90%" placeholder="" ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="userForm.nickname" style="width: 90%" placeholder="" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="userForm.gender" placeholder="" style="width: 20%;" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" placeholder="" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="creatTime">
          <el-input v-model="userForm.creatTime" placeholder="" disabled="disabled" style="width: 90% ; "></el-input>
        </el-form-item>
<!--        <el-form-item label="角色" prop="roleid">-->
<!--          <el-input v-model="userForm.roleid" placeholder="" disabled="disabled" style="width: 20% ; "></el-input>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click.native.prevent="handleChange()">修改</el-button>
        </el-form-item>
      </el-form>
    </div>


  </div>
</template>

<script>
import {getMyInfo, updateMyInfo} from "@/api/user";
import {mapGetters} from "vuex";

export default {
  name: "my_home",
  data(){
    return{
      imageUrl:'',
      userForm:{
        username:'',
        nickname:'',
        gender:'',
        phone:'',
        email:'',
        avatar:'',
        creatTime:'',
        loginTime:'',
        roleid:'',
        status:'',
      }


    }
  },
  computed:{
    ...mapGetters(['username']),
  },
  created() {

    getMyInfo({username:this.username})
        .then(res=>{
          var data=res.data.data;
          this.userForm=data;
          this.imageUrl=data.avatar;
        })

  },
  methods:{
    mapRoleIdToString(roleId) {
      // 这里是您的映射函数，根据roleId返回相应的角色名称
      switch (roleId) {
        case 0:
          return '超级管理员';
        case 1:
          return '科研人员';
        case 2:
          return '项目负责人';
        case 3:
          return '科研机构管理员';
        default:
          return '未知角色';
      }
    },
    uploadAvatar()
    {

    },
    handleChange()
    {
      updateMyInfo(this.userForm)
          .then(this.$message({
            type: 'success',
            message: '已修改'
          }))
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  }
}
</script>

<style scoped>
.message{
  width: 20em;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
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