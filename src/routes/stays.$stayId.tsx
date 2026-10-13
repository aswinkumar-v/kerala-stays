import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getStay, stays } from "@/data/stays";

export const Route = createFileRoute("/stays/$stayId")({
  loader: ({ params }) => {
    const stay = getStay(params.stayId);
    if (!stay) throw notFound();
    return { stay };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Stay not found — Kerala Stays" }, { name: "robots", content: "noindex" }] };
    }
    const { stay } = loaderData;
    const title = `${stay.name}, ${stay.place} — Kerala Stays`;
    return {
      meta: [
        { title },
        { name: "description", content: stay.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: stay.intro },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: StayNotFound,
  component: StayDetail,
});

function StayNotFound() {
  return (
    <main className="site-shell">
      <div className="page-header content-width">
        <h1>Stay not found</h1>
        <p>That property does not exist. Browse all of our stays instead.</p>
        <Link className="back-link" to="/stays">View all stays →</Link>
      </div>
    </main>
  );
}

function StayDetail() {
  const { stay } = Route.useLoaderData();
  const [room, setRoom] = useState(stay.rooms[0]?.name ?? "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [sent, setSent] = useState(false);

  return (
    <main className="site-shell stay-detail">
      <section className="stay-hero">
        <img src={stay.image} alt={`${stay.name} in ${stay.place}`} />
        <div className="stay-hero-copy content-width">
          <Link className="back-link back-link-light" to="/stays">← All stays</Link>
          <small>{stay.place} · {stay.type}</small>
          <h1>{stay.name}</h1>
          <p>{stay.intro}</p>
        </div>
      </section>

      <section className="content-width stay-body">
        <div>
          <h2>About the stay</h2>
          <p className="stay-about">{stay.about}</p>
          <h2>What's included</h2>
          <ul className="stay-highlights">
            {stay.highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <h2>Rooms</h2>
          <div className="stay-rooms">
            {stay.rooms.map((item) => (
              <div className="stay-room" key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
                <small>{item.guests}</small>
              </div>
            ))}
          </div>
        </div>

        <aside className="booking-card">
          <h2>Request a booking</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label>
              <span>Check in</span>
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
            </label>
            <label>
              <span>Check out</span>
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
            </label>
            <label>
              <span>Guests</span>
              <input type="number" min="1" max="12" value={guests} onChange={(e) => setGuests(e.target.value)} required />
            </label>
            <label>
              <span>Room</span>
              <select value={room} onChange={(e) => setRoom(e.target.value)}>
                {stay.rooms.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
              </select>
            </label>
            <Button type="submit" className="booking-button">Request availability</Button>
          </form>
          {sent && (
            <p className="booking-confirm" role="status">
              Thank you — your request for {room} at {stay.name} has been noted. Our team will confirm by email.
            </p>
          )}
        </aside>
      </section>

      <section className="content-width stay-gallery" aria-label="Gallery">
        {stay.gallery.map((src, index) => (
          <img key={src + index} src={src} alt={`${stay.name} view ${index + 1}`} loading="lazy" />
        ))}
      </section>

      <section className="content-width stay-more">
        <h2>Other stays</h2>
        <div className="stay-more-links">
          {stays.filter((item) => item.slug !== stay.slug).map((item) => (
            <Link key={item.slug} to="/stays/$stayId" params={{ stayId: item.slug }}>
              {item.name}, {item.place} →
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
