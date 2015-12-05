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
  leadCandidates.forEach((bizCard)=>{
    leads.push({
      lastName: bizCard.lastName,
      firstName: bizCard.firstName,
      email: bizCard.email
    });
  });

  let createdResult = await marketo.createLeads(leads);
  console.log(createdResult);
})();
