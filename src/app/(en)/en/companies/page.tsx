import { CompaniesPage } from "../../../../components/CompaniesPage.tsx";
import { enCompanies } from "../../../../content/en.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "en",
  key: "companies",
  title: enCompanies.title,
  description: enCompanies.description,
  ogImage: OG_IMAGES.default,
});

// Price examples and the shortest stay come from the booking API, so the page
// is rebuilt every 15 minutes like the rates pages.
export const revalidate = 900;

export default function Page() {
  return <CompaniesPage lang="en" />;
}
