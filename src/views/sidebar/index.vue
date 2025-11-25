<template>
  <div>

    <el-container class="max-height">
      <el-header class="no-padding">
          <el-row class="header" justify="center" align="middle" type="flex" style="height: border-box;">
            <el-col :span="22" style="font-size: 18px; font-weight: 450; color: white;">科研项目管理系统</el-col>
            <el-col :span="2" style="display: flex;margin-right: 8px;justify-content: flex-start;" >
              <div style="padding: 10px" >{{this.$store.getters.nickname}}</div>
              <el-dropdown style="">
                <el-avatar size="medium" :src="avatar"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
                  <el-dropdown-item>注销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
      </el-header>
      <!-- 侧边栏-->
      <el-container>
        <el-aside unique-opened="false" width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-active="this.$route.path" router>
<!--            <el-menu-item index="/home">-->
<!--              <template slot="title"><i class="el-icon-location"></i>首页</template>-->
<!--            </el-menu-item>-->
<!--            <el-submenu index="2">-->
<!--              <template slot="title"><i class="el-icon-files"></i>项目管理</template>-->
<!--              <el-menu-item index="myProjects"><i class="el-icon-document"></i>我的项目</el-menu-item>-->
<!--              <el-menu-item index="project_harvest"><i class="el-icon-s-flag"></i>项目成果</el-menu-item>-->
<!--              <el-menu-item index="project_conclusion"><i class="el-icon-document-checked"></i>项目结题</el-menu-item>-->
<!--              <el-menu-item index="project_verify"><i class="el-icon-s-check"></i>项目审核</el-menu-item>-->
<!--            </el-submenu>-->
<!--            <el-submenu index="3">-->
<!--              <template slot="title"><i class="el-icon-s-finance"></i>经费管理</template>-->
<!--              <el-menu-item index="expend/expend_reimbursement"><i class="el-icon-tickets"></i>经费报销</el-menu-item>-->
<!--              <el-menu-item index="3-3"><i class="el-icon-s-check"></i>经费审核</el-menu-item>-->
<!--              <el-menu-item index="3-4"><i class="el-icon-notebook-2"></i>经费管理</el-menu-item>-->
<!--            </el-submenu>-->

<!--            <el-menu-item index="4">-->
<!--              <template slot="title"><i class="el-icon-user"></i>我的团队</template>-->
<!--            </el-menu-item>-->

<!--            <el-submenu index="5">-->
<!--              <template slot="title"><i class="el-icon-data-analysis"></i>数据统计</template>-->
<!--              <el-menu-item index="/news_tag"><i class="el-icon-collection"></i>项目统计</el-menu-item>-->
<!--              <el-menu-item index="/news_push" ><i class="el-icon-collection"></i>人员统计</el-menu-item>-->
<!--              <el-menu-item index="/news_push" ><i class="el-icon-collection"></i>成果统计</el-menu-item>-->
<!--            </el-submenu>-->

<!--            <el-submenu index="6">-->
<!--              <template slot="title"><i class="el-icon-setting"></i>系统管理</template>-->
<!--              <el-menu-item index="5-1"><i class="el-icon-user-solid"></i>用户管理</el-menu-item>-->
<!--              <el-menu-item index="5-2"><i class="el-icon-lock"></i>权限管理</el-menu-item>-->
<!--              <el-menu-item index="5-3"><i class="el-icon-document-copy"></i>数据备份</el-menu-item>-->
<!--              <el-menu-item index="5-3"><i class="el-icon-brush"></i>系统参数</el-menu-item>-->
<!--            </el-submenu>-->
<!--            -->

            <template v-if="roleLevel=='超级管理员'||roleLevel=='科研机构管理员'">
              <el-menu-item index="/home">
                <template slot="title"><i class="el-icon-pie-chart"></i>首页</template>
              </el-menu-item>
            </template>
            <template>
              <el-menu-item index="/my_home">
                <template slot="title"><i class="el-icon-s-custom"></i>个人中心</template>
              </el-menu-item>
            </template>
            <template v-for="item in accessRouters" v-if="item.children&&!item.hidden">
              <el-submenu v-if="item.children&&item.name!='home'" :index="'/'+item.name" >
                <template slot="title" v-if="item.children&&item.name!='home'"><i :class="item.meta.icon"></i>{{item.meta.title}}</template>
                <template v-for="child in item.children" >
                  <template v-if="!child.meta.hidden">
                    <el-menu-item :index="item.path+'/'+child.path" >
                      <template slot="title"><i :class="child.meta.icon"></i>{{child.meta.title}}</template>
                    </el-menu-item>
                  </template>

                </template>

              </el-submenu>

            </template>

          </el-menu>
        </el-aside>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
<!--    <router-view></router-view>-->
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import {fetchData} from "@/api/test";
import {MessageBox} from "element-ui";
import axios from "axios";
import {store} from "@/store/index"
export default {
  name: "sidebar",
  data(){
    return{
      accessRouters: {},
      // level: '',
    }
  },
  created() {
    this.accessRouters = this.$store.getters.routers
    this.level = this.$store.getters.roleLevel
    console.log(this.$store.getters.roles)
    console.log("本人具备的路由")
    // console.log(this.$store.getters.roleLevel)
    // console.log(this.$store.getters.routers[1])
    // console.log(this.accessRouters)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginOut(){
      // console.log("退出")
      this.$store.dispatch('FedLogOut').then(res=>{
        // console.log("退出")

        this.$router.push('/login')
        window.location.reload()
      })
    }
  },
  computed: {
    // ...mapGetters(['resturantName']) // 动态计算属性，相当于this.$store.getters.resturantName
    ...mapGetters(['avatar',"nickname","roleLevel"]),
    renderUsername(){
      // console.log(this.$store.getters.username)
      return this.$store.getters.nickname;
    }
  },
  mounted() {
    // this.AccessRouters = this.$store.getters.routers
    // console.log(this.AccessRouters)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.no-padding{
  padding: 0px ;
}
.max-height{
  height: 100vh;
}
.flex{
  display: flex;
}
.header{
  text-align: center;
  height: 60px;
  background-color: cornflowerblue;
  border-radius: 0px;
  border: none;
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .username {
    position: absolute;
    right: 140px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}

</style>
