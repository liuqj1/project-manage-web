<template>
  <div >
    <div class="search-row">
      <el-row type="flex" style="margin-top: 5px">
        <el-input
            v-model="inputDescription"
            placeholder="项目名称或团队名称"
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
            :data="tableData"
            :fields="json_fields"
            :header="title"
            name="我的团队.xls"
            style=" margin-left: 10px"
        ><el-button class="exportBtn" type="success" icon="el-icon-s-promotion">导出</el-button>
        </download-excel>
        <el-button
            type="success"
            icon="el-icon-edit-outline"
            style="margin-left: 10px"
            @click="getAllUsers">组建团队</el-button>
      </el-row>
    </div>
    <div class="table-container">
      <el-table
          :data="getCurrentPageData"
          style="width: 100%; margin-top: 10px"
          stripe
          border
          :default-sort = "{prop: 'declarationTime', order: 'ascending'}"
          :cell-style="cellStyle"
      >
        <el-table-column
            type="selection"
            min-width="5%"
            align="center">
        </el-table-column>
        <el-table-column
            key
            type="index"
            label="序号"
            fixed
            min-width="5%"
            align="center"
            :index=1>
        </el-table-column>
        <el-table-column
            prop="teamName"
            label="团队名称"
            sortable
            min-width="8%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="chargerName"
            label="负责人"
            sortable
            min-width="8%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="membersName"
            label="团队成员"
            :formatter="memberFormat"
            min-width="10%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="projectName"
            label="项目名称"
            sortable
            min-width="10%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="status"
            :class="{}"
            label="项目状态"
            sortable
            min-width="5%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="budget"
            label="项目预算"
            sortable
            min-width="5%"
            align="center">
        </el-table-column>
        <el-table-column
            prop="declarationTime"
            label="申报时间"
            sortable
            min-width="8%"
            align="center">
        </el-table-column>
        <el-table-column
            label="操作"
            min-width="10%"
            align="center">
          <template slot-scope="scope">
            <operate-col :key="Math.random()" :index="1" :row="scope.row"></operate-col>
<!--            <el-button-->
<!--                size="mini"-->
<!--                type="primary"-->
<!--                icon="el-icon-edit"-->
<!--                style="margin: 3px"-->
<!--                @click="handleEdit(scope.$index, scope.row)">查看</el-button>-->
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="pagination-container">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredData.length">
      </el-pagination>
    </div>
    <template class="creat-team-form">
      <el-dialog
          title="组建我的新团队"
          :visible.sync="DialogVisible"
          width="30%"
          center>
        <el-form :model="teamForm" :rules="rules" ref="teamForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="团队名称" prop="teamName">
            <el-input v-model="teamForm.teamName"></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名" prop="chargerName">
            <el-input v-model="teamForm.chargerName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="人员列表" prop="allMembers">
            <el-select  placeholder="请选择团队成员" filterable @change="addMembers" :filter-method="filterUsers">
              <template v-for="(item, index) in allMembers" >
                <el-option :key="index" :label="item.nickname" :value="item"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item  label="团队成员">
            <div style="border: 1px solid #b7b7b7;border-radius: 8px;min-height: 80px;" >
              <el-tag
                  style="margin: 5px"
                  :key="tag"
                  v-for="tag in this.dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                {{tag}}
              </el-tag>
            </div>
          </el-form-item>
<!--          <el-form-item label="负责人姓名" prop="chargerName">-->
<!--            <el-input v-model="teamForm.chargerName" :disabled="true"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="CreatMyTeam('teamForm')">立即创建</el-button>-->
<!--            <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--          </el-form-item>-->




<!--          <el-input-->
<!--              class="input-new-tag"-->
<!--              v-if="inputVisible"-->
<!--              v-model="inputValue"-->
<!--              ref="saveTagInput"-->
<!--              size="small"-->
<!--              @keyup.enter.native="handleInputConfirm"-->
<!--              @blur="handleInputConfirm"-->
<!--          >-->
<!--          </el-input>-->
<!--          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->

        </el-form>


        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="CreatMyTeam('teamForm')">立即创建</el-button>
          <el-button @click="DialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </template>

  </div>




</template>

<script>
import {mapGetters} from "vuex";
import {addMyChargedTeam, getMyTeam} from "@/api/team";
import OperateCol from "@/components/table/operateCol";
import {setResult} from "@/utils/responseResult";
import {fetchUserData} from "@/api/user";




