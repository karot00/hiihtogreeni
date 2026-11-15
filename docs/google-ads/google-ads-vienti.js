// Hiihtogreeni – Google Ads -tilin vienti (VAIN LUKU, ei muuta mitään)
// Google Ads → Työkalut → Joukkotoiminnot → Skriptit → + → liitä tämä → Valtuuta → Esikatsele.
// Kopioi lopuksi "Lokit"-välilehden koko sisältö Claudelle.

function main() {
  var Q = [
    ['TILI', "SELECT customer.descriptive_name, customer.currency_code, customer.time_zone, customer.auto_tagging_enabled FROM customer"],
    ['KAMPANJAT', "SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type, campaign.bidding_strategy_type, campaign_budget.amount_micros, campaign.network_settings.target_search_network, campaign.network_settings.target_content_network, campaign.network_settings.target_partner_search_network, campaign.geo_target_type_setting.positive_geo_target_type, campaign.start_date, campaign.end_date FROM campaign WHERE campaign.status != 'REMOVED'"],
    ['KAMPANJA_TULOKSET_30PV', "SELECT campaign.name, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.search_impression_share FROM campaign WHERE campaign.status != 'REMOVED' AND segments.date DURING LAST_30_DAYS"],
    ['KAMPANJA_KRITEERIT', "SELECT campaign.name, campaign_criterion.type, campaign_criterion.negative, campaign_criterion.bid_modifier, campaign_criterion.location.geo_target_constant, campaign_criterion.proximity.radius, campaign_criterion.language.language_constant, campaign_criterion.keyword.text, campaign_criterion.keyword.match_type, campaign_criterion.ad_schedule.day_of_week, campaign_criterion.ad_schedule.start_hour, campaign_criterion.ad_schedule.end_hour, campaign_criterion.device.type FROM campaign_criterion WHERE campaign.status != 'REMOVED'"],
    ['MAINOSRYHMAT', "SELECT campaign.name, ad_group.name, ad_group.status, ad_group.type, ad_group.cpc_bid_micros FROM ad_group WHERE ad_group.status != 'REMOVED'"],
    ['AVAINSANAT', "SELECT campaign.name, ad_group.name, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.negative, ad_group_criterion.status, ad_group_criterion.quality_info.quality_score FROM ad_group_criterion WHERE ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.status != 'REMOVED'"],
    ['MAINOKSET', "SELECT campaign.name, ad_group.name, ad_group_ad.status, ad_group_ad.ad.type, ad_group_ad.ad.final_urls, ad_group_ad.ad.responsive_search_ad.headlines, ad_group_ad.ad.responsive_search_ad.descriptions, ad_group_ad.ad.responsive_search_ad.path1, ad_group_ad.ad.responsive_search_ad.path2, ad_group_ad.policy_summary.approval_status, ad_group_ad.ad_strength FROM ad_group_ad WHERE ad_group_ad.status != 'REMOVED'"],
    ['ASSET_GROUPS_PMAX', "SELECT campaign.name, asset_group.name, asset_group.status, asset_group.final_urls FROM asset_group WHERE asset_group.status != 'REMOVED'"],
    ['KAMPANJA_LAAJENNUKSET', "SELECT campaign.name, campaign_asset.field_type, asset.type, asset.final_urls, asset.sitelink_asset.link_text, asset.sitelink_asset.description1, asset.sitelink_asset.description2, asset.callout_asset.callout_text, asset.structured_snippet_asset.header, asset.structured_snippet_asset.values FROM campaign_asset WHERE campaign_asset.status != 'REMOVED'"],
    ['TILI_LAAJENNUKSET', "SELECT customer_asset.field_type, asset.type, asset.final_urls, asset.sitelink_asset.link_text, asset.callout_asset.callout_text FROM customer_asset WHERE customer_asset.status != 'REMOVED'"],
    ['KONVERSIOT', "SELECT conversion_action.name, conversion_action.status, conversion_action.type, conversion_action.category, conversion_action.primary_for_goal, conversion_action.include_in_conversions_metric FROM conversion_action WHERE conversion_action.status != 'REMOVED'"],
    ['HAKUTERMIT_30PV', "SELECT campaign.name, search_term_view.search_term, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM search_term_view WHERE segments.date DURING LAST_30_DAYS ORDER BY metrics.impressions DESC LIMIT 200"]
  ];
  for (var i = 0; i < Q.length; i++) {
    Logger.log('=== ' + Q[i][0] + ' ===');
    try {
      var it = AdsApp.search(Q[i][1]);
      var n = 0;
      while (it.hasNext()) { Logger.log(JSON.stringify(it.next())); n++; }
      if (n === 0) Logger.log('(ei rivejä)');
    } catch (e) {
      Logger.log('VIRHE: ' + e);
    }
  }
}
