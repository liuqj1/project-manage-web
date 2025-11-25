<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-row style="padding-left: 20px">
          <h3 class="role-title">科研人员权限</h3>
        </el-row>
        <el-row style="padding-left: 40px; margin-top: 30px; margin-bottom: 40px">
          <el-col :span="8">
            <div class="block">
              <span style="margin-right: 10px">申报项目</span>
              <el-switch v-model="researcherDeclareProjectRight" active-color="#13ce66" @change="handleRese_decl_pro_right"></el-switch>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="block">
              <span style="margin-right: 10px">成果提交</span>
              <el-switch v-model="researcherSubmitHarvRight" active-color="#13ce66" @change="handleRese_subm_harv_right"></el-switch>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="block">
              <span style="margin-right: 10px">经费报销</span>
              <el-switch v-model="researcherReimburseRight" active-color="#13ce66" @change="handleRese_reim_right"></el-switch>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row style="padding-left: 20px">
          <h3 class="role-title">项目负责人权限</h3>
        </el-row>
        <el-row style="padding-left: 40px; margin-top: 30px; margin-bottom: 40px">
          <el-col :span="8">
            <div class="block">
              <span style="margin-right: 10px">申报项目</span>
              <el-switch v-model="chargerDeclareProjectRight" active-color="#13ce66" @change="handleCharger_decl_pro_right"></el-switch>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="block">
              <span style="margin-right: 10px">项目结题</span>
              <el-switch v-model="chargerEndProjectRight" active-color="#13ce66" @change="handleCharger_end_pro_right"></el-switch>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="block">
              <span style="margin-right: 10px">成果提交</span>
              <el-switch v-model="chargerSubmitHarvRight" active-color="#13ce66" @change="handleCharger_subm_harv_right"></el-switch>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding-left: 40px; margin-top: 30px; margin-bottom: 40px">
          <el-col :span="8">
            <div class="block">
              <span style="margin-right: 10px">成果审核</span>
              <el-switch v-model="chargerHarvAcceptRight" active-color="#13ce66" @change="handleCharger_harv_ac_right"></el-switch>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="block">
              <span style="margin-right: 10px">经费报销</span>
              <el-switch v-model="chargerReimburseRight" active-color="#13ce66" @change="handleCharger_reim_right"></el-switch>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="block">
              <span style="margin-right: 10px">经费审核</span>
              <el-switch v-model="chargerReimburseAcceptRight" active-color="#13ce66" @change="handleCharger_reim_ac_right"></el-switch>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {addUserRole, checkUserRole, deleteUserRole} from "@/api/role";

export default {

  data () {
    return {
      value: true,
      researcherDeclareProjectRight: true,
      researcherSubmitHarvRight: true,
      researcherReimburseRight: true,
      chargerDeclareProjectRight: true,
      chargerEndProjectRight: true,
      chargerSubmitHarvRight: true,
      chargerHarvAcceptRight: true,
      chargerReimburseRight: true,
      chargerReimburseAcceptRight: true,
    }
  },
  created() {
    checkUserRole({roleid:'1',pid:'3'})
        .then(res=>{
          var data=res.data;
          if(data.toString()=="true")
            this.researcherDeclareProjectRight=true;
          else this.researcherDeclareProjectRight=false;
        })
    checkUserRole({roleid:'1',pid:'9'})
        .then(res=>{
          var data=res.data;
          if(data.toString()==("true"))
            this.researcherSubmitHarvRight=true;
          else this.researcherSubmitHarvRight=false;
        })
    checkUserRole({roleid:'1',pid:'12'})
        .then(res=>{
          var data=res.data;
          if(data.toString()==("true"))
            this.researcherReimburseRight=true;
          else this.researcherReimburseRight=false;
        })
    checkUserRole({roleid:'2',pid:'3'})
        .then(res=>{
          var data=res.data;
          if(data.toString()==("true"))
            this.chargerDeclareProjectRight=true;
          else this.chargerDeclareProjectRight=false;
        })
    checkUserRole({roleid:'2',pid:'7'})
        .then(res=>{
          var data=res.data;
          if(data.toString()==("true"))
            this.chargerEndProjectRight=true;
          else this.chargerEndProjectRight=false;
        })
    checkUserRole({roleid:'2',pid:'9'})
        .then(res=>{
          var data=res.data;
          if(data.toString()==("true"))
            this.chargerSubmitHarvRight=true;
          else this.chargerSubmitHarvRight=false;
        })
    checkUserRole({roleid:'2',pid:'8'})
        .then(res=>{
          var data=res.data;
          if(data.toString()==("true"))
            this.chargerHarvAcceptRight=true;
          else this.chargerHarvAcceptRight=false;
        })
    checkUserRole({roleid:'2',pid:'14'})
        .then(res=>{
          var data=res.data;
          if(data.toString()==("true"))
            this.chargerReimburseRight=true;
          else this.chargerReimburseRight=false;
        })
    checkUserRole({roleid:'2',pid:'15'})
        .then(res=>{
          var data=res.data;
          if(data.toString()==("true"))
            this.chargerReimburseAcceptRight=true;
          else this.chargerReimburseAcceptRight=false;
        })
    checkUserRole({roleid:'2',pid:'15'})
        .then(res=>{
          var data=res.data;
          if(data.toString()==("true"))
            this.chargerReimburseAcceptRight=true;
          else this.chargerReimburseAcceptRight=false;
        })





  },
  computed: {
    ...mapGetters(['username']),
  },
  methods: {
    handleRese_decl_pro_right() {
      if(this.researcherDeclareProjectRight) {
        addUserRole({roleid: '1', pid: '3'})
          .then(res => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          })
      }
      else {
        deleteUserRole({roleid: '1', pid: '3'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
    },
    handleRese_subm_harv_right() {
      if(this.researcherSubmitHarvRight) {
        addUserRole({roleid: '1', pid: '9'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
      else {
        deleteUserRole({roleid: '1', pid: '9'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
    },
    handleRese_reim_right() {
      if(this.researcherReimburseRight) {
        addUserRole({roleid: '1', pid: '14'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
      else {
        deleteUserRole({roleid: '1', pid: '14'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
    },
    handleCharger_decl_pro_right() {
      if(this.chargerDeclareProjectRight) {
        addUserRole({roleid: '2', pid: '3'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
      else {
        deleteUserRole({roleid: '2', pid: '3'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
    },
    handleCharger_end_pro_right() {
      if(this.chargerEndProjectRight) {
        addUserRole({roleid: '2', pid: '7'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
      else {
        deleteUserRole({roleid: '2', pid: '7'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
    },
    handleCharger_subm_harv_right() {
      if(this.chargerSubmitHarvRight) {
        addUserRole({roleid: '2', pid: '9'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
      else {
        deleteUserRole({roleid: '2', pid: '9'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
    },
    handleCharger_harv_ac_right() {
      if(this.chargerHarvAcceptRight) {
        addUserRole({roleid: '2', pid: '8'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
      else {
        deleteUserRole({roleid: '2', pid: '8'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
    },
    handleCharger_reim_right() {
      if(this.chargerReimburseRight) {
        addUserRole({roleid: '2', pid: '14'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
      else {
        deleteUserRole({roleid: '2', pid: '14'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
    },
    handleCharger_reim_ac_right() {
      if(this.chargerReimburseAcceptRight) {
        addUserRole({roleid: '2', pid: '15'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
      else {
        deleteUserRole({roleid: '2', pid: '15'})
            .then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            })
      }
    }
  }
}
</script>

<style scoped>
.role-title {
  font-size: 20px;
  font-weight: 400;
}
</style>