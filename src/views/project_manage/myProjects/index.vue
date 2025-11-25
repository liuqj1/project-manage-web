<template>
  <div style="height: 94%">
    <el-tabs value="first" style="height: 100%" @tab-click="handleShift">
      <el-tab-pane label="我负责的项目"  name="first">
        <el-row type="flex" style="margin-top: 5px">
          <el-input
              v-model="inputDescription"
              placeholder="项目名称"
              prefix-icon="el-icon-search"
              size="small "
              style="width: 350px; margin-right: 10px" >
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="warning" icon="el-icon-refresh-right" @click="reset">重置</el-button>
          <download-excel
              class="export-excel-wrapper"
              :data="filteredData"
              :fields="json_fields1"
              :header="title1"
              name="我负责的项目.xls"
              style=" margin-left: 10px"
          ><el-button class="exportBtn" type="success" icon="el-icon-s-promotion">导出</el-button>
          </download-excel>
          <el-button
              type="success"
              icon="el-icon-edit-outline"
              style="margin-left: 10px"
              :disabled="getDeclareProjectBan"
              @click="handleDeclare()">申报</el-button>
        </el-row>
        <div>
          <el-table
              :data="getCurrentPageData"
              style="width: 100%; margin-top: 10px"
              stripe
              border
              :default-sort = "{prop: 'id', order: 'ascending'}"
              :max-height="tableHeight"
              :cell-style="cellStyle"
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
                min-width="10%"
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
                min-width="10%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="status"
                label="项目状态"
                sortable
                min-width="10%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="introduce"
                label="项目简介"
                sortable
                min-width="20%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="declarationTime"
                label="申报时间"
                sortable
                min-width="10%"
                align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="15%" align="center">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-view"
                    style="margin: 3px"
                    @click="handleDetail(scope.$index, scope.row)">项目详情</el-button>
                <el-button
                    size="mini"
                    type="success"
                    icon="el-icon-guide"
                    style="margin: 3px"
                    :disabled="scope.row.status !== '已立项'"
                    @click="handleAssignTasks(scope.$index, scope.row)">项目任务</el-button>
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
      <el-tab-pane label="我参与的项目" name="second">
        <el-row type="flex" style="margin-top: 5px">
          <el-input
              v-model="inputDescription"
              placeholder="项目名称"
              prefix-icon="el-icon-search"
              size="small "
              style="width: 350px; margin-right: 10px" >
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="warning" icon="el-icon-refresh-right" @click="reset">重置</el-button>
          <download-excel
              class="export-excel-wrapper"
              :data="filteredData"
              :fields="json_fields2"
              :header="title2"
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
              :cell-style="cellStyle"
          >
            <el-table-column
                type="selection"
                min-width="4%"
                align="center">
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                fixed
                min-width="4%"
                align="center"
                :index=1>
            </el-table-column>
            <el-table-column
                prop="id"
                label="项目编号"
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
                prop="budget"
                label="项目预算"
                sortable
                min-width="10%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="status"
                label="项目状态"
                sortable
                min-width="8%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="introduce"
                label="项目简介"
                sortable
                min-width="18%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="declarationTime"
                label="申报时间"
                sortable
                min-width="10%"
                align="center">
            </el-table-column>
            <el-table-column
                prop="chargeUserNickname"
                label="负责人"
                sortable
                min-width="8%"
                align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="15%" align="center">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-view"
                    style="margin: 3px"
                    @click="handleDetail(scope.$index, scope.row)">项目详情</el-button>
                <el-button
                    size="mini"
                    type="success"
                    icon="el-icon-s-order"
                    style="margin: 3px"
                    @click="handleMyTasks(scope.$index, scope.row)">我的任务</el-button>
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
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="项目详情" :visible.sync="dialogFormVisible">
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
            <el-button type="primary" @click="handleCancel()" style="margin-left: 30px">确 定</el-button>
          </div>
        </div>
      </div>

    </el-dialog>

    <el-dialog :title="myTasksInPro" :visible.sync="myTasksVisible">
      <el-table :data="myTasks" :default-sort = "{prop: 'id', order: 'ascending'}" stripe border>
        <el-table-column prop="id" label="任务编号" min-width="25%" align="center"></el-table-column>
        <el-table-column prop="content" label="任务内容" min-width="75%" align="center"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <div style="display: flex; justify-content: center;">
          <el-button @click="handleCancel()" style="margin-right: 30px">关 闭</el-button>
        </div>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {mapGetters} from "vuex";
import {
  getMyInvolvedProject,
  getMyProjects,
  getProjectAchievement,
  getProjectView,
  updateProjectStatus
} from "@/api/project";
import {getMyProjectTask} from "@/api/task";

