export default{
    ["USERID"](state,v){
        state.userId = v
    },
    ["USERINFO"](state,data){
        state.userInfo = data
    },
    ['GETROUTE'](state,v){
        console.log(v,'路由的值')
        state.routeName = v;
    }
}
