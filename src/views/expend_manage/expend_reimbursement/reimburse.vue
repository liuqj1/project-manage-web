<template>
  <div style="height: 100%">
    <el-page-header @back="goBack" content="经费报销" style="margin-bottom: 30px"></el-page-header>
    <el-form :model="reimburseForm" :rules="rules" ref="reimburseForm" label-width="100px" style="height: 90%">
      <el-form-item label="申报人工号" prop="username">
        <el-input v-model="reimburseForm.username" disabled="disabled" style="width: 35%" placeholder="请输入申报人"></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="reimburseForm.projectName" disabled="disabled" style="width: 35%" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="报销描述" prop="description">
        <el-input
            type="textarea"
            placeholder="填写报销资金去向"
            v-model="reimburseForm.description"
            style="width: 65%"
            :autosize="{ minRows: 6, maxRows: 6 }"
            resize="none"
            maxlength="500"
            show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="报销金额" prop="expend">
        <el-input v-model="reimburseForm.expend" placeholder="申请报销的金额" style="width: 20%;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="declare_expend('reimburseForm')">提交</el-button>
        <el-button @click.native.prevent="resetForm('reimburseForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
import {mapGetters} from "vuex";
import {submitReimbursement} from "@/api/expend";
import {format} from "date-fns";

export default {
  data() {
    return {
      teams: [],
      reimburseForm: {
        username: "",
        projectId: "",
        projectName:"",
        declarationTime:"",
        description: "",
        status:"0",
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请填写项目简介', trigger: 'blur' }
        ],
        expend: [
          { required: true, message: '请输入要报销的金额', trigger: 'blur' }
        ],
        team: [
          { required: true, message: '请选择团队', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    this.reimburseForm.projectId=this.$route.query.projectId.toString();
    this.reimburseForm.projectName=this.$route.query.projectName;
    this.reimburseForm.username=this.username;
  },
  computed:{
  ...mapGetters(['username']),
  },
  methods: {
    declare_expend(formName) {
      const now = new Date();
      const { format } = require('date-fns');
      var formattedDate = format(now, 'yyyy-MM-dd');
      console.log(formattedDate);
      // 将当前时间设置为表单的日期字段
      this.reimburseForm.declarationTime = formattedDate;
      this.$refs[formName].validate((valid) => {//验证表单规则
        if (valid) {
          console.log(this.reimburseForm);
          submitReimbursement(this.reimburseForm)
              .then(res=>{
                alert(res.data);
              })
              .catch(res=>{
                console.log("提交失败");
              })
          this.$router.go(-1);
        } else {
          console.log('提交失败!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.go(-1);
      //this.$router.push({name: 'expend_reimburse',params: {projectId:this.projectId}});
    }
  }
}
</script>

<style scoped>

</style>