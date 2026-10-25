import { test } from "node:test";
import assert from "node:assert/strict";

import { ACCOMMODATION_ID, ORGANIZATION_ID, buildFaqJsonLd, buildJsonLd, buildLodging } from "../src/lib/structured-data.ts";
import { CAPACITY, MAINTENANCE_CONTACT, RENTAL_CONTACT, STAY_TIMES, bookingPageUrl } from "../src/content/shared.ts";
import { fiCabinSections, fiRatesSections } from "../src/content/fi.ts";
import { enCabinSections, enRatesSections } from "../src/content/en.ts";

const lodging = buildLodging;

test("the site graph holds the owner and the cabin under stable ids", () => {
  const ids = buildJsonLd("fi")["@graph"].map((node) => node["@id"]);
  assert.deepEqual(ids, [ORGANIZATION_ID, ACCOMMODATION_ID]);
});

test("the accommodation is a LodgingBusiness with the stay times, rooms and owner", () => {
  for (const lang of ["fi", "en"] as const) {
    const node = lodging(lang);
    assert.equal(node["@type"], "LodgingBusiness");
    assert.equal(node.checkinTime, `${STAY_TIMES.checkIn}:00`);
    assert.equal(node.checkoutTime, `${STAY_TIMES.checkOut}:00`);
    assert.equal(node.numberOfRooms, CAPACITY.bedrooms * CAPACITY.apartments);
    assert.deepEqual(node.parentOrganization, { "@id": ORGANIZATION_ID });
    assert.equal(node.telephone, RENTAL_CONTACT.phone);
  }
});

test("apartments A and B carry the per-apartment capacity; pets only in A", () => {
  for (const [lang, cabin] of [["fi", fiCabinSections], ["en", enCabinSections]] as const) {
    const [a, b] = lodging(lang).containsPlace;
    assert.deepEqual([a.name, b.name], [...cabin.apartmentNames]);
    for (const apt of [a, b]) {
      assert.equal(apt["@type"], "Apartment");
      assert.equal(apt.occupancy.maxValue, CAPACITY.guestsPerApartment);
      assert.equal(apt.numberOfBedrooms, CAPACITY.bedrooms);
    }
    assert.equal(a.petsAllowed, true);
    assert.ok(!("petsAllowed" in b));
  }
});

test("amenities are the visible kitchen and living-room list in the page language", () => {
  assert.deepEqual(lodging("fi").amenityFeature.map((f) => f.name), [...fiCabinSections.livingKitchen]);
  assert.deepEqual(lodging("en").amenityFeature.map((f) => f.name), [...enCabinSections.livingKitchen]);
});

test("ReserveAction points at the booking calendar in the page language", () => {
  assert.equal(lodging("fi").potentialAction.target.urlTemplate, bookingPageUrl("fi"));
  assert.equal(lodging("en").potentialAction.target.urlTemplate, bookingPageUrl("en"));
});

test("no prices, ratings or click-to-load emails until there is a real source", () => {
  for (const lang of ["fi", "en"] as const) {
    const json = JSON.stringify(buildJsonLd(lang));
    for (const key of ["priceRange", "offers", "AggregateOffer", "aggregateRating", "review"]) {
      assert.ok(!json.includes(`"${key}"`) && !json.includes(`"${key}`), key);
    }
    assert.ok(!json.includes(RENTAL_CONTACT.email));
    assert.ok(!json.includes(MAINTENANCE_CONTACT.email));
  }
});

test("the rates FAQ JSON-LD is the visible FAQ, with the stay times, in both languages", () => {
  assert.equal(fiRatesSections.faq.length, enRatesSections.faq.length);
  for (const faq of [fiRatesSections.faq, enRatesSections.faq]) {
    const data = buildFaqJsonLd(faq);
    assert.equal(data["@type"], "FAQPage");
    assert.deepEqual(data.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]), faq.map((it) => [it.q, it.a]));
  }
  assert.ok(fiRatesSections.faq.some((it) => it.a.includes("klo 17.00") && it.a.includes("klo 11.00")));
  assert.ok(enRatesSections.faq.some((it) => it.a.includes(STAY_TIMES.checkIn) && it.a.includes(STAY_TIMES.checkOut)));
});