export default {
  data() {
    return {
      Data: [],//原始数据
      chargerProjects:[],//负责的项目
      involvedProjects:[],//参与的项目
      filteredData:[],//过滤后的数据
      inputDescription: '',//输入搜索框的数据
      isChargerPage:true,
      editData:'',//选择编辑的数据
      currentPage1: 1, // 当前页数
      currentPage2: 1, // 当前页数
      pageSize:5, // 每页显示的记录数
      title1:"我负责的项目",
      title2:"我参与的项目",
      json_fields1:{
        "项目编号":'id',
        "项目名称":'projectName',
        "项目预算":'budget',
        "项目状态":'status',
        "项目简介":'introduce',
        "申报时间":'declarationTime',
      },
      json_fields2:{
        "项目编号":'id',
        "项目名称":'projectName',
        "项目预算":'budget',
        "项目状态":'status',
        "项目简介":'introduce',
        "申报时间":'declarationTime',
        "负责人":'chargeUserNickname',
      },

      dialogFormVisible: false,
      myTasksVisible: false,
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

      myTasks: [],
      myTasksInPro: '',

      tableHeight: 600,
  }
  },
  created() {
    // console.log(username)

  },
  mounted() {

    getMyProjects({"username": this.username})
        .then(res=>{
          var data=res.data.data;
          this.chargerProjects=data;
          this.filteredData=this.chargerProjects;//初始化过滤后的数据
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    getMyInvolvedProject({"username": this.username})
        .then(res=>{
          var data=res.data.data;
          this.involvedProjects=data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  },

  computed: {
    ...mapGetters(['username']),
    // 获取当前页的数据
    getCurrentPageData() {
      let page = this.currentPage1;
      if(!this.isChargerPage){
        page = this.currentPage2;
      }
      const startIndex = (page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredData.slice(startIndex, endIndex);
    },

    getDeclareProjectBan() {
      let res = true;
      try {
        this.$store.getters.roles.forEach(item => {
          if(item.title == "项目申报"){
            throw new Error("项目申报权限已存在");
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
      let page = this.currentPage1;
      if(!this.isChargerPage) page = this.currentPage2;
      this.handleCurrentChange(page);
    },
    // 处理当前页码变化
    handleCurrentChange(newPage) {
      if(this.isChargerPage){
        this.currentPage1 = newPage;
      } else {
        this.currentPage2 = newPage;
      }
    },
    handleEdit(index, row) {
      console.log(row.id)
      this.$router.push({name: 'project_detail', params:{id:row.id}})
    },
    handleShift(tab) {
      this.reset();
      if((tab.name=='first' && this.isChargerPage) || (tab.name=='second' && !this.isChargerPage)) return;
      if(this.isChargerPage)
      {
        this.filteredData=this.involvedProjects;
      }
      else {
        this.filteredData=this.chargerProjects;
      }
      this.isChargerPage=!this.isChargerPage;
    },
    cellStyle({ row, column, rowIndex, columnIndex }){
      if (column.property === 'status' && row.status === '不通过') {
        return 'background: #e78f8f';
      }
      else if (column.property === 'status' && row.status === '已结题')
        return 'background: #b5e3b9';
    },
    search(){
      // 根据输入框中的内容过滤表格数据
      let data = this.chargerProjects;
      if(!this.isChargerPage){
        data = this.involvedProjects;
      }
      this.filteredData = data.filter(item => {
        // 判断是否存在输入框内容，如果没有，则返回 true，表示保留该数据项
        if (!this.inputDescription) {
          return true;
        }
        return item.projectName.includes(this.inputDescription);
      });
      if(this.isChargerPage)
        this.currentPage1=1;
      else this.currentPage2=1;
    },
    reset(){
      // 重置输入框的内容
      this.inputDescription = '';
      // 重置表格数据为初始数据
      if(this.isChargerPage)
        this.filteredData = this.chargerProjects;
      else this.filteredData=this.involvedProjects;
    },
    handleDeclare(){
      this.$router.push({name: 'project_declare'});
    },
    handleDetail(index, row){
      this.dialogFormVisible = true;
      // 请求获取详细项目信息，并赋值给表单，请求负载row.id
      getProjectView({"id":row.id})
          .then(res=>{
            var data=res.data.data;
            this.concludeForm=data[0];
          })
      getProjectAchievement({"id":row.id})
          .then(res=>{
            var data=res.data.data;
            this.achievementData=data;
          })
    },
    handleCancel(){
      this.dialogFormVisible = false;
      this.myTasksVisible = false;
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
      this.myTasks=[];
      this.myTasksInPro='';
    },
    handleAssignTasks(index, row){
      this.$router.push({name: 'project_assignTasks', query: {projectId: row.id, projectName: row.projectName}});
    },
    handleMyTasks(index, row){
      this.myTasksVisible = true;
      this.myTasksInPro=row.projectName;
      /*
        请求获取当前用户在项目row.id中的任务
       */
      getMyProjectTask({"projectid":row.id,"username":this.username})
          .then(res=>{
            var data=res.data.data;
            this.myTasks=data;
          })
    }
  }
}
</script>

<style>
/deep/ .el-table th.gutter {
  background: #233754;
}
</style>
<!--字体样式
固定表格的大小
-->
