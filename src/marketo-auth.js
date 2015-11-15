var querystring = require('querystring'),
  request = require('request');

function MarketoAuth (identityEndPoint, clientId, clientSeacret) {
  this._identityEndPoint = identityEndPoint;
  this._clientId = clientId;
  this._clientSeacret = clientSeacret;
};

MarketoAuth.prototype.getAccessToken = () => {
  return new Promise((resolve) => {
    var params = querystring.stringify({
      grant_type: 'client_credentials',
      client_id: this._clientId,
      client_secret: this._clientSeacret
    });

    request(
      `${this._identityEndPoint}oauth/token?${params}`,
      (e, res, body) => {
        if (e){
          console.log(e);
          return;
        }
        resolve(body);
      }
    );
  });
};

module.exports = MarketoAuth;
