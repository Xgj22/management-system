// 接口封装
import request from "../utils/request";

export default {
    login(params){
        return request({
            url:'/users/login',
            method:'post',
            data:params,
        })
    },
    getMenuList(params){
        return request({
            url:'menu/list',
            method:'get',
            data:params,
            mock:true
        })
    },
    getUserList(params) {
        return request({
            url: '/users/list',
            method: 'get',
            data: params,
            mock:true
        })
    },
    userDel(params){
        return request({
            url:'/users/delete',
            method:'post',
            data:params,
            mock:true
        })
    }
}