export default {

  components: {OperateCol},
  data() {
    return {
      tableData: [],//原始数据
      filteredData:[],//过滤后的数据
      inputDescription: '',//输入搜索框的数据
      dateRange:'',
      editData:'',//选择编辑的数据
      currentPage: 1, // 当前页数
      pageSize:10, // 每页显示的记录数
      DialogVisible: false,

      // modifyDialogVisible: false,
      formLabelWidth: '120px',
      inputVisible: false,
      dynamicTags: [],
      inputValue: '',
      allMembers: [],
      teamForm: {
        teamName: '',
        chargerId: this.$store.getters.username,
        members: [],
        chargerName: this.$store.getters.nickname,

      },
      title:"我的团队",
      json_fields:{
        "团队名称":'teamName',
        "负责人":'chargerName',
        "团队成员":'membersName',
        "项目名称":'projectName',
        "项目预算":'budget',
        "项目状态":'status',
        "申报时间":'declarationTime',
      },
      rules: {
        teamName: [
          { required: true, message: '请输入队伍名称', trigger: 'blur' },
          { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  created() {
    getMyTeam({"username": this.username})
        .then(res=>{
          let data=res.data.data;
          this.tableData=data;
          // console.log(this.tableData)
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
      console.log("filteredData");
      console.log(this.filteredData.slice(startIndex, endIndex))

      return this.filteredData.slice(startIndex, endIndex);
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    tableRowClassName({row, rowIndex}){
      console.log(row)
      if(row.status=="不通过") return 'warning-row';
      if(row.status=="已结题") return 'success-row';
    },
    formatter(row, column) {
      return row.address;
    },
    handleSizeChange(pageSize){
      // pageSize 是当前选中的条数
      this.pageSize = pageSize;
      // 根据新的页面大小重新计算分页
      this.handleCurrentChange(this.currentPage);
    },
    // 处理当前页码变化
    handleCurrentChange(pageNum) {
      // pageNum 是当前点击的页码
      this.currentPage = pageNum;
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
          return item.teamName.includes(this.inputDescription)||item.projectName.includes(this.inputDescription);
        }

        // 如果输入框内容和日期范围都存在，则同时满足条件
        return (item.teamName.includes(this.inputDescription)||item.projectName.includes(this.inputDescription)) && this.isDateInRange(item.declarationTime);

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
      /*
        请求获取结题预览信息，并赋值给表单，请求负载row.id
       */
    },
    handleCommit(projectId){
      this.dialogFormVisible = false;
      /*
        提交修改结题请求，请求负载projectId
      */
      this.initDetailData();
    },
    handleCancel(){
      this.dialogFormVisible = false;
      this.initDetailData();
    },
    initDetailData(){
      this.concludeForm['projectId'] = '';
      this.concludeForm['projectName'] = '';
      this.concludeForm['charger'] = '';
      this.concludeForm['team'] = '';
      this.concludeForm['budge'] = '';
      this.concludeForm['expend'] = '';
      this.concludeForm['declareDate'] = '';
      this.concludeForm['achievementCount'] = '';
      achievementData: [];
    },
    memberFormat(row,col){
      let members = [];
      row.membersName.forEach((item, index) => {
        //对当前的颜色数组进行遍历处理
        members.push(item); //给它们每一项加上分号和空格
      });
      // members
      return members.join(", ");
    },
    cellStyle({ row, column, rowIndex, columnIndex }){
      if (column.property === 'status' && row.status === '不通过') {
        return 'background: #e78f8f';
      }
      else if (column.property === 'status' && row.status === '已结题')
        return 'background: #b5e3b9';
    },
    CreatMyTeam(teamForm){
      this.$refs[teamForm].validate((valid) => {
        // console.log("发过去的数据")
        // console.log(this.teamForm)
        if (valid) {
          addMyChargedTeam(this.teamForm).then(res=>{

            setResult(res)
          }).catch(error=>{
            console.log("插入失败")
          })
          this.$message({
            type: "success",
            message: "成功组建团队"
          })
          location.reload()
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addMembers(user){
      console.log("添加成员"+user)
      // let inputValue = this.inputValue;
      if (user) {
        this.dynamicTags.push(user.nickname);
        this.teamForm.members.push(user.username);
      }
    },
    getAllUsers(){
      this.DialogVisible=true;
      //获取所有用户
      fetchUserData().then(res=>{
        let user = res.data.data
        // user = res.data.data
        this.allMembers = res.data.data;

        this.allMembers = this.allMembers.filter(item => {
          return item.username!==this.username;
        });
        // console.log(res.data.data)
        // for(let i=0;i<user.length;i++){
        //   console.log(user[i].nickname)
        //   this.allMembers.push(user[i].nickname)
        // }
        console.log(this.allMembers)
      }).catch(error=>{
        console.log(error)
      })
    },
    filterUsers(query,option)
    {
      return option.username!==this.username;
    }
  },

}
</script>

<style lang="scss">

.el-table .warning-row {
  background: #e78f8f;
}

.el-table .success-row {
  background: #b5e3b9;
}

  //.team-member-div{
  //  height: calc();
  //}
</style>
