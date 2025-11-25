<template>
  <div style="height: 100%">
    <el-page-header @back="goBack" content="项目申报" style="margin-bottom: 30px"></el-page-header>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="height: 90%">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="ruleForm.projectName" style="width: 35%" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目简介" prop="introduce">
        <el-input
            type="textarea"
            placeholder="简要介绍项目"
            v-model="ruleForm.introduce"
            style="width: 65%"
            :autosize="{ minRows: 6, maxRows: 6 }"
            resize="none"
            maxlength="500"
            show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="项目预算" prop="budget">
        <el-input v-model="ruleForm.budget" placeholder="申请的预算金额" style="width: 20%;"></el-input>
      </el-form-item>
      <el-form-item label="团队" prop="teamid">
        <el-select v-model="ruleForm.teamid" placeholder="请选择团队" style="width: 35%">
          <template v-for="(item, index) in teams">
            <el-option :key="index" :label="item.teamname" :value="item.teamid"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="declare_project('ruleForm')">提交</el-button>
        <el-button @click.native.prevent="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
import {declareProject} from "@/api/project";
import {mapGetters} from "vuex";
import {getMyChargedTeam} from "@/api/team";

export default {
  data() {
    return {
      teams: [],
      ruleForm: {
        projectName: '',
        introduce: '',
        budget: '',
        teamid: '',
        status:'1',
        expend:'0',
        declarationTime:''
      },
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ],
        introduce: [
            { required: true, message: '请填写项目简介', trigger: 'blur' }
        ],
        budget: [
            { required: true, message: '请输入项目预算', trigger: 'change' }
        ],
        teamid: [
            { required: true, message: '请选择团队', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    getMyChargedTeam({"username": this.username})
        .then(res=>{
          var data=res.data.data;
          this.teams=data;
          console.log(this.teams)
        })

  },
  computed:{
    ...mapGetters(['username']),
  },
  methods: {
    declare_project(formName) {
      const now=new Date();
      this.ruleForm.declarationTime=now;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          declareProject(this.ruleForm)
              .then(res=>{
                alert('申报成功!');
              })
              .catch(res=>{
                console.log("提交失败")
              })
          this.$router.go(-1);

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>