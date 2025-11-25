import Vuex from "vuex";
import { asyncRouterMap, constantRouterMap } from '@/router/index';

//根据路由名称获取菜单
//menus是后端发送的数据库的权限表，name是当前路由写在路由表的name属性值
function getMenu(name, menus) {
    // console.log("getMenu中的输出")
    // console.log(name)
    // console.log(menus)
    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i];
        if (name === menu.title) {
            return menu;
        }
    }

    return null;
}

//判断是否有权限访问该菜单
//menus是后端发送的数据库的权限表,route是当前访问的路由的模块
function hasPermission(menus, route) {
    console.log(route.name)
    if (route.name) {
        let currMenu = getMenu(route.meta.title, menus);
        // console.log("currMenu:"+currMenu)
        if (currMenu != null) {
            //设置菜单的标题、图标和可见性
            //这段代码表示以后端数据库的渲染为准更新前端的路由的meta元数据
            if (currMenu.title != null && currMenu.title !== '') {
                route.meta.title = currMenu.title;
            }
            if (currMenu.icon != null && currMenu.title !== '') {
                route.meta.icon = currMenu.icon;
            }
            if (currMenu.hidden != null) {
                route.hidden = currMenu.hidden === 0;
            }
            if (currMenu.sort != null && currMenu.sort !== '') {
                route.sort = currMenu.sort;
            }
            return true;
        } else {
            route.sort = 0;
            if (route.hidden !== undefined && route.hidden === true) {
                route.sort = -1;
                return true;
            } else {
                return false;
            }
        }
    } else {
        return true
    }
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({commit},data) {
            // alert(data.value)
            // console.log(commit)
            return new Promise(resolve => {
                // // 定义一个对象
                // const myObject = { name: 'John', age: 30 };
                // // 使用解构赋值获取对象中的属性
                // const { name, age } = myObject;

                const { menus } = data;
                // const { username } = data;
                let asyncRouterMapCopy = JSON.parse( JSON.stringify(asyncRouterMap));//深拷贝
                //filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                const accessedRouters = asyncRouterMapCopy.filter(router => {
                    // console.log("查看v")
                    // console.log(router)
                    //admin帐号直接返回所有菜单
                    // if(username==='admin') return true;
                    if (hasPermission(menus, router)) {
                        if (router.children && router.children.length > 0) {
                            router.children = router.children.filter(child => {
                                if (hasPermission(menus, child)) {
                                    return child
                                }
                                return false;
                            });
                            return router
                        } else {
                            return router
                        }
                    }
                    return false;
                    // return true;
                });
                console.log("查看accessedRouters")
                console.log(accessedRouters)
                //对菜单进行排序
                // sortRouters(accessedRouters);
                commit('SET_ROUTERS', accessedRouters);
                resolve();
            })
        }
    }
};

export default permission;

