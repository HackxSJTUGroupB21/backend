const env = process.env.NODE_ENV;
const common = {
  auth: {
    client_id: 'dfb56c8d0912d89aea',
    client_secret: 'ab197c24935f49b6ba90e3b0abf0f4bb',
    kdt_id: '14551413',
    grant_type: 'silent',
    url: 'https://open.youzan.com/oauth/token',
  },
// 服务器主机
  host: 'https://open.youzan.com/api/oauthentry',
  baseUrl: 'http://localhost:3000',
};
const config = {
  develop: {
    port: 3000,
    baseUrl: 'http://127.0.0.1:3000',
    mongodb: {
      host: '127.0.0.1',
      database: 'jpp',
    }
  },
  production: {
    port: 3000,
    baseUrl: 'http://127.0.0.1:3000',
    mongodb: {
      host: '127.0.0.1',
      database: 'jpp',
    }
  },
};

export default Object.assign(common, config[env]);
