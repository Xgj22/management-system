// 同步修改数据状态

/**
 * Mutations业务层数据提交
 */
import storage from './../utils/storage'

export default {
    saveUserInfo(state,userInfo){
        state.userInfo = userInfo;
        storage.setItem('userInfo',userInfo)
    }
}