import request from 'request';
import querystring from 'querystring';
import dateFormat from 'dateformat';

const baseUrl = 'https://api.sansan.com/v1/';
const bizcardsPath = 'bizCards';
const personsPath = 'persons';
const tagsPath = 'tags';
const dateFormatTemplate = 'isoDateTime';

function _getPromisedRequeset (url, headers) {
  return new Promise((resolve, reject) => {
    request({
        url: url,
        headers: headers
      }, (error, res, body) => {
        if (error){
          reject(error);
          return;
        }
        resolve(JSON.parse(body));
      });
  });
};

class Sansan {
  constructor(apiKey, partnerId){
    if (!apiKey){
      throw new Error('apiKey is required');
    }

    this._headers = {
      'X-Sansan-Api-Key': apiKey
    };
    if (partnerId){
      this._headers['X-Sansan-App-Id'] = partnerId;
    }
  }
  getBizcards(registerdFrom, registerdTo, range = 'me', limit = 100, offset = 0) {
    if (!registerdFrom || !registerdTo){
      throw new Error('registerdFrom, registerdTo are required.');
    }

    let params = {
      registeredFrom: dateFormat(registerdFrom, dateFormatTemplate),
      registeredTo: dateFormat(registerdTo, dateFormatTemplate),
      range: range,
      limit: limit,
      offset: offset
    };
    let url = `${baseUrl}${bizcardsPath}?${querystring.stringify(params)}`;
    return _getPromisedRequeset(url, this._headers);
  }
  serachBizcards(searchConditions){
    let url = `${baseUrl}${bizcardsPath}/search?${querystring.stringify(searchConditions)}`;
    return _getPromisedRequeset(url, this._headers);
  }
  getPersonById(personId){
    if (!personId) {
      throw new Error('personId is required.');
    }
    let url = `${baseUrl}${personsPath}/${personId}`;
    return _getPromisedRequeset(url, this._headers);
  }
  getTags(range = 'me', type = 'private', limit = 100, offset = 0){
    let params = {
      range: range,
      type: type,
      limit: limit,
      offset: offset
    };
    let url = `${baseUrl}${tagsPath}?${querystring.stringify(params)}`;
    return _getPromisedRequeset(url, this._headers);
  }
}

module.exports = Sansan;
