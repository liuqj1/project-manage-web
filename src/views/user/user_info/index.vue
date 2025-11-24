<template>
  <div>
    <el-row >
      <el-input
          v-model="inputId"
          placeholder="用户ID"
          prefix-icon="el-icon-search"
          size="small "
          style="width: 200px; margin-right: 10px" >
      </el-input>
      <el-input
          v-model="inputUsername"
          placeholder="用户名"
          prefix-icon="el-icon-search"
          size="small "
          style="width: 200px; margin-right: 10px" >
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button type="warning" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      <el-button type="primary" icon="el-icon-plus">添加</el-button>
      <el-button type="danger" icon="el-icon-delete">删除</el-button>
      <el-button type="success" icon="el-icon-s-promotion">导出</el-button>
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
          label="用户id"
          sortable
          min-width="10%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户账号名"
          sortable
          min-width="15%"
          align="center">
      </el-table-column>

      <el-table-column
          prop="phone"
          label="电话"
          min-width="15%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          min-width="20%"
          align="center">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态"
          min-width="15%"
          align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="15%" align="center">
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
export default {
  data() {
    return {
      inputId: '',
      inputUsername: '',
      filteredData: [], // 新增一个数组用于存储过滤后的数据
      tableData: [{
        id: '1',
        username: 'admin',
        phone: '88888888',
        email: '123456@qq.com',
        status: '正常',
      }, {
        id: '1',
        username: 'admin',
        phone: '88888888',
        email: '123456@qq.com',
        status: '正常',
      }, {
        id: '1',
        username: 'admin',
        phone: '88888888',
        email: '123456@qq.com',
        status: '正常',
      }, {
        id: '1',
        username: 'admin',
        phone: '88888888',
        email: '123456@qq.com',
        status: '正常',
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
        return (item.id.includes(this.inputId) || !this.inputId) && (item.username.includes(this.inputUsername) || !this.inputUsername);
      });
    },
    reset(){
      // 重置输入框的内容
      this.inputId = '';
      this.inputUsername = '';
      // 重置表格数据为初始数据
      this.filteredData = this.tableData;
    }

  }
}
</script>