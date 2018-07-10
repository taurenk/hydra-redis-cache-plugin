const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = hydraExpress.getHydra().getServerResponseHelper();
let serverResponse = new ServerResponse();

let api = express.Router();

api.get('',  function(req, res) {
  let healthInfo = hydra.getHealth();

  
  serverResponse.sendOk(res, {
    result: healthInfo
  });
});


module.exports = api;