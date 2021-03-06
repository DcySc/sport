const environment = require('../config/environment')
const jwt = require('jsonwebtoken')
const sha1 = require('../utils/sha1')
const User = require('../domain/User')
class UserResource {
  constructor() {
    this.path = [{
      url: '/api/user',
      method: 'get',
      option: 'getUser'
    }, {
      url: '/api/user',
      method: 'delete',
      option: 'deleteUserById'
    }, {
      url: '/api/login',
      method: 'post',
      option: 'login'
    }, {
      url: '/api/register',
      method: 'post',
      option: 'addUser'
    },{
      url: '/api/update_user',
      method: 'post',
      option: 'updateUser'
    }];
  }


  // 需要有id参数
  async getUser(ctx) {
    let req_query = ctx.request.query;
    if (!req_query.id) {
      ctx.response.status = 501
      ctx.body = 'id querystring required'
    } else {
      try {
        let dbo = await ctx.mongodbUtil.dbo();
        let baseDao = ctx.baseDao;
        let res = await baseDao.find(dbo, 'user', {
          id: req_query.id
        });
        ctx.mongodbUtil.close();
        ctx.body = res;
      } catch (err) {
        ctx.body = 'err'
      }
    }
  }


  async addUser(ctx) {
    try {
      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;
      let user = new User(ctx.request.body);
      if(user.office){
        let office = await baseDao.find(dbo, 'office', {
          id: user.office
        });
        if(office.length<=0){
          ctx.body = {
            code:410,
            err: 'office not exsit'
          }
          return;
        }
      }

      
      let list = await baseDao.find(dbo, 'user', {
        id: user.id
      });

      if(list.length>0){
        ctx.status = 405;
        ctx.body = {
          error: 'user is aready exsit',
        };
      }else{
        let res = await baseDao.add(dbo, 'user', user);
        ctx.mongodbUtil.close();
        ctx.body = res;
      }
    } catch (err) {
      ctx.body = 'err'
    }
  }


  async deleteUserById(id) {
    let req_query = ctx.request.query;
    if (!req_query.id) {
      ctx.response.status = 501
      ctx.body = 'id querystring required'
    } else {
      try {
        let dbo = await ctx.mongodbUtil.dbo();
        let baseDao = ctx.baseDao;
        let res = await baseDao.delete(dbo, 'user', {
          id: req_query.id
        }, false);
        ctx.mongodbUtil.close();
        ctx.body = res;
      } catch (err) {
        ctx.body = 'err'
      }
    }
  }


  /**
   * 更新用户
   */
  async updateUser(ctx){
    const user = new User(ctx.request.body);
    try{
      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;
      ctx.body = await baseDao.update(dbo, 'user', {
        id: user.id
      }, {
        $set: user
      });

    }catch(err){
      console.log(err)
      ctx.status = 405;
    }
  }

  async login(ctx) {
    const user = ctx.request.body
    console.log(user)
    try {
      let dbo = await ctx.mongodbUtil.dbo();
      if (user.id) {
        let res = await ctx.baseDao.find(dbo, 'user', {
          id: user.id,
          role:user.role
        });
        if (res[0].password === user.password) {
          if (true) {
            const token = jwt.sign(user, environment.secret, {
              expiresIn: '1h'
            }) //token签名 有效期为1小时
            ctx.body = {
              message: '获取token成功',
              code: 1,
              token
            }
            return;
          }
        }
      }
    } catch (err) {
      ctx.body = {
        message: '参数错误',
        code: -1
      }
    }

    ctx.body = {
      message: '参数错误',
      code: -1
    }
  }
}

module.exports = UserResource