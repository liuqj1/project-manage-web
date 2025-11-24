<template>
  <div style="height: 94%">
    <el-row type="flex" style="margin-top: 5px">
      <el-input
          v-model="inputDescription"
          placeholder="项目名称或申报人"
          prefix-icon="el-icon-search"
          size="small "
          style="width: 350px; margin-right: 10px" >
      </el-input>
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
            label="报销记录编号"
            sortable
            min-width="8%"
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
            prop="reimburseUserNickname"
            label="申报人"
            sortable
            min-width="15%"
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
            prop="description"
            label="描述"
            sortable
            min-width="15%"
            align="center"
            :formatter="formatStatus">
        </el-table-column>
        <el-table-column label="操作" min-width="15%" align="center">
          <template slot-scope="scope">
            <el-button
                size="mini"
                icon="el-icon-check"
                type="success"
                style="margin: 3px"
                @click="handleSuccess(scope.$index, scope.row)"></el-button>
            <el-button
                size="mini"
                icon="el-icon-close"
                type="danger"
                style="margin: 3px"
                @click="handleFailed(scope.$index, scope.row)"></el-button>
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
  </div>

</template>

<script>
import {editNewsTag, getNewsTag} from "@/api/news";
import {getAllProjects, getMyProjects} from "@/api/project";
import {getMyProjectExpend, getMyUnverifiedExpend, searchExpend, verifyExpend} from "@/api/expend";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      tableData: [],//原始数据
      inputDescription:'',
      filteredData:[],//过滤后的数据
      dateRange:[],
      editData:'',//选择编辑的数据
      currentPage: 1, // 当前页数
      pageSize:5, // 每页显示的记录数

      tableHeight: 600, // 表格的高度
      title:"待审核的报销",
      json_fields:{
        "报销记录编号":'id',
        "项目名称":'projectName',
        "申报人":'reimburseUserNickname',
        "报销金额":'expend',
        "申报时间":'declarationTime',
        "描述":'description',
      },
    }
  },
  created() {
    getMyUnverifiedExpend({"username":this.username})
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
    }
  },
  methods: {
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
      let param = {
        nickName:this.inputDescription,
        projectName:this.inputDescription,
        startTime:this.dateRange[0],
        endTime:this.dateRange[1],
      }
      // 根据输入框中的内容过滤表格数据
      searchExpend(param).then(res=>{
        this.filteredData = res.data.data
        console.log(res.data.data)
      }).catch(error=>{
        console.log("查询出错")
      })
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
      this.inputDescription = '';
      this.dateRange='',
          // 重置表格数据为初始数据
          this.filteredData = this.tableData;
    },
    handleSuccess(index,row){
      let params = new URLSearchParams();
      params.append("id", row.id);
      params.append("status",1);
      verifyExpend(params)
          .then(res=>{
            alert("审核通过！")
          })
          .catch(res=>{
            alert("审核失败！")
          })
      location.reload();
    },
    handleFailed(index,row){
      let params = new URLSearchParams();
      params.append("id", row.id);
      params.append("status",2);
      verifyExpend(params)
          .then(res=>{
            alert("操作成功！")
          })
          .catch(res=>{
            alert("审核失败！")
          })
      location.reload();
    }
  }
}
</script>

<style>

</style>
