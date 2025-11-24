<template>
  <div style="height: 94%">
    <el-row type="flex" style="margin-top: 5px">
      <el-input
          v-model="inputDescription"
          placeholder="用户昵称"
          prefix-icon="el-icon-search"
          size="small "
          style="width: 350px; margin-right: 10px" >
      </el-input>
      <el-select v-model="selectedStatus" placeholder="用户角色">
        <el-option label="超级管理员" value="0"></el-option>
        <el-option label="科研人员" value="1"></el-option>
        <el-option label="项目负责人" value="2"></el-option>
        <el-option label="科研机构负责人" value="3"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search" style="margin-left: 10px">搜索</el-button>
      <el-button type="warning" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      <download-excel
          class="export-excel-wrapper"
          :data="tableData"
          :fields="json_fields"
          :header="title"
          name="用户信息.xls"
          style=" margin-left: 10px"
      ><el-button class="exportBtn" type="success" icon="el-icon-s-promotion">导出</el-button>
      </download-excel>
      <el-button type="primary" icon="el-icon-plus" @click="handleAddUser" style="margin-left: 10px">新增</el-button>
    </el-row>
    <div>
      <el-table
          :data="getCurrentPageData"
          style="width: 100%; margin-top: 10px"
          stripe
          border
          :default-sort = "{prop: 'username', order: 'ascending'}"
          :max-height="tableHeight"
      >
        <el-table-column
            type="selection"
            min-width="5%"
            align="center">
        </el-table-column>
        <el-table-column
            type="index"
            label="序号"
            fixed
            min-width="5%"
            align="center"
            :index=1>
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名"
            sortable
            min-width="10%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="nickname"
            label="用户昵称"
            sortable
            min-width="10%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            min-width="5%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号码"
            sortable
            min-width="15%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            sortable
            min-width="15%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="roleid"
            label="用户角色"
            sortable
            min-width="10%"
            align="center">
          <template slot-scope="scope">
            {{ mapRoleIdToString(scope.row.roleid) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="25%" align="center">
          <template slot-scope="scope">
            <el-button
                size="mini"
                icon="el-icon-refresh"
                type="warning"
                style="margin: 3px"
                @click="handleResetPassword(scope.$index, scope.row)">重置密码</el-button>
            <el-button
                size="mini"
                icon="el-icon-delete"
                type="danger"
                style="margin: 3px"
                :disabled="scope.row.roleid !=1"
                @click="handleDeleteUser(scope.$index, scope.row)">删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top: 10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredData.length">
      </el-pagination>
    </div>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <div>
        <el-row>
          <el-col :span="24">
            <el-form :model="newUserForm" label-width="100px" :rules="rules" ref="newUserForm">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="newUserForm.username" placeholder="请输入用户名" style="width: 80%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="newUserForm.password" placeholder="请输入密码" style="width: 80%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="用户昵称：" :label-width="formLabelWidth" prop="nickname">
                    <el-input v-model="newUserForm.nickname" placeholder="请输入用户昵称" style="width: 80%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别：" :label-width="formLabelWidth" prop="gender">
                    <el-radio-group v-model="newUserForm.gender" style="width: 80%">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="newUserForm.phone" placeholder="请输入手机号码" style="width: 80%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="newUserForm.email" placeholder="请输入邮箱" style="width: 80%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer" style="margin-top:20px">
          <div style="display: flex; justify-content: center;">
            <el-button @click="handleCancel()" style="margin-right: 30px">取 消</el-button>
            <el-button type="primary" @click="handleCommit()" style="margin-left: 30px">确 定</el-button>
          </div>
        </div>
      </div>

    </el-dialog>

  </div>

</template>

<script>
import {mapGetters} from "vuex";
import {addUser, deleteUser, fetchUserData, resetPassword} from "@/api/user";
import {format} from "date-fns";

export default {
  data() {
    return {
      tableData: [],//原始数据
      inputDescription:'',
      filteredData:[],//过滤后的数据
      dateRange:'',
      editData:'',//选择编辑的数据
      currentPage: 1, // 当前页数
      pageSize:5, // 每页显示的记录数

      tableHeight: 600, // 表格的高度

      dialogFormVisible: false,
      newUserForm: {
        username: '',
        password: '123456',
        nickname: '',
        gender: '',
        phone: '',
        email: '',
        roleid: '',
        creatTime:'',
      },
      title:"用户信息",
      json_fields:{
        "用户名":'username',
        "用户昵称":'nickname',
        "性别":'gender',
        "手机号码":'phone',
        "邮箱":'email',
        "用户角色":'roleid',
      },
      selectedStatus:'',
      formLabelWidth: '120px',

      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        nickname: [
            { required: true, message: '请输入用户昵称', trigger: 'blur' },
        ],
        gender: [
            { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    /*
      获取所有用户数据
    */
    fetchUserData()
        .then(res=>{
          var data=res.data.data;
          this.tableData=data;
          this.filteredData=this.tableData;
        })
  },
  computed: {
    ...mapGetters(['username']),
    // 获取当前页的数据
    getCurrentPageData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredData.slice(startIndex, endIndex);
    }
  },
  methods: {
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
    handleSizeChange(newSize){
      this.pageSize = newSize;
      // 根据新的页面大小重新计算分页
      this.handleCurrentChange(currentPage);
    },
    // 处理当前页码变化
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    search(){
      // 根据输入框中的内容过滤表格数据
      this.filteredData = this.tableData.filter(item => {
        // 判断是否存在输入框内容和日期范围，如果都没有，则返回 true，表示保留该数据项
        if (!this.inputDescription && !this.selectedStatus) {
          return true;
        }
        // 判断是否存在输入框内容，如果没有，则直接判断日期范围
        if (!this.inputDescription) {
          // 如果日期范围存在，判断数据项的日期是否在范围内
          return item.roleid.toString()===this.selectedStatus.toString();
        }

        // 判断是否存在日期范围，如果没有，则直接判断输入框内容
        if (!this.selectedStatus) {
          return item.nickname.includes(this.inputDescription.toString());
        }

        // 如果输入框内容和日期范围都存在，则同时满足条件
        return item.nickname.includes(this.inputDescription.toString())&& item.roleid.toString()===this.selectedStatus.toString();

      });
    },
    reset(){
      // 重置输入框的内容
      this.inputDescription = '';
      this.selectedStatus='',
          // 重置表格数据为初始数据
          this.filteredData = this.tableData;
    },
    handleAddUser(){
      this.dialogFormVisible = true;
    },
    handleResetPassword(index,row){
      this.$confirm('此操作将重置该用户的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //重置row.username用户的密码
        console.log(row.username);
        resetPassword({"id":row.username})
            .then(res=>{
              this.$message({
                type: 'success',
                message: '重置成功!'
            })
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        });
      });
    },
    handleDeleteUser(index,row){
      /*
        删除row.username用户
       */
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({"id":row.username})
            .then(res=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            location.reload();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleCommit(){
      this.$refs.newUserForm.validate((valid) => {
        if (valid) {
          // 提交newUserForm表单，新增用户
          const now = new Date();
          const { format } = require('date-fns');
          var formattedDate = format(now, 'yyyy-MM-dd');
          this.newUserForm.creatTime=formattedDate;
          addUser(this.newUserForm)
              .then(res=>{
                alert("新增成功");
              })
          this.dialogFormVisible = false;
          this.clearNewUserForm();
          this.$refs.newUserForm.resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
        location.reload();
      });
    },
    handleCancel(){
      this.dialogFormVisible = false;
      this.clearNewUserForm();
      this.$refs.newUserForm.resetFields();
    },
    clearNewUserForm(){
      this.newUserForm.username = '';
      this.newUserForm.password = '123456';
      this.newUserForm.nickname = '';
      this.newUserForm.gender = '';
      this.newUserForm.phone = '';
      this.newUserForm.email = '';
    }
  }
}
</script>

<style>

</style>
