<template>
  <div>
    <template class="modify-team">
      <el-dialog
          title="编辑团队"
          :visible.sync="modifyDialogVisible"
          width="30%"
          center>
        <el-form :model="modifyForm" :rules="rules" ref="modifyForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="新团队名称" prop="teamName">
            <el-input v-model="modifyForm.teamName"></el-input>
          </el-form-item>
          <el-form-item label="新负责人"  prop="chargerId">
            <el-select  placeholder="请选择新负责人" filterable v-model="modifyForm.chargerId">
              <template v-for="(item, index) in allMembers">
                <el-option :key="index" :label="item.nickname" :value="item.username"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
        <!--        <span>需要注意的是内容是默认不居中的</span>-->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateTeam('modifyForm')">确 定</el-button>
          <el-button @click="resetForm('modifyForm')">取 消</el-button>
        </span>
      </el-dialog>
    </template>

    <div >
<!--      <el-button-->
<!--          v-for="(item, i) in row.operate"-->
<!--          :key="i"-->
<!--          v-on:[eventName]="handleClick(item.click)"-->
<!--          :type="item.type"-->
<!--          :size="item.size"-->
<!--      >{{ item.name }}-->
<!--      </el-button>-->
<!--      <el-col >-->
<!--        <el-button-->
<!--            size="mini"-->
<!--            type="primary"-->
<!--            icon="el-icon-edit"-->
<!--            style="margin: 3px"-->
<!--            @click="handleEdit(row,row)">申请退出</el-button>-->
<!--        <template v-if="chargerId==username">-->
<!--          <el-button-->
<!--              size="mini"-->
<!--              type="primary"-->
<!--              icon="el-icon-edit"-->
<!--              style="margin: 3px"-->
<!--              @click="handleEdit(index,row)">分配任务</el-button>-->
          <el-button
              size="mini"
              type="primary"
              :disabled="role"
              icon="el-icon-edit"
              style="margin: 3px"
              @click="handleEdit(index,row)">编辑团队</el-button>
<!--        </template>-->
<!--      </el-col>-->


    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {fetchUserData} from "@/api/user";
import {addMyChargedTeam, updateTeam} from "@/api/team";
import {setResult} from "@/utils/responseResult";

export default {
  name: "operateCol",

  props:{
    index:Number,
    row: Object
  },
  data() {
    return {
      chargerId:'',
      modifyDialogVisible: false,
      allMembers: [],
      chargerName:this.row.chargerName,
      modifyForm: {
        teamName: this.row.teamName,
        chargerId:'',
        teamId:this.row.teamId,
      },
      rules: {
        teamName: [
          { required: true, message: '请输入队伍名称', trigger: 'blur' },
          { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
        ],
        chargerId: [
          { required: true, message: '请选择负责人', trigger: 'blur',  },
          // { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['username']),

    role(){
      // console.log("chargerid")
      // console.log(this.$store.getters.username)
      if(this.row.chargerId==this.$store.getters.username) return false;
      else return true;
    }
  },
  created() {
    //莫名渲染很多次
    this.chargerId = this.row.chargerId

    // console.log("传入的参数")
    // console.log(this.row.projectName)
    // console.log(this.index)
  },
  methods:{

    getAllUsers(){
      this.modifyDialogVisible=true;
      //获取所有用户
      fetchUserData().then(res=>{
        let user = res.data.data
        // user = res.data.data
        this.allMembers = res.data.data;
        // console.log(res.data.data)
        // for(let i=0;i<user.length;i++){
        //   console.log(user[i].nickname)
        //   this.allMembers.push(user[i].nickname)
        // }
        console.log(this.allMembers)
      }).catch(error=>{
        console.log(error)
      })
    },
    handleEdit(index, row) {
      this.getAllUsers()
      this.modifyDialogVisible = true
      console.log(row)
      // console.log(this.chargerId)
      // this.$router.push({name: 'project_detail', params:{id:row.id}})
    },
    updateTeam(modifyForm){
      this.$refs[modifyForm].validate((valid) => {
        // console.log("发过去的数据")
        // console.log(this.teamForm)
        if (valid) {
          updateTeam(this.modifyForm).then(res=>{
            // setResult(res)
            this.$message ({
              type: "success",
              message: "成功修改团队信息"
            })
            location.reload()
          }).catch(error=>{
            console.log(error)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(modifyForm) {
      this.modifyDialogVisible = false
      // this.$refs[modifyForm].resetFields();
    }
  }
}

</script>

<style scoped>

</style>
