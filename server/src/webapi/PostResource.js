const environment = require('../config/environment')
const User = require('../domain/User')
const Post = require('../domain/Post')

class PostResource {
  constructor() {
    this.path = [{
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
    }, {
      url: '/api/posts',
      method: 'get',
      option: 'getAllPosts'
    }, {
      url: '/api/post',
      method: 'get',
      option: 'getPostById' //根据postId 获取post
    }];
  }


  /**
   * 获取所有posts
   * @param {*} ctx 
   */
  async getAllPosts(ctx){
    //let query = ctx.request.query;
    try {
      let baseDao = ctx.baseDao;
      let dbo = await ctx.mongodbUtil.dbo();
      let res = await baseDao.find(dbo, 'post', {});

      for(let index = 0;index<res.length;index++){
        let user = await baseDao.find(dbo, 'user', {
          id: res[index].user
        });
        res[index].user = user;
      }

      ctx.body = res;
    } catch (err) {
      ctx.status = 405;
      ctx.body = {
        message: 'some err'
      }
    }
  }

  /**
   * 根据postid得到post的详细信息
   * @param {} ctx 
   */
  async getPostById(ctx){
    let query = ctx.request.query;
    try {
      let baseDao = ctx.baseDao;
      let dbo = await ctx.mongodbUtil.dbo();
      let res = await baseDao.find(dbo, 'post', {id: query.id});
      if(res.length>0){
        let post = res[0];
        for(let index = 0;index<post.joinList.length;index++){
          let user = await baseDao.find(dbo, 'user', {
            id: post.joinList[index]
          });
          post.joinList[index] = user;
        }
        ctx.body = post;
      }else{
        ctx = {};
      }
  
    } catch (err) {
      ctx.status = 405;
      console.log(err)
      ctx.body = {
        message: 'some err'
      }
    }
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
        message: 'some err'
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
        joinList: {
          $all: [query.userId]
        }
      });

      console.log(res)
      for(let postIndex=0;postIndex<res.length;postIndex++){
        for(let index =0; index<res[postIndex].joinList.length;index++){
          let user = await baseDao.find(dbo, 'user', {
            id: res[postIndex].joinList[index]
          });
          res[postIndex].joinList[index] = user;
        }
      }


      ctx.body = res;
    } catch (err) {
      ctx.status = 405;
      console.log(err)
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

      for(let postIndex=0;postIndex<res.length;postIndex++){
        for(let index =0; index<res[postIndex].joinList.length;index++){
          let user = await baseDao.find(dbo, 'user', {
            id: res[postIndex].joinList[index]
          });
          res[postIndex].joinList[index] = user;
        }
      }
      ctx.body = res;
    } catch (err) {
      ctx.status = 405;
      ctx.body = {
        message: 'some err'
      }
    }
  }

  // 更新帖子 更新帖子时，joinList一定要为user的id的list，不要传为user实体的List
  async updatePost(ctx) {
    const post = new Post(ctx.request.body);
    try {
      let dbo = await ctx.mongodbUtil.dbo();
      let baseDao = ctx.baseDao;

      ctx.body = await baseDao.update(dbo, 'post', {
        id: post.user
      }, {
        $set: post
      });

    } catch (err) {
      ctx.body = {
        code: 405,
        message: 'some err'
      }
    }
  }

}
module.exports = PostResource;