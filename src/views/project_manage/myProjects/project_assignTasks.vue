<template>
  <div>
    <el-page-header @back="goBack" :content="projectName" style="margin-bottom: 30px"></el-page-header>
    <el-row type="flex" style="margin-top: 5px">
      <el-input
          v-model="inputDescription"
          placeholder="任务内容"
          prefix-icon="el-icon-search"
          size="small "
          style="width: 350px; margin-right: 10px" >
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="search" style="margin-left: 10px">搜索</el-button>
      <el-button type="warning" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      <download-excel
          class="export-excel-wrapper"
          :data="tableData"
          :fields="json_fields"
          :header="title"
          name="项目任务.xls"
          style=" margin-left: 10px"
      ><el-button class="exportBtn" type="success" icon="el-icon-s-promotion">导出</el-button>
      </download-excel>
      <el-button type="primary" icon="el-icon-plus" @click="addTask" style="margin-left: 10px">新建任务</el-button>
    </el-row>
    <div>
      <el-table
          :data="getCurrentPageData"
          style="width: 100%; margin-top: 10px"
          stripe
          border
          :default-sort = "{prop: 'id', order: 'ascending'}"
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
            prop="id"
            label="任务编号"
            sortable
            min-width="15%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="content"
            label="任务内容"
            min-width="30%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="username"
            label="任务负责人工号"
            sortable
            min-width="15%"
            align="center">
        </el-table-column>

        <el-table-column
            prop="nickname"
            label="任务负责人"
            sortable
            min-width="15%"
            align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="15%" align="center">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="warning"
                icon="el-icon-document-checked"
                style="margin: 3px"
                @click="handleAssign(scope.$index, scope.row)">分 配</el-button>
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


    <el-dialog title="任务分配" :visible.sync="dialogFormVisible">
      <div>
        <el-row>
          <el-col :span="24">
            <el-form :model="taskForm" label-width="100px" :rules="rules" ref="taskForm">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="任务编号：" :label-width="formLabelWidth">
                    <el-text style="width: 80%">{{ taskForm.id }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="项目名称：" :label-width="formLabelWidth">
                    <el-text style="width: 80%">{{ projectName }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="21">
                  <el-form-item label="任务内容：" :label-width="formLabelWidth">
                    <el-text style="width: 80%">{{ taskForm.content }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="任务负责人：" :label-width="formLabelWidth" prop="username">
                    <el-select v-model="taskForm.username" placeholder="请指定任务负责人" style="width: 35%">
                      <template v-for="(item, index) in users">
                        <el-option :key="index" :label="item.nickname" :value="item.username"></el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer" style="margin-top:20px">
          <div style="display: flex; justify-content: center;">
            <el-button @click="handleCancel()" style="margin-right: 30px">取 消</el-button>
            <el-button type="primary" @click="handleSubmitAssign()" style="margin-left: 30px">确 定</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="新建任务" :visible.sync="newTaskFormVisible">
      <el-form :model="newTaskForm" label-width="100px" :rule="rules" ref="newTaskForm">
        <el-Form-item label="任务内容：" :label-width="formLabelWidth" prop="content">
          <el-input
              type="textarea"
              v-model="newTaskForm.content"
              :maxlength="100"
              :autosize="{ minRows: 4, maxRows: 4}"
              resize="none"
              placeholder="请输入任务内容"
              show-word-limit
              style="width: 85%">
          </el-input>
        </el-Form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <div style="display: flex; justify-content: center;">
          <el-button @click="handleCancel()" style="margin-right: 30px">取 消</el-button>
          <el-button type="primary" @click="handleSubmitNewTask()" style="margin-left: 30px">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import {
  addAchievement, changeAchievementStatus, failAchievementStatus,
  getAchievementStatus0,
  updateAchievementStatus,
  updateProjectBudget,
  updateProjectStatus
} from "@/api/project";
import {addTask, assignTask, getProjectTask, getProjectUser} from "@/api/task";

export default {
  name: "project_assignTasks",

  data() {
    return {
      projectId: '',
      projectName:'',
      tableData: [],//原始数据
      filteredData:[], //当前筛选之后的数据
      inputDescription: '',//输入搜索框的数据
      dateRange:'',
      editData:'',//选择编辑的数据
      currentPage: 1, // 当前页数
      pageSize:5, // 每页显示的记录数
      dialogFormVisible: false, // 分配任务弹框是否显示
      newTaskFormVisible: false, // 新建任务弹框是否显示

      tableHeight: 600,

      users: [],
      taskForm: {
        id: '',
        content: '',
        username: '',
      },
      newTaskForm: {
        projectid:'',
        content: '',
      },
      formLabelWidth: '120px',
      title:"我参与的项目",
      json_fields:{
        "任务编号":'id',
        "任务内容":'content',
        "负责人工号":'username',
        "任务负责人":'nickname',
      },

      rules: {
        username: [
          { required: true, message: '请给任务分配负责人', trigger: 'change' },
        ],
        content: [
          { required: true, message: '请输入任务内容', trigger: 'change' },
        ]
      },
    }
  },

  created() {
    this.title=this.projectName;
    this.projectId=this.$route.query.projectId;
    this.projectName=this.$route.query.projectName;

    /*
     * 获取对应项目下的所有任务
     */
    getProjectTask({"projectid":this.projectId})
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

  methods:{
    formatter(row, column) {
      return row.address;
    },
    goBack() {
      this.$router.go(-1);
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

        if (!this.inputDescription) {
          // 如果日期范围存在，判断数据项的日期是否在范围内
          return true;
        }
        return item.content.includes(this.inputDescription);

      });
    },

    reset(){
      // 重置输入框的内容
      this.inputDescription = '';
      this.dateRange='';
      // 重置表格数据为初始数据
      this.filteredData = this.tableData;
    },

    handleAssign(index, row){
      this.dialogFormVisible = true;
      this.taskForm.id = row.id;
      this.taskForm.content = row.content;

      getProjectUser({"projectid":this.projectId})
          .then(res=>{
            var data=res.data.data;
            this.users=data;
            console.log(this.users);
          })

    },

    handleSubmitAssign(){
      this.$refs['taskForm'].validate((valid) => {
        if (valid) {
          /*
           * 发送请求，将任务分配给taskForm.username
           */

          assignTask({"id":this.taskForm.id,"username":this.taskForm.username})
              .then(res=>{
                alert("分配成功")
              })

          this.dialogFormVisible = false;
          this.clearForm();
          this.$refs['taskForm'].resetFields();
          location.reload();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleSubmitNewTask(){
      this.$refs['newTaskForm'].validate((valid) => {
        if (valid) {
          /*
           * 发送请求，新建任务
           */
          this.newTaskForm.projectid=this.projectId;
          addTask(this.newTaskForm)
              .then(res=>{
                alert("新建成功");
              })
          this.newTaskFormVisible = false;
          this.clearForm();
          this.$refs['newTaskForm'].resetFields();
          location.reload();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    handleCancel(){
      this.dialogFormVisible = false;
      this.newTaskFormVisible = false;
      this.clearForm();
      this.$refs['taskForm'].resetFields();
      this.$refs['newTaskForm'].resetFields();
    },
    clearForm() {
      this.taskForm.id = '';
      this.taskForm.username = '';
      this.taskForm.content = '';
      this.newTaskForm.content = '';
    },
    addTask(){
      this.newTaskFormVisible = true;
    },
  }
}

</script>

<style scoped>

</style>
