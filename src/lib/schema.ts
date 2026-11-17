import { site } from "../data/site";

const churchId = `${site.url}/#church`;
const websiteId = `${site.url}/#website`;

const labels: Record<string, string> = {
  visit: "I'm New & Beliefs",
  give: "Give",
  calendar: "Calendar",
  contact: "Contact",
  "get-connected": "Get Connected",
  "pray-for-me": "Pray For Me",
  trumpet: "Trumpet News",
  category: "Category",
  tag: "Tag",
};

export function breadcrumbs(pathname: string, leaf?: string) {
  const parts = pathname.split("/").filter(Boolean);
  const items = [{ name: "Home", url: `${site.url}/` }];
  let path = "";
  parts.forEach((part, index) => {
    path += `/${part}`;
    const last = index === parts.length - 1;
    const name = last && leaf ? leaf : labels[decodeURIComponent(part)] || decodeURIComponent(part).replace(/-/g, " ");
    items.push({ name, url: `${site.url}${path}/` });
  });
  return items;
}

function sundayEvent(id: string, name: string, description: string, startTime: string) {
  return {
    "@type": "Event",
    "@id": id,
    name,
    description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    eventSchedule: {
      "@type": "Schedule",
      repeatFrequency: "P1W",
      byDay: "https://schema.org/Sunday",
      startTime,
      scheduleTimezone: "America/Chicago",
    },
    location: { "@id": churchId },
    organizer: { "@id": churchId },
    isAccessibleForFree: true,
  };
}

export function pageGraph(options: {
  canonical: string;
  title: string;
  description: string;
  image: string;
  pathname: string;
  pageType?: string;
  published?: string;
  leaf?: string;
}) {
  const crumbs = breadcrumbs(options.pathname, options.leaf);
  const pageId = `${options.canonical}#webpage`;
  const postingId = `${options.canonical}#posting`;
  const isPost = options.pageType === "BlogPosting";

  const graph: Record<string, unknown>[] = [
    {
      "@type": ["Church", "LocalBusiness"],
      "@id": churchId,
      name: site.name,
      description: site.description,
      url: site.url,
      slogan: site.tagline,
      image: new URL("/images/worship.png", site.url).href,
      logo: new URL("/images/logo-mark.png", site.url).href,
      telephone: site.phoneTel,
      email: site.email,
      hasMap: site.mapUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.streetLine1,
        addressLocality: site.city,
        addressRegion: site.region,
        postalCode: site.postalCode,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "https://schema.org/Sunday",
        opens: site.sundayHours.opens,
        closes: site.sundayHours.closes,
      },
      event: [`${site.url}/#bible-study`, `${site.url}/#worship`],
    },
    sundayEvent(
      `${site.url}/#bible-study`,
      "Bible Study Classes",
      "Check in your children for their Bible Study Classes and find one of the many Adult Bible Study classes we offer.",
      "09:00",
    ),
    sundayEvent(
      `${site.url}/#worship`,
      "Worship Service",
      "Family Praise and Worship takes place in the main sanctuary, and then the children’s church proceeds to their classes. Nursery available.",
      "10:00",
    ),
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: site.name,
      url: site.url,
      description: site.description,
      publisher: { "@id": churchId },
      inLanguage: "en-US",
    },
    {
      "@type": options.pageType && options.pageType !== "BlogPosting" ? options.pageType : "WebPage",
      "@id": pageId,
      url: options.canonical,
      name: options.title,
      description: options.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": churchId },
      primaryImageOfPage: options.image,
      inLanguage: "en-US",
      breadcrumb: crumbs.length > 1 ? { "@id": `${options.canonical}#breadcrumb` } : undefined,
      mainEntity: isPost ? { "@id": postingId } : undefined,
    },
  ];

  if (crumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${options.canonical}#breadcrumb`,
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    });
  }

  if (isPost && options.published) {
    graph.push({
      "@type": "BlogPosting",
      "@id": postingId,
      headline: options.title,
      description: options.description,
      datePublished: options.published,
      image: options.image,
      mainEntityOfPage: { "@id": pageId },
      author: {
        "@type": "Organization",
        name: "Mission Design Services",
      },
      publisher: { "@id": churchId },
      isPartOf: { "@id": `${site.url}/trumpet/#collection` },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
