const env = process.env.NODE_ENV;
const common = {
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
    baseUrl: 'http://202.120.1.152:3003/api',
    mongodb: {
      host: '127.0.0.1',
      database: 'jpp',
    }
  },
};

export default Object.assign(common, config[env]);
