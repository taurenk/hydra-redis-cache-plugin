const HydraExpressPlugin = require('hydra-express-plugin');
let RedisConnection = require('./redis-connection');

class RedisCache extends HydraExpressPlugin {

  constructor() {
    super('redis-cache');
    this.cache;
    this.serviceConfig;
  }

  async setHydraExpress(hydraExpress) {
    // called during plugin registration (WE DO NOT HAVE VALID CONFIG HERE)
    super.setHydraExpress(hydraExpress);
    this.hydraExpress.getCache = () => this.getCache();
  }

  async setConfig(serviceConfig) {
    // called before hydra initialization
    super.setConfig(serviceConfig);   
    await this.initCache();
  }

  async onServiceReady() {
    // when the service has initialized but before the hydra.init Promise resolve
  }

  getCache() {
    return this.cache;
  }

  async initCache() {
    let redisConfig = this.serviceConfig.hydra.plugins.redisCache;
    console.log('RedisCacheConfig:',redisConfig);
    let redisConnection = new RedisConnection(redisConfig);
    let client = await redisConnection.connect();
    this.cache = client;
    client
      .on('connect', ()=> {
        console.error('RedisCache: connect');
      })
      .on('reconnecting', () => {
        console.error('RedisCache: Reconnecting to Redis server');
      })
      .on('warning', (warning) => {
        console.error(`RedisCache: Warning: ${warning}`);
      })
      .on('end', () => {
        console.error('RedisCache: Redis server connection has closed');
      })
      .on('error', (error) => {
        console.error(`RedisCache: Error: ${error}`);
      });
  }
 
}

module.exports = RedisCache;