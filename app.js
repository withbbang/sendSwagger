'use strict';

const SwaggerExpress = require('swagger-express-mw');
const SwaggerUi = require('swagger-tools/middleware/swagger-ui')
const app = require('express')();
const bodyParser = require("body-parser").json({limit : '50mb', extended : true})
const cors = require("cors");

app.use(cors());

module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers:{
    api_key: function(req, authOrSecDef, scopesOrApiKey, cb){
      //첫번째 인자 : 어디서 온지 모를 req
      //두번째 인자 : yaml파일에서 정의한 apiKey 정보
      //세번재 인자 : 입력값으로 들어온 apiKey value
      //네번재 인자 : 콜백함수
      if('my_key' === scopesOrApiKey){
        cb();
      }
      else{
        cb(new Error('Accecc Denied'))
      }
    },/* 
    api_id: function(req, authOrSecDef, scopesOrApiKey, cb){
      if('my_id' === scopesOrApiKey){
        cb();
      }
      else{
        cb(new Error('Access Denied'))
      }
    } */
  }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  swaggerExpress.runner.swagger.host='localhost:8000'
  app.use(SwaggerUi(swaggerExpress.runner.swagger))
  swaggerExpress.register(app);

  const port = process.env.PORT || '8000';
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
