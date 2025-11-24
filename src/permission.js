import router from './router'
import store from "@/store";
import {getToken} from "@/utils/auth";
import {Message} from "element-ui";

const whiteList = ['/login'] // 不重定向白名单
export function createRouterGuards(){
    try{
        router.beforeEach((to,from,next)=>{
            //如果存在token
            if(getToken()){
                //用户存在token并且向网页的login页面发送请求时，会自动重定向到首页
                // if(to.path === '/home') routerToByRole(next)
                if(to.path === '/login')    next('/')
                else {
                    let roles = store.getters.roles
                    // console.log(roles)
                    //如果修改了权限没有发生变化，注释掉if语句重新获取权限列表
                    // if (roles.length === 0){
                        //向后端发送请求，获取当前用户权限和个人信息
                        store.dispatch('GetInfo').then(res =>{
                            // console.log("后端发回的权限")
                            // console.log(res)
                            let userInfo = res.data.userInfo
                            let menus=userInfo.roles;
                        store.dispatch('GenerateRoutes', {menus}).then(() =>{ // 生成可访问的路由表
                            // console.log("yes")

                            next()
                            })
                            //当token失效时重新获取token
                        }).catch((err) => {
                            store.dispatch('FedLogOut').then(() => {
                                Message.error(err || 'Verification failed, please login again')
                                next({ path: '/' })
                            })
                        })
                    // }
                    // else {
                    //     console.log(roles)
                    //     console.log("已经有权限")
                    //     next()
                    // }
                }
            }
            else {
                if (whiteList.indexOf(to.path) !== -1) {
                    next()
                } else {
                    next('/login')
                }
            }

            // if(to.path === '/home') routerToByRole()
            // console.log("开始登录")
            // if(to.meta.noLogin){
            //     next()
            // }else{
            //     if(getSessionStorage('token')){
            //         if(getSessionStorage('menuCodeList').includes(to.meta.menuCode)){
            //             next()
            //         }
            //     }
            // }

        })
    }catch (e){

    }
}
//
// export function routerToByRole(next){
//     let roleLevel = this.$store.getters.roleLevel;
//     if(roleLevel=='科研人员') next({path: '/project'})
//     else if(roleLevel=='项目负责人') next({path: '/expend'})
//     else next({path: '/'})
//
// }

createRouterGuards()
