// Responses in the shape of cabins.levifinland.fi /api/v1/hiihtogreeni (2026-10-25).

export const PRICING_JSON = {
  currency: "EUR",
  prices_include_vat: true,
  base_rate: {
    note: "Nights outside the seasons below",
    apartment_a: { weekly_eur: 3500, nightly_eur: 575 },
    apartment_b: { weekly_eur: 3500, nightly_eur: 575 },
  },
  seasons: [
    {
      name: "Alkutalvi",
      first_night: "2026-11-01",
      last_night: "2026-11-30",
      apartment_a: { weekly_eur: 3070, nightly_eur: 570 },
      apartment_b: { weekly_eur: 3070, nightly_eur: 570 },
    },
    {
      name: "Joulu ja uusivuosi",
      first_night: "2026-12-17",
      last_night: "2027-01-06",
      apartment_a: { weekly_eur: 4940, nightly_eur: 990 },
      apartment_b: { weekly_eur: 5040, nightly_eur: 990 },
    },
    {
      name: "Unpriced",
      first_night: "2027-04-01",
      last_night: "2027-04-30",
      apartment_a: { weekly_eur: null, nightly_eur: null },
      apartment_b: { weekly_eur: 3000, nightly_eur: 500 },
    },
  ],
  extras: {
    final_cleaning_per_apartment_eur: 290,
    bed_linen_and_towels_per_guest_eur: 16,
    made_up_beds_per_guest_eur: 9,
    conference_room_per_stay_eur: 250,
    maintenance_room_per_stay_eur: 250,
  },
  rules: { min_nights: 3, max_nights: null, check_in_from: "17:00", check_out_by: "11:00" },
  last_minute: { percent: 20, arrivals_from: "2026-10-25", arrivals_until: "2026-11-24" },
};

type Status = "available" | "unavailable" | "past";
const night = (date: string, a: Status, b: Status) => ({
  date,
  saturday: new Date(`${date}T00:00:00Z`).getUTCDay() === 6,
  apartment_a: a === "available" ? { status: a, nightly_eur: 570, weekly_eur: 3070 } : { status: a },
  apartment_b: b === "available" ? { status: b, nightly_eur: 570, weekly_eur: 3070 } : { status: b },
  conference_room: "available",
  maintenance_room: "available",
});

/**
 * Ten nights from Sat 21.11.2026: A is taken 23.–24.11., B on 26.11.;
 * so the whole house is free 21.–23.11. (2 nights) and 27.–1.12. (open end).
 */
export const AVAILABILITY_JSON = {
  today: "2026-11-21",
  nights: [
    night("2026-11-21", "available", "available"),
    night("2026-11-22", "available", "available"),
    night("2026-11-23", "unavailable", "available"),
    night("2026-11-24", "unavailable", "available"),
    night("2026-11-25", "available", "available"),
    night("2026-11-26", "available", "unavailable"),
    night("2026-11-27", "available", "available"),
    night("2026-11-28", "available", "available"),
    night("2026-11-29", "available", "available"),
    night("2026-11-30", "available", "available"),
  ],
};
