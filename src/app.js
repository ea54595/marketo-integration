import 'babel-polyfill';

import config from '../config';
import Marketo from '../lib/marketo';
import Sansan from '../lib/sansan';

var marketo = new Marketo(
  config.marketo.restEndPoint,
  config.marketo.identityEndPoint,
  config.marketo.clientId,
  config.marketo.clientSeacret);
var sansan = new Sansan(config.sansanApiKey);

(async () => {
  let token = await marketo.getAccessToken();
  marketo.setAccessToken(token.access_token);

  var leadCandidates = [];
  while(true){
    let bizCards = await sansan.getBizcards(new Date('2011-01-1'), new Date('2015-11-1'));
    leadCandidates = leadCandidates.concat(bizCards.data);
    if (bizCards.hasMore) continue;
    break;
  }
  let leads = [];
  leadCandidates.forEach((bizCard) => {
    if (bizCard.lastName) return;

    leads.push({
      bizCardid__c: bizCard.id,
      lastName: bizCard.lastName,
      firstName: bizCard.firstName,
      email: bizCard.email,
      company: bizCard.companyName,
      division__c: bizCard.departmentName,
      title: bizCard.title,
      phone: bizCard.tel,
      mobilePhone: bizCard.mobile,
      fax: bizCard.fax,
      postalCode: bizCard.postalCode,
      state: bizCard.prefecture,
      city: bizCard.city,
      location__c: bizCard.street + bizCard.building,
      website: bizCard.url,
      exchengedDate__c: bizCard.exchangeDate,
      insideSales__c: bizCard.owner.name
    });
  });

  let responce = await marketo.createLeads(leads);
  responce.result.forEach((res) => {
    console.log(`status: ${res.status}`);
  });
})();
