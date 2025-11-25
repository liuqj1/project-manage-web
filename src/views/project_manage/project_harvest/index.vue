<template>
  <div style="height: 94%">
    <el-tabs value="first" style="height: 100%" @tab-click="handleShift">
      <el-tab-pane label="我负责的项目" name="first" >
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
                :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <el-button type="primary" icon="el-icon-search" @click="search" style="margin-left: 10px">搜索</el-button>
          <el-button type="warning" icon="el-icon-refresh-right" @click="reset">重置</el-button>
          <download-excel
              class="export-excel-wrapper"
              :data="filteredData"
              :fields="json_fields"
              :header="title"
              name="我负责的项目.xls"
              style=" margin-left: 10px"
          ><el-button class="exportBtn" type="success" icon="el-icon-s-promotion">导出</el-button>
          </download-excel>

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
                label="项目编号"
                sortable
                min-width="20%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="projectName"
                label="项目名称"
                sortable
                min-width="20%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="achievementCount"
                label="成果数量"
                sortable
                min-width="15%"
                align="center">
            </el-table-column>

            <el-table-column
                prop="declarationTime"
                label="申报时间"
                sortable
                min-width="17%"
                align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="18%" align="center">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-document-checked"
                    style="margin: 3px"
                    @click="handleCheckHarv(scope.$index, scope.row)">待审核成果</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block" style="margin-top: 10px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage1"
              :page-sizes="[5, 10, 15, 20]"
              :page-size.sync="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="filteredData.length">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我参与的项目" name="second" >
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
                :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <el-button type="primary" icon="el-icon-search" @click="search" style="margin-left: 10px">搜索</el-button>
          <el-button type="warning" icon="el-icon-refresh-right" @click="reset">重置</el-button>
          <download-excel
              class="export-excel-wrapper"
              :data="filteredData"
              :fields="json_fields"
              :header="title"
              name="我参与的项目.xls"
              style=" margin-left: 10px"
          ><el-button class="exportBtn" type="success" icon="el-icon-s-promotion">导出</el-button>
          </download-excel>

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
                prop="achievementCount"
                label="成果数量"
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
            <el-table-column label="操作" min-width="15%; margin: auto" align="center">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="success"
                    icon="el-icon-upload2"
                    style="margin: 3px"
                    :disabled="getSubmitHarvestBan"
                    @click="handleSubmitHarv(scope.$index, scope.row)">提交成果</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block" style="margin-top: 10px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"

              :current-page="currentPage2"
              :page-sizes="[5, 10, 15, 20]"
              :page-size.sync="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="filteredData.length">
          </el-pagination>
        </div>
      </el-tab-pane >
    </el-tabs>

    <el-dialog title="提交成果" :visible.sync="dialogFormVisible">
      <div>
        <el-row>
          <el-col :span="24">
            <el-form :model="submitForm" label-width="100px" :rules="rules" ref="submitForm">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="项目编号：" :label-width="formLabelWidth">
                    <el-input v-model="submitForm.projectid" disabled style="width: 30%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="项目名称：" :label-width="formLabelWidth">
                    <el-input v-model="submitForm.projectName" disabled style="width: 50%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="提交人工号：" :label-width="formLabelWidth">
                    <el-input v-model="submitForm.username" disabled style="width: 75%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="成果类型：" :label-width="formLabelWidth" prop="typeid">
                    <el-select v-model="submitForm.typeid" placeholder="提交的成果类型" style="width: 75%">
                      <el-option label="发明专利" value="1"></el-option>
                      <el-option label="外观型专利" value="2"></el-option>
                      <el-option label="实用型专利" value="3"></el-option>
                      <el-option label="软件著作权" value="4"></el-option>
                      <el-option label="论文" value="5"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="成果描述：" :label-width="formLabelWidth" prop="description">
                    <el-input
                        v-model="submitForm.description"
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 5 }"
                        resize="none"
                        maxlength="150"
                        show-word-limit
                        style="width: 90%"
                    ></el-input>
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
import {
  addAchievement,
  getMyInvolvedProjectAchievement,
  getMyProjectAchievement,
  updateProjectStatus
} from "@/api/project";

