<template>
  <div>
    <el-page-header @back="goBack" :content="projectName" style="margin-bottom: 30px"></el-page-header>
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
          name="demo.xls"
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
            label="成果编号"
            sortable
            min-width="20%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="typename"
            label="成果类型"
            sortable
            min-width="20%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="username"
            label="提交人工号"
            sortable
            min-width="15%"
            align="center">
        </el-table-column>

        <el-table-column
            prop="declarationTime"
            label="提交时间"
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
                :disabled="getHarvestVerifyBan"
                @click="handleCheck(scope.$index, scope.row)">审 核</el-button>
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
            <el-form :model="verifyForm" label-width="100px" :rules="rules" ref="verifyForm">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="成果编号：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.id}}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="成果类型：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.typeid}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="提交人工号：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.username}}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="提交人：" :label-width="formLabelWidth">
                    <el-text>{{verifyForm.nickName}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="21">
                  <el-form-item label="成果描述：" :label-width="formLabelWidth" prop="desc">
                    <el-text>{{verifyForm.description}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="评分：" :label-width="formLabelWidth" prop="quality" style="display: flex; align-items: center;">
                    <el-rate v-model="verifyForm.quality" :max="5" style="margin-left: 20px"></el-rate>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer" style="margin-top:20px">
          <div style="display: flex; justify-content: center;">
            <el-button type="danger" @click="handleReject()" style="margin-right: 30px">不通过</el-button>
            <el-button type="success" @click="handleAccept()" style="margin-left: 30px">通 过</el-button>
          </div>
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

export default {
  name: "harvest_verify",

  data() {
    return {
      projectId:'',
      projectName:'',
      tableData: [],//原始数据
      filteredData:[], //当前筛选之后的数据
      inputDescription: '',//输入搜索框的数据
      dateRange:'',
      editData:'',//选择编辑的数据
      currentPage: 1, // 当前页数
      pageSize:5, // 每页显示的记录数
      dialogFormVisible: false, // 弹框是否显示

      tableHeight: 600,

      verifyForm: {
        id: '',
        username: '',
        nickName: '',
        typeid: '',
        description: '',
        quality: '',
      },
      formLabelWidth: '120px',

      rules: {
        quality: [
            { required: true, message: '请给成果评分', trigger: 'change' },
        ]
      }
    }
  },

  created() {
    this.projectId=this.$route.query.projectId;
    this.projectName=this.$route.query.projectName;


    /*
     * 获取对应项目的待审核状态的成果，包括各成果的编号、成果类型、提交人工号（或者nickname）、提交时间
     */
    getAchievementStatus0({"id":this.projectId})
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
    },
    getHarvestVerifyBan(){
      let res = true;
      try {
        this.$store.getters.roles.forEach(item => {
          if (item.title === '成果审核') {
            throw new Error('成果审核权限已存在');
          }
        });
      } catch (e) {
        res = false;
      }
      return res;
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
            return this.isDateInRange(item.date);
          }

          // 判断是否存在日期范围，如果没有，则直接判断输入框内容
          if (!this.dateRange) {
            return item.name.includes(this.inputDescription);
          }

          // 如果输入框内容和日期范围都存在，则同时满足条件
          return item.name.includes(this.inputDescription) && this.isDateInRange(item.date);

        });
      },
      isDateInRange(date){
        // 解析日期范围字符串
        const start = new Date(this.dateRange[0]);
        const end = new Date(this.dateRange[1]);
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

      handleCheck(index, row){
        this.dialogFormVisible = true;
        this.verifyForm.id = row.id;
        this.verifyForm.username = row.username;
        /*
         * 获取对应成果的详细信息，包括成果编号、成果类型、提交人工号、提交人、提交时间、成果描述
         */
        for(let i=0;i<this.tableData.length;i++)
        {
          if(this.tableData[i].id===this.verifyForm.id)
            this.verifyForm=this.tableData[i];
        }
        console.log(this.verifyForm)
      },

      handleAccept(){
        this.$refs['verifyForm'].validate((valid) => {
          if (valid) {
            /*
             * 发送请求，把成果的审核状态改为通过，并update成对应的评分
             */
            console.log(this.verifyForm)
            let params = new URLSearchParams();
            params.append("id", this.verifyForm.id);
            params.append("quality",this.verifyForm.quality-1);
            updateAchievementStatus(params)
                .then(res=>{
                  alert("审核成功");
                })
            this.dialogFormVisible = false;
            this.clearForm();
            this.$refs['verifyForm'].resetFields();
            location.reload();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      handleReject(){
        this.$refs['verifyForm'].validate((valid) => {
          if (valid) {
            /*
             * 发送请求，把成果的审核状态改为不通过，并update成对应的评分
             */
            let params = new URLSearchParams();
            params.append("id", this.verifyForm.id);
            params.append("status",2);
            changeAchievementStatus()
                .then(res=>{
                  alert("审核成功");
                })
            this.dialogFormVisible = false;
            this.clearForm();
            this.$refs['verifyForm'].resetFields();
            location.reload();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      clearForm() {
        this.verifyForm.id = '';
        this.verifyForm.username = '';
        this.verifyForm.nickname = '';
        this.verifyForm.typeid = '';
        this.verifyForm.descriptions = '';
      },

    }
}

</script>

<style scoped>
/deep/ .el-form-item__content{
  max-left: 20px;
}
</style>