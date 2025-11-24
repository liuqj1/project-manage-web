<template>
  <div>
    <el-row type="flex">
      <el-input
          v-model="inputDescription"
          placeholder="输入标签名称或描述"
          prefix-icon="el-icon-search"
          size="small "
          style="width: 350px; margin-right: 10px" >
      </el-input>

      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button type="warning" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addItem">添加</el-button>
      <el-button type="danger" icon="el-icon-delete">删除</el-button>
      <download-excel
          class="export-excel-wrapper"
          :data="tableData"
          :fields="json_fields"
          :header="title"
          name="demo.xls"
          style=" margin-left: 10px"
      ><el-button class="exportBtn" type="success" icon="el-icon-s-promotion">导出</el-button>
      </download-excel>
    </el-row>
    <el-table
        :data="filteredData"
        style="width: 100%; margin-top: 10px"
        stripe
        border
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
          label="标签编号"
          sortable
          min-width="8%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="name"
          label="标签名称"
          sortable
          min-width="12%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="status"
          label="类型状态"
          sortable
          min-width="20%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="note"
          label="备注"
          sortable
          min-width="20%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="date"
          label="创建时间"
          sortable
          min-width="10%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="creator"
          label="创建者"
          sortable
          min-width="8%"
          align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="12%" align="center">
        <template slot-scope="scope">
          <el-button
              size="mini"
              style="margin: 3px"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              style="margin: 3px"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import {editNewsTag, getNewsTag} from "@/api/news";

export default {
  data() {
    return {
      inputDescription: '',//输入搜索框的数据
      filteredData:[],//过滤后的数据
      editData:'',//选择编辑的数据
      tableData: [],
    }
  },
  mounted() {
    getNewsTag()
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
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      //console.log(row.id)
      editNewsTag(row.id)
          .then(res=>{
            console.log(res)
          })
      this.$router.push({ name: 'news_tag_edit' });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    search(){
      // 根据输入框中的内容过滤表格数据
        this.filteredData = this.tableData.filter(item => {
          // 判断是否存在输入框内容，如果没有，则返回 true，表示保留该数据项
          if (!this.inputDescription) {
            return true;
          }
          return item.name.includes(this.inputDescription)||item.note.includes(this.inputDescription);
        });
    },
    reset(){
      // 重置输入框的内容
      this.inputDescription = '';
      // 重置表格数据为初始数据
      this.filteredData = this.tableData;
    },
    addItem(){
      this.$router.push({ name: 'news_tag_add' });
    },
  }
}
</script>


