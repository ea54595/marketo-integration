import querystring from 'querystring';
import request from 'request';

var apiVersion = 'v1';

class Marketo {
  constructor(restEndPoint, identityEndPoint, clientId, clientSeacret) {
    this._restEndPoint = restEndPoint;
    this._identityEndPoint = identityEndPoint;
    this._clientId = clientId;
    this._clientSeacret = clientSeacret;
  }
  getAccessToken () {
    var params = querystring.stringify({
      grant_type: 'client_credentials',
      client_id: this._clientId,
      client_secret: this._clientSeacret
    });

    return new Promise((resolve, reject) => {
      request(
        `${this._identityEndPoint}oauth/token?${params}`,
        (error, res, body) => {
          if (error){
            reject(error);
          }
          resolve(JSON.parse(body));
        }
      );
    });
  }
  setAccessToken (accessToken) {
    this._accessToken = accessToken;
  }
  createLeads (leadInputs) {
    console.log(leadInputs);
    if (!this._accessToken){
      console.log('AccessToken is not set. Please getAccessToken.');
      return;
    }

    return new Promise((resolve, reject) =>{
      request.post({
        json: true,
        url: `${this._restEndPoint}v1/leads.json`,
        headers: {
          Authorization: `bearer ${this._accessToken}`,
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: {
          input: leadInputs
        }
      }, (err, res, body) => {
        if (err){
          console.log(err.body);
          reject(err);
          return;
        }
        console.log(res.body);
        resolve(body);
      });
    });
  }
  getLeads () {
    if (!this._accessToken){
      console.log('AccessToken is not set. Please getAccessToken.');
      return;
    }
    var params = {filterType: 'id', filterValues: 28};
    return new Promise((resolve, reject) => {
      request({
        url: `${this._restEndPoint}/v1/leads.json?${querystring.stringify(params)}`,
        headers: {
          Authorization: `bearer ${this._accessToken}`
        }
      }, (err, res, body) => {
        if (err) reject(err);
        resolve(body);
      });
    });
  }
}

module.exports = Marketo;
