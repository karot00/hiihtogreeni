// Hiihtogreeni – yritysryhmien hakukampanja (Eurooppa, englanti)
//
// Mitä tämä tekee:
//   1. Luo hakukampanjan "HG Search – Companies EU" (budjetti 8 €/pv, maksimoi klikkaukset, CPC-katto 3 €)
//      - 3 mainosryhmää: Offsite & Retreat, Team Trip & Kick-off, Meeting & Workshop Venue
//      - avainsanat (fraasi), negatiiviset avainsanat, 13 Euroopan maata, kielet, ma–pe 6–22
//      - responsiiviset hakumainokset, sivulinkit, huomiotekstit, rakenteinen katkelma, puhelulaajennus
//   2. Keskeyttää Performance Max -kampanjat (PAUSE_PMAX)
//   3. Luo konversiotoiminnot hiihtogreeni.fi-sivuston seurantaa varten ja tulostaa niiden tunnisteet
//
// Käyttö: Google Ads → Työkalut → Joukkotoiminnot → Skriptit → + → liitä → Valtuuta
//   → Esikatselu (ei muuta mitään, tarkistaa vain) → jos lokissa ei virheitä → Suorita.
// Kopioi Suorita-ajon lokit Claudelle: niissä on konversiotunnisteet sivuston koodiin.
// Skripti ei luo kampanjaa kahdesti: jos samanniminen kampanja on jo olemassa, se ohittaa luonnin.

