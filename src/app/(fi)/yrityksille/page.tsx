import { CompaniesPage } from "../../../components/CompaniesPage.tsx";
import { fiCompanies } from "../../../content/fi.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "fi",
  key: "companies",
  title: fiCompanies.title,
  description: fiCompanies.description,
  ogImage: OG_IMAGES.default,
});

// Price examples and the shortest stay come from the booking API, so the page
// is rebuilt every 15 minutes like the rates pages.
export const revalidate = 900;

export default function Page() {
  return <CompaniesPage lang="fi" />;
}
