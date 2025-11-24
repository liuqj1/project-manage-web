<template>
  <div style="height: 94%">
    <el-row type="flex" style="margin-top: 5px">
          <el-input
              v-model="inputDescription"
              placeholder="项目名称"
              prefix-icon="el-icon-search"
              size="small "
              style="width: 350px; margin-right: 10px" >
          </el-input>
          <div class="block">
          <el-date-picker
              v-model="dateRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              >
          </el-date-picker>
          </div>
          <el-button type="primary" icon="el-icon-search" @click="search" style="margin-left: 10px">搜索</el-button>
          <el-button type="warning" icon="el-icon-refresh-right" @click="reset">重置</el-button>
          <download-excel
              class="export-excel-wrapper"
              :data="filteredData"
              :fields="json_fields"
              :header="title"
              name="待审核的项目.xls"
              style=" margin-left: 10px"
          ><el-button class="exportBtn" type="success" icon="el-icon-s-promotion">导出</el-button>
          </download-excel>

        </el-row>
    <div>
          <el-table
              :data="getCurrentPageData"
              style="width: 100%; margin-top: 10px;"
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
                label="项目编号"
                sortable
                min-width="15%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="projectName"
                label="项目名称"
                sortable
                min-width="15%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="budget"
                label="项目预算"
                sortable
                min-width="15%"
                align="center">
            </el-table-column>

            <el-table-column
                prop="declarationTime"
                label="申报时间"
                sortable
                min-width="15%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="chargeUserNickname"
                label="负责人"
                sortable
                min-width="15%"
                align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="15%" align="center">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-s-check"
                    style="margin: 3px"
                    @click="handleVerify(scope.$index, scope.row)">审 核</el-button>
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

    <el-dialog title="审核预览" :visible.sync="dialogFormVisible">
      <div>
        <el-row>
          <el-col :span="24">
            <el-form :model="verifyForm" label-width="100px" :rules="this.rules" ref="verifyForm">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="项目编号：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.id}}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="项目名称：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.projectName}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="负责人：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.chargeUserNickname}}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="团队：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.teamname}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="申请预算：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.budget}}</el-text>
                    <el-text style="margin-left: 10px">元</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="确定预算：" :label-width="formLabelWidth" prop="commitBudget">
                    <el-input v-model="verifyForm.commitBudget" placeholder="请确认预算金额" style="width: 55%"></el-input>
                    <el-text style="margin-left: 10px">元</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="申报时间：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.declarationTime}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="21">
                  <el-form-item label="项目简介：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.introduce}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer" style="margin-top:20px">
          <div style="display: flex; justify-content: center;">
            <el-button type="danger" @click="handleReject()" style="margin-right: 30px">不通过</el-button>
            <el-button type="primary" @click="handleCommit()" style="margin-left: 30px">通 过</el-button>
          </div>
        </div>
      </div>

    </el-dialog>

  </div>

</template>

<script>
import {editNewsTag, getNewsTag} from "@/api/news";
import {
  declareProject,
  getAllProjects,
  getMyProjects,
  getProjectView,
  updateProjectBudget,
  updateProjectStatus
} from "@/api/project";

export default {
  data() {
    return {
      tableData: [],//原始数据
      filteredData:[],//过滤后的数据
      inputDescription: '',//输入搜索框的数据
      dateRange:'',
      editData:'',//选择编辑的数据
      currentPage: 1, // 当前页数
      pageSize:5, // 每页显示的记录数
      title:'待审核的项目',
      json_fields:{
        "项目编号":'id',
        "项目名称":'projectName',
        "项目预算":'budget',
        "负责人":'chargeUserNickname',
        "申报时间":'declarationTime',
      },
      dialogFormVisible: false,
      verifyForm: {
        id: '',
        projectName: '',
        chargeUserNickname: '',
        teamname: '',
        budget: '',
        commitBudget: '',
        declarationTime: '',
        introduce: ''
      },
      rules: {
        commitBudget: [
            { required: true, message: '请输入分配的预算金额', trigger: 'blur' },
        ]
      },
      formLabelWidth: '120px',

      tableHeight: 600,
    }
  },
  created() {
    getAllProjects()
        .then(res=>{
          var data=res.data.data;
          this.tableData=data;
          console.log(this.tableData)
          this.filteredData=this.tableData;//初始化过滤后的数据
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  },
  computed: {
    // 获取当前页的数据
    getCurrentPageData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredData.slice(startIndex, endIndex);
    }
  },
  methods: {
    formatter(row, column) {
      return row.address;
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
        if (!this.inputDescription && !this.dateRange) {
          return true;
        }

        // 判断是否存在输入框内容，如果没有，则直接判断日期范围
        if (!this.inputDescription) {
          // 如果日期范围存在，判断数据项的日期是否在范围内
          return this.isDateInRange(item.declarationTime);
        }

        // 判断是否存在日期范围，如果没有，则直接判断输入框内容
        if (!this.dateRange) {
          return item.projectName.includes(this.inputDescription);
        }

        // 如果输入框内容和日期范围都存在，则同时满足条件
        return item.projectName.includes(this.inputDescription) && this.isDateInRange(item.declarationTime);

      });
    },
    isDateInRange(date){
      // 解析日期范围字符串
      const [startDate, endDate] = this.dateRange.split('至');

      // 将日期字符串转换为 Date 对象
      const start = new Date(startDate);
      const end = new Date(endDate);
      const itemDate = new Date(date);

      // 判断日期是否在范围内
      return itemDate >= start && itemDate <= end;
    },
    reset(){
      // 重置输入框的内容
      this.inputDescription = '';
      this.dateRange='',
      // 重置表格数据为初始数据
      this.filteredData = this.tableData;
    },
    handleVerify(index, row) {
      this.dialogFormVisible = true;
      /*
        请求获取审核预览信息，并赋值给表单，请求负载row.id
       */
      getProjectView({"id":row.id})
          .then(res=>{
            var data=res.data.data;
            this.verifyForm=data[0];
          })
    },
    initDetailData(){
      this.verifyForm['id'] = '';
      this.verifyForm['projectName'] = '';
      this.verifyForm['chargeUserNickname'] = '';
      this.verifyForm['teamname'] = '';
      this.verifyForm['budget'] = '';
      this.verifyForm['commitBudget'] = '';
      this.verifyForm['declarationTime'] = '';
      this.verifyForm['introduce'] = '';
    },
    handleReject(){
      this.dialogFormVisible = false;
      let params = new URLSearchParams();
      params.append("id", this.verifyForm.id);
      params.append("status",0);
      updateProjectStatus(params)
          .then(res=>{
            alert("不通过");
          })
      this.initDetailData();
      this.$refs['verifyForm'].resetFields();
      location.reload();
    },
    handleCommit(){
      this.$refs['verifyForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let params = new URLSearchParams();
          params.append("id", this.verifyForm.id);
          params.append("status",2);
          updateProjectStatus(params)
              .then(res=>{
                alert("已通过");
              })

          let data = new URLSearchParams();
          data.append("id", this.verifyForm.id);
          data.append("budget",this.verifyForm.commitBudget);
          updateProjectBudget(data)
              .then(res=>{
              })

          this.$refs['verifyForm'].resetFields();
          this.initDetailData();
          location.reload();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style>
/deep/ .el-table th.gutter {
  background: #233754;
}
</style>
