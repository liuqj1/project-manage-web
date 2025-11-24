import Vue from 'vue'
import Vuex from "vuex";
import VueRouter from 'vue-router'
import sidebar from '../views/sidebar/index.vue'

Vue.use(VueRouter)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '',
    component: sidebar,
    redirect: '/home',
    name:'home',
    meta: { title: '首页', icon: 'el-icon-location' },
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      },
      {
        path: 'my_home',
        name:'my_home',
        meta: { title: '个人中心', icon: 'el-icon-location'},
        component: () => import('@/views/home/my_home.vue'),
      }
    ]
  },
]

export const asyncRouterMap =[
  {
    path: '/project',
    component: sidebar,
    name: 'project',
    redirect: '/project/myProjects',
    meta: { title: '项目管理', icon: 'el-icon-files' },
    children: [
      {
        path: 'myProjects',
        name: 'myProjects',
        component: () => import('@/views/project_manage/myProjects/index.vue'),
        meta: { title: '我的项目', icon: 'el-icon-document' },
      },
      {
        path: 'project_harvest',
        name: 'project_harvest',
        component:()=>import('@/views/project_manage/project_harvest/index.vue'),
        meta: { title: '项目成果', icon: 'el-icon-s-flag' },
      },
      {
        path: 'project_conclusion',
        name: 'project_conclusion',
        component: () => import('@/views/project_manage/project_conclusion/index.vue'),
        meta: { title: '项目结题', icon: 'el-icon-document-checked' },
      },
      {
        path: 'project_verify',
        name: 'project_verify',
        component: () => import('@/views/project_manage/project_verify/index.vue'),
        meta: { title: '项目审核', icon: 'el-icon-s-check' },
      },
      {
        path: 'project_declare',
        name: 'project_declare',
        component: () => import('@/views/project_manage/myProjects/project_declare.vue'),
        meta: { title: '项目申报', icon: 'el-icon-s-help', hidden: true},
      },
      {
        path: 'project_assignTasks',
        name: 'project_assignTasks',
        component: () => import('@/views/project_manage/myProjects/project_assignTasks.vue'),
        meta: { title: '任务分配', icon: 'el-icon-s-help', hidden: true},
      },
      {
        path: 'harvest_verify',
        name: 'harvest_verify',
        component: () => import('@/views/project_manage/project_harvest/harvest_verify.vue'),
        meta: { title: '成果审核', icon: 'el-icon-s-check', hidden: true},
      }
    ]
  },
  {
    path: '/expend',
    component: sidebar,
    name: 'expend',
    redirect: '/expend/expend_reimbursement',
    meta: { title: '经费模块', icon: 'el-icon-s-finance' },
    children: [
      {
        path: 'expend_reimbursement',
        name: 'expend_reimbursement',
        component: () => import('@/views/expend_manage/expend_reimbursement/index.vue'),
        meta: { title: '经费报销', icon: 'el-icon-tickets' }
      },
      {
        path: 'expend_verify',
        name: 'expend_verify',
        component: () => import('@/views/expend_manage/expend_verify/index.vue'),
        meta: { title: '经费审核', icon: 'el-icon-s-check' },
      },
      {
        path: 'expend_reimburse',
        name: 'expend_reimburse',
        component: () => import('@/views/expend_manage/expend_reimbursement/expend_reimburse.vue'),
        meta: { title: '报销记录', icon: 'el-icon-s-check', hidden: true }
      },
      {
        path: 'reimburse',
        name: 'reimburse',
        component: () => import('@/views/expend_manage/expend_reimbursement/reimburse.vue'),
        meta: { title: '新增报销', icon: 'el-icon-notebook-2', hidden: true }
      },
    ]
  },
  {
    path: '/team',
    component: sidebar,
    name: 'team',
    redirect: '/team/my-team',
    meta: { title: '团队管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'my-team',
        name: 'my-team',
        component: () => import('@/views/team_manage/my_team/index'),
        meta: { title: '我的团队', icon: 'el-icon-tickets' },
      }
    ]
  },
  {
    path: '/system',
    component: sidebar,
    name: 'system',
    redirect: '/system/user_manage',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'user_manage',
        name: 'user_manage',
        component: () => import('@/views/system_manage/user_manage/index.vue'),
        meta: { title: '用户管理', icon: 'el-icon-user' },
      },
      {
        path: 'permission_manage',
        name: 'permission_manage',
        component: () => import('@/views/system_manage/permission_manage/index.vue'),
        meta: { title: '权限管理', icon: 'el-icon-lock' },
      },
      {
        path: 'data_backup',
        name: 'data_backup',
        component: () => import('@/views/system_manage/data_backup/index.vue'),
        meta: { title: '数据备份', icon: 'el-icon-s-data' },
      }
    ]
  }
]



let Vuerouter=new VueRouter({
  mode: 'history',
  //设置路由的基础路径
  base: '/scientific-manage-web',
  scrollBehavior: () => ({ y: 0 }),
  //路由表没做好
  routes: constantRouterMap.concat(asyncRouterMap)
})

export default Vuerouter


