import { createFileRoute, Link } from "@tanstack/react-router";
import { stays } from "@/data/stays";
import PlaceCard from "@/components/PlaceCard";

export const Route = createFileRoute("/stays/")({
  head: () => ({
    meta: [
      { title: "Our Stays — Kerala Stays" },
      { name: "description", content: "Browse every Kerala Stays property across Munnar, Kanthalloor and Wayanad." },
      { property: "og:title", content: "Our Stays — Kerala Stays" },
      { property: "og:description", content: "Browse every Kerala Stays property across Munnar, Kanthalloor and Wayanad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaysIndex,
});

function StaysIndex() {
  return (
    <main className="site-shell">
      <div className="page-header content-width">
        <Link className="back-link" to="/">← Back to home</Link>
        <h1>Our Stays</h1>
        <p>Three distinct places across the Kerala high ranges and forests — each with its own character and pace.</p>
      </div>
      <div className="content-width destination-grid stays-index-grid">
        {stays.map((stay) => (
          <PlaceCard
            key={stay.slug}
            image={stay.image}
            title={stay.name}
            meta={`${stay.place} · ${stay.type}`}
            tag="Stay"
            to="/stays/$stayId"
            params={{ stayId: stay.slug }}
            tall
          />
        ))}
      </div>
    </main>
  );
}
