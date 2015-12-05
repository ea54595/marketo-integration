import request from 'request';
import querystring from 'querystring';
import dateFormat from 'dateformat';

var baseUrl = 'https://api.sansan.com/v1/';
var bizcardsPath = 'bizCards';
var dateFormatTemplate = 'isoDateTime';

class Sansan {
  constructor(apiKey){
    this._headers = {
      'X-Sansan-Api-Key': apiKey
    };
  }
  getBizcards(registerdFrom, registerdTo, range = 'me', limit = 100, offset = 0) {
    var params = {
      registeredFrom: dateFormat(registerdFrom, dateFormatTemplate),
      registeredTo: dateFormat(registerdTo, dateFormatTemplate),
      range: range,
      limit: limit,
      offset: offset
    };

    return new Promise((resolve, reject) => {
      request({
        url: `${baseUrl}${bizcardsPath}?${querystring.stringify(params)}`,
        headers: this._headers
      }, (error, res, body) => {
        if (error){
          reject(error);
        }
        resolve(JSON.parse(body));
      });
    });
  }
};

module.exports = Sansan;
