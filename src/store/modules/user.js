import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {getInfo, login} from "@/api/login";
import {setCookie} from "@/utils/support";
import {setResult} from "@/utils/responseResult";

const user =  ({
    //全局共享数据
    state: {
        token: getToken(),
        username: '',
        nickname: '',
        avatar: '',
        roleLevel: '',
        roles: [],
    },

    //修改全局数据
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERNAME: (state, name) => {
            state.username = name
        },
        SET_NICKNAME: (state, name) => {
            state.nickname = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLE_LEVEL: (state, roleLevel) => {
            state.roleLevel = roleLevel
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        Login({ commit }, userInfo) {
            // userInfo.username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    // console.log("login:"+ this.$message)
                    setResult(response);
                    const data = response.data.data.user;
                    // console.log(response);
                    setCookie("username", data.username);
                    const tokenStr = data.token
                    setToken(tokenStr)
                    commit('SET_TOKEN', tokenStr)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_USERNAME', data.username)
                    commit('SET_NICKNAME', data.nickname)
                    resolve()
                }).catch(error => {
                    console.log("error: "+ error)
                    reject(error)
                })
            })
        },
        GetInfo({commit, state}){
            return new Promise((resolve, reject) => {

                //console.log(this.state.user)
                getInfo(this.state.user.username).then(res =>{
                    res = setResult(res);
                    let roles = res.data.userInfo.roles
                    // console.log("roleLevel")
                    // console.log(res.data.userInfo.roleLevel)
                    commit('SET_ROLE_LEVEL',res.data.userInfo.roleLevel )
                    if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        // console.log("权限")
                        // console.log(roles)
                        commit('SET_ROLES', roles)

                    } else {
                        // console.log("error")
                        reject('getInfo: roles must be a non-null array !')
                    }
                    resolve(res)
                    // alert("获取用户信息")
                }).catch(error => {
                    reject(error)
                })
            })
        },


        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resolve()
            })
        }
    },

})

export default user
