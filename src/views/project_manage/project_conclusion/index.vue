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
          name="可结题的项目.xls"
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
          :max-height="tableHeight"
          :default-sort = "{prop: 'id', order: 'ascending'}"
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
            min-width="15%"
            align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="18%" align="center">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                icon="el-icon-circle-check"
                style="margin: 3px"
                :disabled="getConcludeProjectBan"
                @click="handleConclude(scope.$index, scope.row)">结 题</el-button>
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

    <el-dialog title="结题预览" :visible.sync="dialogFormVisible">
      <div>
        <el-row>
          <el-col :span="24">
            <el-form :model="concludeForm" label-width="100px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="项目编号：" :label-width="formLabelWidth">
                    <el-text>{{concludeForm.id}}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="项目名称：" :label-width="formLabelWidth">
                    <el-text>{{concludeForm.projectName}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="负责人：" :label-width="formLabelWidth">
                    <el-text>{{concludeForm.chargeUserNickname}}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="团队：" :label-width="formLabelWidth">
                    <el-text>{{concludeForm.teamname}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="预算：" :label-width="formLabelWidth">
                    <el-text>{{concludeForm.budget}}</el-text>
                    <el-text style="margin-left: 10px">元</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="支出：" :label-width="formLabelWidth">
                    <el-text>{{concludeForm.expend}}</el-text>
                    <el-text style="margin-left: 10px">元</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="申报时间：" :label-width="formLabelWidth">
                    <el-text>{{concludeForm.declarationTime}}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="成果数量：" :label-width="formLabelWidth">
                    <el-text>{{concludeForm.achievementCount}}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="24">
            <el-table :data="achievementData" stripe border>
              <el-table-column property="inventionCount" label="发明专利" min-width="20%" align="center"></el-table-column>
              <el-table-column property="appearanceCount" label="外观型专利" min-width="20%" align="center"></el-table-column>
              <el-table-column property="utilityCount" label="实用型专利" min-width="20%" align="center"></el-table-column>
              <el-table-column property="softwareCount" label="软件著作权" min-width="20%" align="center"></el-table-column>
              <el-table-column property="paperCount" label="论文" min-width="20%" align="center"></el-table-column>
            </el-table>
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
import sd from '../project_harvest/index.vue'
import {getMyProjectAchievement, getProjectAchievement, getProjectView, updateProjectStatus} from "@/api/project";
import {mapGetters} from "vuex";

export default {
  components: {
    sd
  },

  data() {
    return {
      tableData: [],//原始数据
      filteredData:[],//过滤后的数据
      inputDescription: '',//输入搜索框的数据
      dateRange:'',
      editData:'',//选择编辑的数据
      currentPage: 1, // 当前页数
      pageSize:5, // 每页显示的记录数
      tableHeight:600,
      dialogFormVisible: false,
      concludeForm: {
        id: '',
        projectName: '',
        chargeUserNickname: '',
        teamname: '',
        budget: '',
        expend: '',
        declarationTime: '',
        achievementCount: '',
      },
      achievementData: [],
      formLabelWidth: '120px',
      title:"可结题的项目",
      json_fields:{
        "项目编号":'id',
        "项目名称":'projectName',
        "成果数量":'achievementCount',
        "申报时间":'declarationTime',
      },
    }
  },
  created() {
    getMyProjectAchievement({"username": this.username})
        .then(res=>{
          var data=res.data.data;
          this.tableData=data;
          console.log(this.tableData)
          this.filteredData=this.tableData;//初始化过滤后的数据
        })
        .catch(res=>{
          console.log("获取原始数据失败");
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
    getConcludeProjectBan() {
      let res = true;
      try {
        this.$store.getters.roles.forEach(item => {
          if (item.title === '项目结题') {
            throw Error('项目结题权限已存在');
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
      const start = new Date(this.dateRange[0]);
      const end = new Date(this.dateRange[1]);
      end.setDate(end.getDate()+1);
      const itemDate = new Date(date);

      // 判断日期是否在范围内
      return itemDate >= start && itemDate <= end;
    },
    reset(){
      // 重置输入框的内容
      this.inputDescription = '';
      this.dateRange='';
      // 重置表格数据为初始数据
      this.filteredData = this.tableData;
    },

    handleConclude(index, row){
      this.dialogFormVisible = true;
      //请求获取结题预览信息，并赋值给表单，请求负载row.id

      getProjectView({"id":row.id})
          .then(res=>{
            var data=res.data.data;
            this.concludeForm=data[0];
            console.log(data[0]);
          })
      getProjectAchievement({"id":row.id})
          .then(res=>{
            var data=res.data.data;
            this.achievementData=data;
          })
    },
    handleCommit(){
      this.dialogFormVisible = false;
      let params = new URLSearchParams();
      params.append("id", this.concludeForm.id);
      params.append("status",3);
      updateProjectStatus(params)
          .then(res=>{
            alert("已结题");
          })
      location.reload();
      this.clearDetailData();
    },
    handleCancel(){
      this.dialogFormVisible = false;
      this.clearDetailData();
    },
    clearDetailData(){
      this.concludeForm['id'] = '';
      this.concludeForm['projectName'] = '';
      this.concludeForm['chargeUserNickname'] = '';
      this.concludeForm['teamname'] = '';
      this.concludeForm['budget'] = '';
      this.concludeForm['expend'] = '';
      this.concludeForm['declarationTime'] = '';
      this.concludeForm['achievementCount'] = '';
      this.achievementData=[];
    }
  },

}
</script>

<style>
/deep/ .el-table th.gutter {
  background: #233754;
}
</style>
