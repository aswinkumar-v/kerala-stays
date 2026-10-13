import { createFileRoute } from "@tanstack/react-router";
import KeralaLanding from "@/components/KeralaLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kerala Stays — Thoughtful Stays & Experiences Across Kerala" },
      { name: "description", content: "Discover thoughtfully selected stays, authentic regional experiences and warm hospitality across Munnar, Kanthalloor and Wayanad." },
      { property: "og:title", content: "Kerala Stays — Stay Closer to the Soul of Kerala" },
      { property: "og:description", content: "Thoughtfully selected stays and authentic experiences across Kerala." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KeralaLanding,
});
