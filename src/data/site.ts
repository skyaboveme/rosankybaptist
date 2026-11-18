export const site = {
  name: "Rosanky Baptist Church",
  tagline: "The Lighthouse on the Hillside",
  url: "https://www.rosankybc.org",
  description:
    "Discover worship, Bible study, and community at Rosanky Baptist Church. Join us Sundays or get connected online for spiritual growth and fellowship.",
  phoneDisplay: "(512) 360-3968",
  phoneTel: "+15123603968",
  phoneBusinessSettings: "(512) 360-3109",
  email: "hello@rosankybc.org",
  streetShort: "2160 FM 535, Rosanky, TX 78953",
  streetLine1: "2160 Farm to Market 535",
  city: "Rosanky",
  region: "TX",
  postalCode: "78953",
  country: "United States",
  mailingAddress: ["PO BOX 96", "Rosanky, TX 78953"],
  mapUrl: "https://maps.app.goo.gl/NM8oiNBqjMTbWnUR7",
  geo: { lat: 29.9309722, lng: -97.3037247 },
  sundayHours: { opens: "09:00", closes: "11:00" },
  churchCenter: "https://rosankybc.churchcenter.com/",
  facebook: "https://www.facebook.com/RosankyBaptistChurch",
  prayerEpisode: "https://open.spotify.com/episode/3DKAnONzJkRkqwgVg01agM",
  prayerEpisodeEmbed: "https://open.spotify.com/embed/episode/3DKAnONzJkRkqwgVg01agM?utm_source=generator",
  podcastShow: "https://open.spotify.com/show/5GCcMiOVPmnVQ7Rt2eW3Sm",
  podcastShowEmbed: "https://open.spotify.com/embed/show/5GCcMiOVPmnVQ7Rt2eW3Sm?utm_source=generator",
  prayerForm: "https://rosankybc.churchcenter.com/people/forms/1071699",
  giveOnline: "https://secure.myvanco.com/L-ZB3N/home",
  pinewoodForm:
    "https://docs.google.com/forms/d/e/1FAIpQLScMHms8x8HgPmxpSnYsrqGV2qFTJs9ovX927rpYrgE4RZY_aQ/viewform?pli=1",
  vision:
    "To be a people following Jesus, being transformed by Jesus, committed to the mission of Jesus, and helping others do the same.",
  mission:
    "We believe we are called to glorify God by connecting all people to Jesus and the good news of His Gospel.",
} as const;

export const nav = [
  { href: "/", label: "Home", external: false },
  { href: "/#worship", label: "Worship", external: false },
  { href: "/give", label: "Give", external: false },
  { href: "/visit", label: "Attend", external: false },
  { href: "/trumpet", label: "News", external: false },
  { href: site.churchCenter, label: "Members", external: true },
] as const;
