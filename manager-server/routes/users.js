// 用户管理模块
const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
const jwt = require('jsonwebtoken')
router.prefix('/users')


// ctx 上下文对象
router.post('/login',async(ctx) =>{
  try {
    console.log(ctx)
    const { userName,password } = ctx.request.body
    // 可以指定返回的字符段,字符串中间用空格隔开
    const res = await User.findOne({
      userName,
      password
    },'userId userName userEmail state role deptId roleList')
    // ,'userId userName userEmail state role deptId roleList'
    // const data = res._doc
    // const token = jwt.sign({
    //   data: data
    // }, 'xgj', { expiresIn: '1h' });
    console.log(res)
    if(res){
      const data = res._doc;

      const token = jwt.sign({
        data
      }, 'xgj', { expiresIn: '1h' })
      data.token = token;
      ctx.body = util.success(data)
    }else{
      ctx.body = util.fail("账号或密码不正确")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

module.exports = router
