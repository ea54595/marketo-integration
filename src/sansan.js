var request = require('request'),
  querystring = require('querystring'),
  baseUrl = 'https://api.sansan.com/v1/',
  bizcardsPath = 'bizCards';

function Sansan (apiKey){
  this._headers = {
    'X-Sansan-Api-Key': apiKey
  };
};

Sansan.prototype.getBizcards = (registerdFrom, registerdTo, range, limit, offset) =>{
  return new Promise(resolve =>{
    var params = {
      registerdTo: registerdTo,
      registerdFrom: registerdFrom
    };
    params.range = range || 'me';
    params.limit = limit || 100;
    params.offset = offset || 0;

    request({
      url: `${baseUrl}${bizcardsPath}${querystring.stringify()}`,
      headers: this._headers
    }, (error, res, body) => {
      if (error){
        console.log(error);
      }
      resolve(body);
    });
  });
};

module.exports = Sansan;
