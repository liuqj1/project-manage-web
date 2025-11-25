
const getters= {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    nickname: state => state.user.nickname,
    roleLevel: state => state.user.roleLevel,
    roles: state => state.user.roles,
    addRouters: state => state.permission.addRouters,
    routers: state => state.permission.routers
}
export default getters
