

async function start() {
  try {
  
    const hydraExpress = require('hydra-express');    
    const RedisCachePlugin = require('./redis-cache-plugin/index');
    hydraExpress.use(new RedisCachePlugin());

    let serviceInfo = await hydraExpress.init('./config/config.json', () => {
      hydraExpress.registerRoutes({
        '/v1/test/': require('./routes/v1-test-api')
      });
    });
    
    hydraExpress.log('info', serviceInfo);
    console.log('hydraExpress.cache => ', hydraExpress.getCache().address );
    
    hydraExpress.getCache().set('test-service-3', 'test', (err, result) => {
      console.log('redisdb err', err);
      console.log('redisdb result', result);
    });

   
  } catch (error) {
    console.log(error);
  }  
}

start();
