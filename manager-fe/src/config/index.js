/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    dev:{
        baseApi:'/api',
        // mockApi:'https://www.fastmock.site/mock/8d06a0c05a974a95d2ff9b7446336788/api'
        mockApi:'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    test:{
        baseApi:'//test.futurefe.com/api',
        mockApi:'https://www.fastmock.site/mock/8d06a0c05a974a95d2ff9b7446336788/api'
    },
    prod:{
        baseApi:'//futurefe.com/api',
        mockApi:'https://www.fastmock.site/mock/8d06a0c05a974a95d2ff9b7446336788/api'
    }
}
export default {
    env,
    mock:false,//开启关闭mock接口
    namespace:'manager',
    ...EnvConfig[env]
}