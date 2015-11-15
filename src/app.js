require('babel/polyfill');

var config = require('../config'),
  co = require('co'),
  MarketoAuth = require('../lib/marketo-auth'),
  Sansan = require('../lib/Sansan');

var marketoAuth = new MarketoAuth(
  config.identityEndPoint,
  config.clientId,
  config.clientSeacret);
var sansan = new Sansan(config.sansanApiKey);

co(function *(){
  var bizCards = yield sansan.getBizcards(
    new Date('2015-1-1'),
    new Date('2015-2-1')
  );
  var auth = yield marketoAuth.getAccessToken();
  var token = auth.access_token;
});