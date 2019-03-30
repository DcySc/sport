const environment = require('../config/environment')
const User = require('../domain/User')
const Post = require('../domain/Post')

class PostResource {
  constructor() {
    this.path = [, {
      url: '/api/post',
      method: 'post',
      option: 'addPost'
    }, {
      url: '/api/user_posts', // 用户发布的帖子
      method: 'get',
      option: 'userPosts'
    }, {
      url: '/api/user_joins', // 用户参与的帖子
      method: 'get',
      option: 'userJoins'
    }, {
      url: '/api/update_post',
      method: 'post',
      option: 'updatePost'
    }];
  }

  // 新增帖子 
  async addPost(ctx) {
    let post = new Post(ctx.request.body);
    post.id = post.date + post.user;

    try {
      let baseDao = ctx.baseDao;
      let dbo = await ctx.mongodbUtil.dbo();
      let res = await baseDao.add(dbo, 'post', post);
      ctx.body = res;
    } catch (err) {
      ctx.status = 401;
      ctx.body = {
        message: 'some error'
      }
      throw err;
    }
  }

  // 用户参与的帖子 需要userId参数
  async userJoins(ctx) {
    let query = ctx.request.query;
    console.log(query)
    try {
      let baseDao = ctx.baseDao;
      let dbo = await ctx.mongodbUtil.dbo();
      let res = await baseDao.find(dbo, 'post', {
        jionList: { $all: [query.userId]}
      });
      ctx.body = res;
    } catch (err) {
      ctx.status = 405;
      ctx.body = {
        message: 'some err'
      }
    }
  }

  // 用户发布的帖子 需要userId参数
  async userPosts(ctx) {
    let query = ctx.request.query;
    try {
      let baseDao = ctx.baseDao;
      let dbo = await ctx.mongodbUtil.dbo();
      let res = await baseDao.find(dbo, 'post', {
        user: query.userId
      });
      ctx.body = res;
    } catch (err) {
      ctx.status = 405;
      ctx.body = {
        message: 'some err'
      }
    }
  }

  // 更新帖子
  async updatePost(ctx) {
    const post = new Post(ctx.request.body);
    try{
      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;
      ctx.body = await baseDao.update(dbo, 'post', {
        id: post.user
      }, {
        $set: post
      });

    }catch(err){
      ctx.body = {
        code: 405,
        message: 'some err'
      }
    }
  }

}
module.exports = PostResource;