var CONFIG = {
  campaignName: 'HG Search – Companies EU',
  campaignStatus: 'ENABLED',
  dailyBudgetEur: 8,
  maxCpcEur: 3,
  pausePmax: true,
  // Maat: GB, IE, DE, AT, CH, NL, BE, LU, FR, DK, SE, NO, FI
  geoTargets: [2826, 2372, 2276, 2040, 2756, 2528, 2056, 2442, 2250, 2208, 2752, 2578, 2246],
  // Kielet: en, de, fr, nl, sv, no, da, fi (käyttäjän kieliasetus, haku silti englanniksi)
  languages: [1000, 1001, 1002, 1010, 1015, 1013, 1009, 1011],
  // Arkipäivät 6–22 Helsingin aikaa (tilin aikavyöhyke)
  schedule: { days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'], startHour: 6, endHour: 22 }
};

var SITE = 'https://www.hiihtogreeni.fi';
var LANDING = SITE + '/en/companies/';

var COMMON_HEADLINES = [
  'Sleeps 28 in 14 Bedrooms',
  'Own Bathroom in Every Bedroom',
  '20-Person Meeting Room',
  'Meeting Room Incl. Whole House',
  '20 Min from Kittilä Airport',
  'Slopes 200 m Away',
  'Private Saunas & Kitchens',
  'Levi, Finnish Lapland',
  'See Free Dates & Prices',
  'Company Invoicing Available',
  'No Charge to Send a Request'
];

var COMMON_DESCRIPTIONS = [
  'The whole log house for your group: 28 beds and a private 20-person meeting room.',
  'Every bedroom has its own bathroom. Two saunas, two kitchens, slopes 200 m away.',
  '20 min from Kittilä airport. See live prices and free dates, send a request at no charge.'
];

var AD_GROUPS = [
  {
    name: 'Offsite & Retreat',
    path1: 'lapland', path2: 'offsite',
    headlines: ['Team Offsite in Lapland', 'Offsite Venue in Levi', 'Company Retreat in Lapland', 'Leadership Offsite in Levi'],
    description: 'Work in the meeting room by day, carry on over sauna and dinner in the same house.',
    keywords: [
      'lapland offsite', 'levi offsite', 'finland offsite', 'arctic offsite',
      'offsite venue finland', 'offsite venue lapland',
      'company retreat lapland', 'company retreat finland',
      'corporate retreat lapland', 'corporate retreat finland',
      'team retreat lapland', 'leadership offsite finland', 'leadership retreat lapland',
      'executive retreat lapland', 'strategy retreat finland'
    ]
  },
  {
    name: 'Team Trip & Kick-off',
    path1: 'lapland', path2: 'team-trip',
    headlines: ['Team Trip to Lapland', 'Kick-Off in Lapland', 'Team Getaway in Levi', 'Company Trip to Levi'],
    description: 'No transfers between hotel and venue: the whole team sleeps and works under one roof.',
    keywords: [
      'team building lapland', 'team building levi', 'team building finnish lapland',
      'company trip lapland', 'company trip finland lapland', 'corporate trip lapland',
      'team trip lapland', 'staff trip lapland', 'work trip lapland',
      'company getaway lapland', 'team getaway lapland',
      'kick off lapland', 'kickoff lapland', 'company kick off finland', 'corporate event lapland'
    ]
  },
  {
    name: 'Meeting & Workshop Venue',
    path1: 'levi', path2: 'meetings',
    headlines: ['Meeting Venue in Levi', 'Workshop Venue in Lapland', 'Strategy Days in Lapland', 'Board Meeting in Lapland'],
    description: 'Projector, screen and flip chart. Step out to the ski track or golf course on breaks.',
    keywords: [
      'meeting venue lapland', 'meeting venue levi', 'levi meeting room',
      'conference venue levi', 'conference venue lapland', 'levi conference',
      'workshop venue lapland', 'seminar venue lapland', 'board meeting lapland',
      'meeting retreat lapland', 'strategy day lapland',
      'meeting and accommodation lapland', 'levi meeting accommodation'
    ]
  }
];

var NEGATIVE_KEYWORDS = [
  'job', 'jobs', 'career', 'careers', 'vacancy', 'vacancies', 'recruitment', 'salary',
  'intern', 'internship', 'volunteer', 'free', 'cheap', 'hostel', 'camping', 'campsite',
  'wikipedia', 'weather', 'webcam', 'map', 'virtual', 'online', 'game', 'games', 'ideas',
  'rovaniemi', 'saariselka', 'saariselkä', 'ruka', 'yllas', 'ylläs', 'inari', 'salla',
  'pyha', 'pyhä', 'kilpisjarvi', 'kilpisjärvi', 'cruise', 'wedding', 'school', 'student',
  'students', 'kids', 'family', 'families', 'santa', 'honeymoon', 'sale'
];

var SITELINKS = [
  { text: 'For Companies', url: LANDING, d1: 'Offsites, strategy days, kick-offs', d2: 'Price examples and FAQ' },
  { text: 'Free Dates & Prices', url: SITE + '/en/rates/', d1: 'Live booking calendar', d2: 'Prices include VAT' },
  { text: 'Photo Gallery', url: SITE + '/en/photo-gallery/', d1: 'Apartments, saunas, meeting room', d2: 'Log house by the Levi slopes' },
  { text: 'Ask About Your Group', url: SITE + '/en/contact-information/', d1: 'Contact form, phone or email', d2: 'The owner replies personally' },
  { text: 'The Cabin', url: SITE + '/en/cabin/', d1: 'Two apartments for 14 each', d2: '7 bedrooms, 7 bathrooms each' }
];

var CALLOUTS = [
  'Sleeps up to 28', '20-Person Meeting Room', 'Bathroom in Every Bedroom', '200 m to the Slopes',
  '20 Min to Kittilä Airport', 'Private Saunas', 'Company Invoicing', 'Free Booking Request'
];

var SNIPPET = {
  header: 'Amenities',
  values: ['Meeting room for 20', 'Video projector', 'Saunas', 'Full kitchens', 'Wireless broadband', 'Ski maintenance room', 'Parking for 6 cars']
};

var CONVERSIONS = [
  { name: 'HG – Contact form (hiihtogreeni.fi)', category: 'SUBMIT_LEAD_FORM', primary: true },
  { name: 'HG – Phone or email click (hiihtogreeni.fi)', category: 'CONTACT', primary: true },
  { name: 'HG – Booking calendar click (hiihtogreeni.fi)', category: 'BEGIN_CHECKOUT', primary: false },
  // Varauspyyntö lähetetty hiihtogreeni.fi:n hinnoittelusivun varauskalenterista (iframe-viesti)
  { name: 'HG – Booking request sent (hiihtogreeni.fi)', category: 'SUBMIT_LEAD_FORM', primary: true }
];

// ---------------------------------------------------------------------------

function validate() {
  var errors = [];
  function check(label, text, max) {
    if (text.length > max) errors.push(label + ' liian pitkä (' + text.length + '/' + max + '): ' + text);
  }
  AD_GROUPS.forEach(function (g) {
    var hs = COMMON_HEADLINES.concat(g.headlines);
    if (hs.length > 15) errors.push(g.name + ': yli 15 otsikkoa');
    hs.forEach(function (h) { check('Otsikko', h, 30); });
    COMMON_DESCRIPTIONS.concat([g.description]).forEach(function (d) { check('Kuvaus', d, 90); });
    check('Polku', g.path1, 15); check('Polku', g.path2, 15);
    g.keywords.forEach(function (k) { if (k.split(' ').length > 10) errors.push('Avainsana liian pitkä: ' + k); });
  });
  SITELINKS.forEach(function (s) { check('Sivulinkki', s.text, 25); check('Sivulinkin kuvaus', s.d1, 35); check('Sivulinkin kuvaus', s.d2, 35); });
  CALLOUTS.forEach(function (c) { check('Huomioteksti', c, 25); });
  SNIPPET.values.forEach(function (v) { check('Katkelma', v, 25); });
  if (errors.length) throw new Error('Tarkistus epäonnistui:\n' + errors.join('\n'));
}

function query(q) {
  var rows = [];
  var it = AdsApp.search(q);
  while (it.hasNext()) rows.push(it.next());
  return rows;
}

function report(title, results) {
  var ok = 0, failed = [];
  results.forEach(function (r) {
    if (r.isSuccessful()) ok++;
    else failed.push(r.getErrorMessages().join('; '));
  });
  Logger.log(title + ': ' + ok + ' onnistui, ' + failed.length + ' epäonnistui');
  failed.forEach(function (f) { Logger.log('  VIRHE: ' + f); });
  return failed.length === 0;
}

function buildCampaignOperations(cid) {
  var tmp = -1;
  function nextId() { return tmp--; }
  var ops = [];

  var budgetRn = 'customers/' + cid + '/campaignBudgets/' + nextId();
  ops.push({ campaignBudgetOperation: { create: {
    resourceName: budgetRn,
    name: CONFIG.campaignName + ' budget',
    amountMicros: String(CONFIG.dailyBudgetEur * 1000000),
    deliveryMethod: 'STANDARD',
    explicitlyShared: false
  } } });

  var campaignRn = 'customers/' + cid + '/campaigns/' + nextId();
  ops.push({ campaignOperation: { create: {
    resourceName: campaignRn,
    name: CONFIG.campaignName,
    // Luodaan keskeytettynä; käynnistetään vasta kun maat ja kielet on lisätty (ensureTargeting).
    status: 'PAUSED',
    advertisingChannelType: 'SEARCH',
    campaignBudget: budgetRn,
    targetSpend: { cpcBidCeilingMicros: String(CONFIG.maxCpcEur * 1000000) },
    networkSettings: {
      targetGoogleSearch: true,
      targetSearchNetwork: false,
      targetContentNetwork: false,
      targetPartnerSearchNetwork: false
    },
    geoTargetTypeSetting: { positiveGeoTargetType: 'PRESENCE', negativeGeoTargetType: 'PRESENCE' },
    containsEuPoliticalAdvertising: 'DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING'
  } } });

  function criterion(body) {
    body.campaign = campaignRn;
    ops.push({ campaignCriterionOperation: { create: body } });
  }
  // Maat ja kielet lisätään erikseen ensureTargeting-vaiheessa: API ei hyväksy niitä
  // väliaikaisella kampanjatunnisteella (resourceName-ristiriita).
  CONFIG.schedule.days.forEach(function (day) {
    criterion({ adSchedule: { dayOfWeek: day, startHour: CONFIG.schedule.startHour, startMinute: 'ZERO', endHour: CONFIG.schedule.endHour, endMinute: 'ZERO' } });
  });
  NEGATIVE_KEYWORDS.forEach(function (k) { criterion({ negative: true, keyword: { text: k, matchType: 'BROAD' } }); });

  AD_GROUPS.forEach(function (g) {
    var agRn = 'customers/' + cid + '/adGroups/' + nextId();
    ops.push({ adGroupOperation: { create: {
      resourceName: agRn, name: g.name, campaign: campaignRn, status: 'ENABLED', type: 'SEARCH_STANDARD'
    } } });
    g.keywords.forEach(function (k) {
      ops.push({ adGroupCriterionOperation: { create: {
        adGroup: agRn, status: 'ENABLED', keyword: { text: k, matchType: 'PHRASE' }
      } } });
    });
    ops.push({ adGroupAdOperation: { create: {
      adGroup: agRn,
      status: 'ENABLED',
      ad: {
        finalUrls: [LANDING],
        responsiveSearchAd: {
          headlines: COMMON_HEADLINES.concat(g.headlines).map(function (t) { return { text: t }; }),
          descriptions: COMMON_DESCRIPTIONS.concat([g.description]).map(function (t) { return { text: t }; }),
          path1: g.path1,
          path2: g.path2
        }
      }
    } } });
  });

  function asset(body, fieldType) {
    var rn = 'customers/' + cid + '/assets/' + nextId();
    body.resourceName = rn;
    ops.push({ assetOperation: { create: body } });
    ops.push({ campaignAssetOperation: { create: { campaign: campaignRn, asset: rn, fieldType: fieldType } } });
  }
  SITELINKS.forEach(function (s) {
    asset({ finalUrls: [s.url], sitelinkAsset: { linkText: s.text, description1: s.d1, description2: s.d2 } }, 'SITELINK');
  });
  CALLOUTS.forEach(function (c) { asset({ calloutAsset: { calloutText: c } }, 'CALLOUT'); });
  asset({ structuredSnippetAsset: { header: SNIPPET.header, values: SNIPPET.values } }, 'STRUCTURED_SNIPPET');

  // Olemassa oleva puhelulaajennus (sama numero kuin Performance Maxissa)
  query("SELECT asset.resource_name FROM asset WHERE asset.type = 'CALL'").slice(0, 1).forEach(function (row) {
    ops.push({ campaignAssetOperation: { create: { campaign: campaignRn, asset: row.asset.resourceName, fieldType: 'CALL' } } });
  });

  return ops;
}

function findCampaign() {
  var rows = query("SELECT campaign.resource_name, campaign.status FROM campaign WHERE campaign.name = '" + CONFIG.campaignName + "' AND campaign.status != 'REMOVED'");
  return rows.length ? rows[0].campaign : null;
}

function createCampaign(cid) {
  if (findCampaign()) {
    Logger.log('Kampanja "' + CONFIG.campaignName + '" on jo olemassa, luontia ei tehdä uudelleen.');
    return;
  }
  var ops = buildCampaignOperations(cid);
  Logger.log('Luodaan kampanja (keskeytettynä): ' + ops.length + ' operaatiota (kaikki tai ei mitään).');
  report('Hakukampanja', AdsApp.mutateAll(ops, { partialFailure: false }));
}

// Lisää puuttuvat maat ja kielet olemassa olevaan kampanjaan ja käynnistää kampanjan,
// kun kohdennus on valmis. Voi ajaa uudelleen: lisää vain puuttuvat.
function ensureTargeting(preview) {
  var campaign = findCampaign();
  if (!campaign) {
    Logger.log(preview
      ? 'ESIKATSELU: maat (' + CONFIG.geoTargets.length + ') ja kielet (' + CONFIG.languages.length + ') lisätään Suorita-ajossa, kun kampanja on luotu.'
      : 'VIRHE: kampanjaa ei löytynyt, maita ja kieliä ei lisätty.');
    return;
  }
  var have = {};
  query("SELECT campaign_criterion.location.geo_target_constant, campaign_criterion.language.language_constant FROM campaign_criterion WHERE campaign.resource_name = '" + campaign.resourceName + "' AND campaign_criterion.type IN ('LOCATION', 'LANGUAGE')")
    .forEach(function (r) {
      var c = r.campaignCriterion;
      if (c.location) have[c.location.geoTargetConstant] = true;
      if (c.language) have[c.language.languageConstant] = true;
    });
  var ops = [];
  CONFIG.geoTargets.forEach(function (id) {
    var g = 'geoTargetConstants/' + id;
    if (!have[g]) ops.push({ campaignCriterionOperation: { create: { campaign: campaign.resourceName, location: { geoTargetConstant: g } } } });
  });
  CONFIG.languages.forEach(function (id) {
    var l = 'languageConstants/' + id;
    if (!have[l]) ops.push({ campaignCriterionOperation: { create: { campaign: campaign.resourceName, language: { languageConstant: l } } } });
  });
  if (!ops.length) { Logger.log('Maat ja kielet ovat jo paikallaan.'); return; }

  var ok = report('Maat ja kielet', AdsApp.mutateAll(ops, { partialFailure: false }));
  if (!ok) { Logger.log('Kampanja jätetään keskeytetyksi, koska kohdennus ei onnistunut.'); return; }
  if (CONFIG.campaignStatus === 'ENABLED' && campaign.status === 'PAUSED') {
    report('Kampanjan käynnistys', AdsApp.mutateAll([{ campaignOperation: {
      update: { resourceName: campaign.resourceName, status: 'ENABLED' }, updateMask: 'status'
    } }], { partialFailure: false }));
  }
}

function pausePmax(cid) {
  if (!CONFIG.pausePmax) return;
  var rows = query("SELECT campaign.resource_name, campaign.name FROM campaign WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX' AND campaign.status = 'ENABLED'");
  if (!rows.length) { Logger.log('Ei käynnissä olevia Performance Max -kampanjoita.'); return; }
  var ops = rows.map(function (r) {
    Logger.log('Keskeytetään: ' + r.campaign.name);
    return { campaignOperation: { update: { resourceName: r.campaign.resourceName, status: 'PAUSED' }, updateMask: 'status' } };
  });
  report('Performance Max -keskeytys', AdsApp.mutateAll(ops, { partialFailure: true }));
}

function createConversions(cid) {
  var existing = {};
  query("SELECT conversion_action.name FROM conversion_action WHERE conversion_action.status != 'REMOVED'")
    .forEach(function (r) { existing[r.conversionAction.name] = true; });
  var ops = CONVERSIONS.filter(function (c) { return !existing[c.name]; }).map(function (c) {
    return { conversionActionOperation: { create: {
      name: c.name,
      type: 'WEBPAGE',
      category: c.category,
      status: 'ENABLED',
      countingType: 'ONE_PER_CLICK',
      primaryForGoal: c.primary,
      clickThroughLookbackWindowDays: '60',
      valueSettings: { defaultValue: 0, alwaysUseDefaultValue: false }
    } } };
  });
  if (ops.length) report('Konversiotoiminnot', AdsApp.mutateAll(ops, { partialFailure: true }));
  else Logger.log('Konversiotoiminnot ovat jo olemassa.');

  Logger.log('=== KONVERSIOTUNNISTEET (anna nämä Claudelle) ===');
  query("SELECT conversion_action.name, conversion_action.tag_snippets FROM conversion_action WHERE conversion_action.name LIKE 'HG – %'")
    .forEach(function (r) {
      var snippets = r.conversionAction.tagSnippets || [];
      var text = snippets.map(function (s) { return (s.eventSnippet || '') + ' ' + (s.globalSiteTag || ''); }).join(' ');
      var sendTo = text.match(/AW-\d+\/[A-Za-z0-9_-]+/);
      Logger.log(r.conversionAction.name + ' → ' + (sendTo ? sendTo[0] : '(tunniste näkyy vasta Suorita-ajon jälkeen)'));
    });
}

function main() {
  validate();
  var cid = AdsApp.currentAccount().getCustomerId().replace(/-/g, '');
  var preview = AdsApp.getExecutionInfo().isPreview();
  Logger.log(preview ? 'ESIKATSELU: mitään ei muuteta.' : 'SUORITUS: muutokset tehdään.');
  createCampaign(cid);
  ensureTargeting(preview);
  pausePmax(cid);
  createConversions(cid);
  Logger.log('Valmis.');
}
