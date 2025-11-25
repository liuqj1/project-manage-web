<template>
  <div>
    <el-row type="flex">
      <el-input
          v-model="inputTitle"
          placeholder="新闻标题"
          prefix-icon="el-icon-search"
          size="small "
          style="width: 200px; margin-right: 10px" >
      </el-input>
      <el-input
          v-model="inputContent"
          placeholder="新闻内容"
          prefix-icon="el-icon-search"
          size="small "
          style="width: 200px; margin-right: 10px" >
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
          min-width="3%"
          align="center">
      </el-table-column>
      <el-table-column
          type="index"
          label="序号"
          fixed
          min-width="3%"
          :index=1
          align="center">
      </el-table-column>
      <el-table-column
          prop="id"
          label="新闻编号"
          sortable
          min-width="4%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="title"
          label="新闻标题"
          sortable
          min-width="14%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="tag"
          label="标签"
          min-width="7%"
          :filters=tagFilter
          :filter-method="filterTag"
          filter-placement="bottom-end"
          align="center">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.tag === '类型1' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="content"
          label="新闻内容"
          min-width="19%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="picture"
          label="图片"
          min-width="16%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="status"
          label="发布状态"
          min-width="7%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="releaseTime"
          label="发布时间"
          sortable
          min-width="12%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="creator"
          label="发布人"
          sortable
          min-width="8%"
          align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="7%" align="center">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              style="margin: 3px">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              style="margin: 3px">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import * as XLSX from 'xlsx';
export default {
  data() {
    return {
      inputTitle: '',
      inputContent: '',
      tagFilter: [{
        text: '类型1',
        value: '类型1'
      }, {
        text: '类型2',
        value: '类型2'
      }],
      filteredData: [], // 新增一个数组用于存储过滤后的数据
      //导出表格对应的列
      json_fields: {
        "新闻编号":'id',
        "新闻标题":'title',
        "新闻标签":'tag',
        "新闻内容":'content',
        "图片":'picture',
        "发布状态":'status',
        "发布时间":'releaseTime',
        "发布人":'admin',
      },
      tableData: [{
        id: '1',
        title: '新闻A',
        tag: '类型1',
        content: '测试内容',
        picture: '',
        status: '已发布',
        releaseTime: '2024-04-02 10:39',
        creator: 'admin'
      }, {
        id: '2',
        title: '新闻B',
        tag: '类型2',
        content: '测试内容',
        picture: '',
        status: '已发布',
        releaseTime: '2024-04-02 10:39',
        creator: 'admin'
      }, {
        id: '3',
        title: '新闻C',
        content: '测试内容',
        picture: '',
        status: '已发布',
        releaseTime: '2024-04-02 10:39',
        creator: 'admin'
      }, {
        id: '4',
        title: '新闻D',
        content: '测试内容',
        picture: '',
        status: '已发布',
        releaseTime: '2024-04-02 10:39',
        creator: 'admin'
      }],

    }
  },
  mounted() {
    this.filteredData=this.tableData;
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      this.$router.push({ name: 'news_push_edit' });
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    search(){
      // 根据输入框中的内容过滤表格数据
      this.filteredData = this.tableData.filter(item => {
        return (item.title.includes(this.inputTitle) || !this.inputTitle) && (item.content.includes(this.inputContent) || !this.inputContent);
      });
    },
    reset(){
      // 重置输入框的内容
      this.inputTitle = '';
      this.inputContent = '';
      // 重置表格数据为初始数据
      this.filteredData = this.tableData;
    },
    addItem(){
      this.$router.push({ name: 'news_push_add' });
    },
  }
}
</script>