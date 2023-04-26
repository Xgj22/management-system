// 用户管理模块
const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
router.prefix('/users')


// ctx 上下文对象
router.post('/login',async(ctx) =>{
  try {
    console.log(666)
    const { userName,password } = ctx.request.body
    console.log(userName,password)
    const res = await User.findOne({
      userName,
      password
    })
    console.log(User)
    if(res){
      ctx.body = util.success(res)
    }else{
      ctx.body = util.fail("账号或密码不正确")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

module.exports = router
