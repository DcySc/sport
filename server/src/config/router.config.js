const UserResource = require('../webapi/UserResource')
const PostResource = require('../webapi/PostResource')

const userResource = new UserResource()
const postResource = new PostResource()
const resources = [
  userResource,postResource
];

module.exports = function configRouter(router) {
  resources.forEach(resource => {
    resource.path.forEach(path => {
      console.log(path.method)
      router[path.method](path.url, async (ctx) => {
        await resource[path.option](ctx);
      })
    })
  })
}