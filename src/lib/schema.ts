import { site } from "../data/site";

const organizationId = `${site.url}/#organization`;
const placeId = `${site.url}/#church`;
const websiteId = `${site.url}/#website`;
const logoId = `${site.url}/#logo`;
const addressId = `${site.url}/#address`;
const mailingId = `${site.url}/#mailing-address`;
const geoId = `${site.url}/#geo`;
const contactId = `${site.url}/#contact`;
const shareImageId = `${site.url}/#share-image`;
const blogId = `${site.url}/trumpet/#blog`;
const bibleStudyId = `${site.url}/#sunday-bible-study`;
const worshipEventId = `${site.url}/#sunday-worship`;

export const shareImage = {
  path: "/images/og.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "People kneeling in prayer during Sunday worship at Rosanky Baptist Church.",
} as const;

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

function compact<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => compact(item)).filter((item) => item !== undefined) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      if (item === undefined) continue;
      out[key] = compact(item);
    }
    return out as T;
  }
  return value;
}

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
    isAccessibleForFree: true,
    eventSchedule: {
      "@type": "Schedule",
      repeatFrequency: "P1W",
      byDay: "https://schema.org/Sunday",
      startTime,
      scheduleTimezone: "America/Chicago",
    },
    location: { "@id": placeId },
    organizer: { "@id": organizationId },
    image: { "@id": shareImageId },
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
  const pathname = options.pathname.replace(/\/$/, "") || "/";
  const crumbs = breadcrumbs(pathname, options.leaf);
  const pageId = `${options.canonical}#webpage`;
  const postingId = `${options.canonical}#posting`;
  const isPost = options.pageType === "BlogPosting";
  const onTrumpet = pathname === "/trumpet" || pathname.startsWith("/trumpet/");
  const isCollection = options.pageType === "CollectionPage";
  const isGive = pathname === "/give";
  const isPray = pathname === "/pray-for-me";
  const podcastId = `${site.url}/#bible-and-life`;
  const prayerEpisodeId = `${site.url}/#how-to-pray-for-your-church`;
  const usesShareImage = options.image === new URL(shareImage.path, site.url).href;
  const imageId = usesShareImage ? shareImageId : `${options.canonical}#image`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "ImageObject",
      "@id": logoId,
      url: new URL("/images/logo-mark.png", site.url).href,
      contentUrl: new URL("/images/logo-mark.png", site.url).href,
      width: 233,
      height: 70,
      caption: site.name,
    },
    {
      "@type": "ImageObject",
      "@id": imageId,
      url: options.image,
      contentUrl: options.image,
      caption: usesShareImage ? shareImage.alt : options.title,
      width: usesShareImage ? shareImage.width : undefined,
      height: usesShareImage ? shareImage.height : undefined,
      encodingFormat: usesShareImage ? shareImage.type : undefined,
    },
    {
      "@type": "PostalAddress",
      "@id": addressId,
      streetAddress: site.streetLine1,
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      "@id": mailingId,
      postOfficeBoxNumber: "96",
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: "US",
    },
    {
      "@type": "GeoCoordinates",
      "@id": geoId,
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    {
      "@type": "ContactPoint",
      "@id": contactId,
      contactType: "church office",
      telephone: site.phoneTel,
      email: site.email,
      availableLanguage: "English",
      areaServed: `${site.city}, ${site.region}`,
    },
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      slogan: site.tagline,
      description: site.description,
      url: site.url,
      email: site.email,
      telephone: site.phoneTel,
      logo: { "@id": logoId },
      image: { "@id": shareImageId },
      sameAs: [site.facebook],
      subjectOf: { "@id": podcastId },
      address: [{ "@id": addressId }, { "@id": mailingId }],
      location: { "@id": placeId },
      contactPoint: { "@id": contactId },
    },
    {
      "@type": "Church",
      "@id": placeId,
      name: site.name,
      description: site.tagline,
      url: site.url,
      image: { "@id": shareImageId },
      address: { "@id": addressId },
      geo: { "@id": geoId },
      hasMap: site.mapUrl,
      telephone: site.phoneTel,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "https://schema.org/Sunday",
        opens: site.sundayHours.opens,
        closes: site.sundayHours.closes,
      },
      event: [{ "@id": bibleStudyId }, { "@id": worshipEventId }],
      containedInPlace: {
        "@type": "City",
        name: site.city,
        containedInPlace: {
          "@type": "State",
          name: "Texas",
        },
      },
    },
    {
      "@type": "PodcastSeries",
      "@id": podcastId,
      name: "Bible and Life with Dr. Mark Redd",
      url: site.podcastShow,
      description:
        "Biblical preaching and practical teaching from Dr. Mark Redd, interim pastor of Rosanky Baptist Church.",
      inLanguage: "en-US",
      about: { "@id": organizationId },
      sourceOrganization: { "@id": organizationId },
      author: {
        "@type": "Person",
        name: "Dr. Mark Redd",
        jobTitle: "Interim Pastor",
        worksFor: { "@id": organizationId },
      },
    },
    sundayEvent(
      bibleStudyId,
      "Bible Study Classes",
      "Check in your children for their Bible Study Classes and find one of the many Adult Bible Study classes we offer.",
      "09:00",
    ),
    sundayEvent(
      worshipEventId,
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
      inLanguage: "en-US",
      publisher: { "@id": organizationId },
      about: { "@id": organizationId },
    },
    {
      "@type": isPost ? "WebPage" : options.pageType || "WebPage",
      "@id": pageId,
      url: options.canonical,
      name: options.title,
      description: options.description,
      inLanguage: "en-US",
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      primaryImageOfPage: { "@id": imageId },
      breadcrumb: crumbs.length > 1 ? { "@id": `${options.canonical}#breadcrumb` } : undefined,
      mainEntity: isPost
        ? { "@id": postingId }
        : isCollection && onTrumpet
          ? { "@id": blogId }
            : pathname === "/"
            ? { "@id": organizationId }
            : { "@id": placeId },
      mentions: isPray ? { "@id": prayerEpisodeId } : undefined,
      potentialAction: isGive
        ? {
            "@type": "DonateAction",
            name: "Give online",
            recipient: { "@id": organizationId },
            target: {
              "@type": "EntryPoint",
              urlTemplate: site.giveOnline,
            },
          }
        : undefined,
    },
  ];

  if (isPray) {
    graph.push({
      "@type": "PodcastEpisode",
      "@id": prayerEpisodeId,
      name: "How To Pray for Your Church",
      description: "Seven ways to pray for your church, from Ephesians 3:14–21.",
      url: site.prayerEpisode,
      duration: "PT41M26S",
      partOfSeries: { "@id": podcastId },
    });
  }

  if (!usesShareImage) {
    graph.splice(1, 0, {
      "@type": "ImageObject",
      "@id": shareImageId,
      url: new URL(shareImage.path, site.url).href,
      contentUrl: new URL(shareImage.path, site.url).href,
      width: shareImage.width,
      height: shareImage.height,
      encodingFormat: shareImage.type,
      caption: shareImage.alt,
    });
  }

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

  if (onTrumpet) {
    graph.push({
      "@type": "Blog",
      "@id": blogId,
      name: "Trumpet News",
      description: "Newsletters and stories from Rosanky Baptist Church.",
      url: `${site.url}/trumpet/`,
      inLanguage: "en-US",
      publisher: { "@id": organizationId },
    });
  }

  if (isPost && options.published) {
    graph.push({
      "@type": "BlogPosting",
      "@id": postingId,
      headline: options.title,
      description: options.description,
      datePublished: options.published,
      image: { "@id": imageId },
      mainEntityOfPage: { "@id": pageId },
      author: {
        "@type": "Organization",
        name: "Mission Design Services",
      },
      publisher: { "@id": organizationId },
      isPartOf: { "@id": blogId },
    });
  }

  return compact({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}