export default {
  data() {
    return {
      Data: [],//原始数据
      chargerProjects:[],//负责的项目
      involvedProjects:[],//参与的项目
      inputDescription: '',//输入搜索框的数据
      dateRange:'',
      editData:'',//选择编辑的数据
      currentPage1: 1, // 当前页数
      currentPage2: 1, // 当前页数
      pageSize:5, // 每页显示的记录数
      filteredData:[], //当前筛选之后的数据
      isChargerPage: true,

      tableHeight: 600,

      dialogFormVisible: false,
      submitForm: {
        projectid: '',
        projectName: '',
        username: '',
        typeid: '',
        description: '',
        declarationTime:'',
      },
      formLabelWidth: '120px',
      title:"可结题的项目",
      json_fields:{
        "项目编号":'id',
        "项目名称":'projectName',
        "成果数量":'achievementCount',
        "申报时间":'declarationTime',
      },

      rules: {
        typeid: [
          { required: true, message: '请选择成果类型', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入成果描述', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    getMyProjectAchievement({"username": this.username})
        .then(res=>{
          var data=res.data.data;
          this.chargerProjects=data;
          console.log(this.tableData)
          this.filteredData=this.chargerProjects;//初始化过滤后的数据
        })
        .catch(res=>{
          console.log("获取原始数据失败");
        })
    getMyInvolvedProjectAchievement({"username": this.username})
        .then(res=>{
          var data=res.data.data;
          this.involvedProjects=data;
          console.log(this.tableData)
        })
        .catch(res=>{
          console.log("获取原始数据失败");
        })
  },
  computed: {
    ...mapGetters(['username']),
    // 获取当前页的数据
    getCurrentPageData() {
      let page = this.isChargerPage ? this.currentPage1 : this.currentPage2;
      const startIndex = (page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredData.slice(startIndex, endIndex);
    },
    getSubmitHarvestBan() {
      let res = true;
      try {
        this.$store.getters.roles.forEach(item => {
          if (item.title === '成果提交') {
            throw new Error('成果提交权限已存在');
          }
        })
      } catch (e) {
        res = false;
      }
      return res;
    }
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleShift(tab){
      console.log("转换数据");
      if((tab.name=='first' && this.isChargerPage) || (tab.name=='second' && !this.isChargerPage)) return;
      if(this.isChargerPage)
      {
        this.filteredData=this.involvedProjects;
      }
      else {
        this.filteredData=this.chargerProjects;
      }
      this.isChargerPage=!this.isChargerPage;
      this.pageSize=5;

    },
    handleSizeChange(newSize){
      this.pageSize = newSize;
      // 根据新的页面大小重新计算分页
      let page = this.currentPage1;
      if(!this.isChargerPage) page = this.currentPage2;
      this.handleCurrentChange(page);
    },
    // 处理当前页码变化
    handleCurrentChange(newPage) {
      if(this.isChargerPage) this.currentPage1 = newPage;
      else this.currentPage2 = newPage;
    },
    search(){
      // 根据输入框中的内容过滤表格数据
      var data = this.involvedProjects;
      if(this.isChargerPage){
        data = this.chargerProjects;
      }
      this.filteredData = data.filter(item => {
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
      if(this.isChargerPage)
        this.currentPage1=1;
      else this.currentPage2=1;
    },
    isDateInRange(date){
      // 解析日期范围字符串
      const start = new Date(this.dateRange[0]);
      const end = new Date(this.dateRange[1]);
      end.setDate(end.getDate()+1);
      console.log(end);
      const itemDate = new Date(date);

      // 判断日期是否在范围内
      return itemDate >= start && itemDate <= end;
    },
    reset(){
      // 重置输入框的内容
      this.inputDescription = '';
      this.dateRange='';
      var res = this.involvedProjects
      if(this.isChargerPage){
        res = this.chargerProjects;
      }
      // 重置表格数据为初始数据
      this.filteredData = res;
    },
    handleCheckHarv(index, row){
      // 对提交的项目成果进行审核
      this.$router.push({name: "harvest_verify", query: { projectId: row.id ,projectName: row.projectName} });
    },
    handleSubmitHarv(index, row){
      // 提交项目成果弹窗
      this.submitForm['projectid']=row.id;
      this.submitForm['projectName']=row.projectName;
      this.submitForm.username=this.username;
      this.dialogFormVisible = true;

    },
    handleCommit(){
      this.$refs["submitForm"].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          // 获取当前时间
          const now = new Date();
          const {format} = require('date-fns');
          var formattedDate = format(now, 'yyyy-MM-dd');
          // 将当前时间设置为表单的日期字段
          this.submitForm.declarationTime = formattedDate;
          addAchievement(this.submitForm)
              .then(res => {
                alert("提交成功！")
              })
          this.clearDetailData();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.clearDetailData();
    },
    clearDetailData() {
      this.submitForm['id'] = '';
      this.submitForm['projectName'] = '';
      this.submitForm['username'] = '';
      this.submitForm['typeid'] = '';
      this.submitForm['description'] = '';
    }
  }
}
</script>

<style>

</style>
