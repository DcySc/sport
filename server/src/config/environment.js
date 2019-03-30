const environment = {
  port: 8087,
  mongodbUrl: 'mongodb://47.100.166.151:27017',
  dbname: 'sport',
  allowOrigins: {
    'http://localhost:8100': 'client1'
  },
  secret: 'registration_system'
}
module.exports = environment