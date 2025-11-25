<template>
  <div style="height: 94%">
    <el-page-header @back="goBack" :content="projectName" style="margin-bottom: 30px"></el-page-header>
    <el-row type="flex" style="margin-top: 5px">
      <el-select v-model="selectedStatus" placeholder="审核状态">
        <el-option label="待审核" value="0"></el-option>
        <el-option label="通过" value="1"></el-option>
        <el-option label="不通过" value="2"></el-option>
      </el-select>
      <div class="block" style="margin-left: 10px">
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
          name="我的报销记录.xls"
          style=" margin-left: 10px"
      ><el-button class="exportBtn" type="success" icon="el-icon-s-promotion">导出</el-button>
      </download-excel>
      <el-button
          type="success"
          icon="el-icon-edit-outline"
          style="margin-left: 10px"
          :disabled="getReimburseBan"
          @click="handleReimburse()">新增报销</el-button>
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
            label="报销记录编号"
            sortable
            min-width="15%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="description"
            label="经费去向"
            min-width="30%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="expend"
            label="报销金额"
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
            prop="status"
            label="审核状态"
            sortable
            min-width="15%"
            align="center"
            :formatter="formatStatus">
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

  </div>

</template>

<script>
import {getAllProjects, getMyProjects} from "@/api/project";
import {getMyProjectExpend} from "@/api/expend";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      tableData: [],//原始数据
      filteredData:[],//过滤后的数据
      selectedStatus: '' ,// 初始化选中状态
      dateRange:'',
      editData:'',//选择编辑的数据
      currentPage: 1, // 当前页数
      pageSize:5, // 每页显示的记录数
      projectId:'',
      projectName:'',

      tableHeight: 600,
      title:"",
      json_fields:{
        "报销记录编号":'id',
        "经费去向":'description',
        "报销金额":'expend',
        "申报时间":'declarationTime',
        "审核状态":'status',
      },
    }
  },
  created() {
    this.title=this.projectName;
    this.projectId=this.$route.query.projectId;
    this.projectName=this.$route.query.projectName;
    getMyProjectExpend({"projectId":this.projectId,"username":this.username})
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
    ...mapGetters(['username']),
    // 获取当前页的数据
    getCurrentPageData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredData.slice(startIndex, endIndex);
    },
    getReimburseBan(){
      let res = true;
      try {
        this.$store.getters.roles.forEach(item => {
          if (item.title === '新增报销') {
            throw new Error('新增报销权限已存在');
          }
        });
      } catch (e) {
        res = false;
      }
      return res;
    }
  },
  methods: {
    formatStatus(row, column, cellValue){
      if(cellValue===0)
        return '待审核';
      else if(cellValue===1)
        return  '通过';
      else return '不通过';
    },
    handleCheck(index,row)
    {

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
        if (!this.selectedStatus && !this.dateRange) {
          return true;
        }
        // 判断是否存在输入框内容，如果没有，则直接判断日期范围
        if (!this.selectedStatus) {
          // 如果日期范围存在，判断数据项的日期是否在范围内
          return this.isDateInRange(item.declarationTime);
        }

        // 判断是否存在日期范围，如果没有，则直接判断输入框内容
        if (!this.dateRange) {
          return item.status.toString()===this.selectedStatus.toString();
        }

        // 如果输入框内容和日期范围都存在，则同时满足条件
        return item.status.toString()===this.selectedStatus.toString()&& this.isDateInRange(item.declarationTime);

      });
    },
    isDateInRange(date){
      // 解析日期范围字符串
      // 将日期字符串转换为 Date 对象
      const start = new Date(this.dateRange[0]);
      const end = new Date(this.dateRange[1]);
      end.setDate(end.getDate()+1);
      const itemDate = new Date(date);
      // 判断日期是否在范围内
      return itemDate >= start && itemDate <= end;
    },
    reset(){
      // 重置输入框的内容
      this.selectedStatus = '';
      this.dateRange='',
          // 重置表格数据为初始数据
          this.filteredData = this.tableData;
    },
    handleReimburse(){
      this.$router.push({name: 'reimburse', query: {projectId:this.projectId,projectName:this.projectName}});
    },
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style>
/deep/ .el-table th.gutter {
  background: #233754;
}
</style>
