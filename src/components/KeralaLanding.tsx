import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  ConciergeBell,
  CornerDownRight,
  Droplet,
  Flame,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Play,
  Plus,
  Quote,
  Star,
  UtensilsCrossed,
  Users,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import videoPoster from "@/assets/video-poster.jpg";
import footerImage from "@/assets/footer-landscape.jpg";
import spaImage from "@/assets/service-spa.jpg";
import weddingImage from "@/assets/service-wedding.jpg";
import barImage from "@/assets/service-bar.jpg";
import restaurantImage from "@/assets/service-restaurant.jpg";
import trivandrumImage from "@/assets/dest-trivandrum.jpg";
import eventImage from "@/assets/event-room.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomStandard from "@/assets/room-standard.jpg";
import roomKing from "@/assets/room-king.jpg";
import roomAlpine from "@/assets/room-alpine.jpg";
import roomSuperior from "@/assets/room-superior.jpg";
import palaceImage from "@/assets/event-room.jpg";
import arrivalImage from "@/assets/arrival-road.jpg";
import { stays } from "@/data/stays";
import PlaceCard from "@/components/PlaceCard";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import heroImage11 from "@/assets/1.2.png";
import logoLocal from "@/assets/logo copy.png";
import teaImage from "@/assets/img1.jpg";
import propertyCottageImage from "@/assets/img2.jpeg";
import gardeniaImage from "@/assets/gardenia-munnar.jpg";
import canelaImage from "@/assets/canela-kanthalloor.jpg";
import silverGreenImage from "@/assets/silver-green-wayanad.jpg";
import experiencesImage from "@/assets/experiences-grid.jpg";

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Stays", "#stays"],
  ["Rooms", "#rooms"],
  ["Experiences", "#experiences"],
  ["Contact", "#contact"],
] as const;

const properties = stays;

const experiences = [
  {
    number: "01",
    kicker: "Taste",
    title: "Local Flavours & Dining",
    copy: "From comforting Kerala flavours to multi-cuisine dining, discover food that becomes part of the stay.",
    detail: "WhiteRocks · Gardenia · Silver Green",
    position: "experience-taste",
  },
  {
    number: "02",
    kicker: "Gather",
    title: "Campfire & Evenings",
    copy: "Slow evenings, conversations, music and campfire moments under the Kerala sky.",
    position: "experience-gather",
  },
  {
    number: "03",
    kicker: "Unwind",
    title: "Pool & Leisure",
    copy: "Mountain-view pools, peaceful surroundings and time to simply slow down.",
    position: "experience-unwind",
  },
  {
    number: "04",
    kicker: "Discover",
    title: "Nature & Local Experiences",
    copy: "Trekking, orchards, forests, landmarks and nearby attractions.",
    position: "experience-discover",
  },
];

const rooms = [
  { name: "Deluxe Room with Balcony", rate: "3,500", capacity: "3 Persons", size: "170 ft²", bed: "King Bed", view: "Valley View", image: roomDeluxe, copy: "Wake to cool hill air and open valley views from your own balcony — a generous room made for slow mornings." },
  { name: "Standard Room", rate: "3,000", capacity: "3 Persons", size: "120 ft²", bed: "King Bed", view: "Mountain View", image: roomStandard, copy: "A calm, well-kept room framed by the mountains, with everything you need to rest well between days out." },
  { name: "King Bed Room", rate: "150", capacity: "4 Persons", size: "30 ft²", bed: "King Bed", view: "Swimming Pool", image: roomKing, copy: "Comfortable and relaxed, with easy access to the pool for unhurried afternoons by the water." },
  { name: "Alpine Single Room", rate: "60", capacity: "2 Persons", size: "40 ft²", bed: "King Bed", view: "City Views", image: roomAlpine, copy: "A compact, cosy room for light travellers who want comfort, simplicity and a good night's sleep." },
  { name: "Superior Double Room", rate: "120", capacity: "6 Persons", size: "55 ft²", bed: "Double Bed", view: "Dramatic City Views", image: roomSuperior, copy: "Room for the whole group, with sweeping views and space to gather after a day exploring Kerala." },
];

const amenities = [
  { icon: Wifi, title: "High-speed Wi-Fi", copy: "Stay connected across rooms and common areas." },
  { icon: ConciergeBell, title: "24/7 Guest Service", copy: "A team on call whenever you need something." },
  { icon: UtensilsCrossed, title: "Multi-cuisine Dining", copy: "Kerala classics alongside familiar favourites." },
  { icon: Car, title: "Private Parking", copy: "Secure, on-property parking for every stay." },
  { icon: Flame, title: "Campfire Evenings", copy: "Slow evenings around the fire under open skies." },
  { icon: Waves, title: "Swimming Pool", copy: "Available at selected properties." },
];

const services = [
  { title: "Relaxing Spa", image: spaImage, copy: "Feel all five senses at ease — a peaceful space, gentle sound, faint scent and attentive, effective care." },
  { title: "Wedding & Event", image: weddingImage, copy: "Hillside lawns and warm hospitality for intimate weddings, celebrations and gatherings." },
  { title: "Bar & Music", image: barImage, copy: "Unhurried evenings with drinks, music and good company as the hills go quiet." },
  { title: "Restaurant", image: restaurantImage, copy: "Kerala flavours alongside multi-cuisine favourites, served with care at every meal." },
];

function SectionLabel({ number, children, light = false }: { number: string; children: string; light?: boolean }) {
  return (
    <div className={`section-label ${light ? "section-label-light" : ""}`}>
      <span>{number}</span><i aria-hidden="true" /><span>{children}</span>
    </div>
  );
}

function TextLink({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <a className={`text-link ${light ? "text-link-light" : ""}`} href="#contact">
      <span>{children}</span>
      <ArrowRight size={18} strokeWidth={2} />
    </a>
  );
}

const keralaLocations = [
  { name: "Munnar, Kerala", desc: "Misty hills, tea gardens & valleys" },
  { name: "Alleppey, Kerala", desc: "Backwaters & luxury houseboats" },
  { name: "Wayanad, Kerala", desc: "Waterfalls, caves & spice trails" },
  { name: "Kochi, Kerala", desc: "Colonial lanes & heritage waterfront" },
  { name: "Thekkady, Kerala", desc: "Wildlife reserve & aromatic spices" },
  { name: "Varkala, Kerala", desc: "Dramatic red cliffs & Arabian Sea" },
  { name: "Kumarakom, Kerala", desc: "Vembanad lake retreats & bird sanctuary" },
];

export default function KeralaLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filmOpen, setFilmOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roomIndex, setRoomIndex] = useState(0);

  const [location, setLocation] = useState("Munnar, Kerala");
  const [locationOpen, setLocationOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomCount, setRoomCount] = useState(1);

  const dateDisplay = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "d MMM")} – ${format(dateRange.to, "d MMM, yyyy")}`
      : `${format(dateRange.from, "d MMM yyyy")}`
    : selectedMonth || "Select date range";

  const totalGuests = adults + children;
  const guestSummary = totalGuests === 0
    ? "Select guests"
    : `${totalGuests} guest${totalGuests > 1 ? "s" : ""}, ${roomCount} room${roomCount > 1 ? "s" : ""}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const targets = document.querySelectorAll(".site-shell > section:not(.hero-wrap), .site-shell > footer, .service-card, .review-card, .route-row, .experience-card, .room-slide, .amenity-row");
    targets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }), { threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <main className="site-shell">
      <section className="hero-wrap" id="home">
        <img className="hero-image" src={heroImage11} alt="A traditional Kerala houseboat moving through lush backwaters" />
        <header className={`hero-nav ${scrolled ? "is-scrolled" : ""}`}>
          <a href="#home" aria-label="Kerala Stays home"><img className="brand-logo" src={logoLocal} alt="Kerala Stays" /></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </nav>
          <Button asChild className="book-button"><Link to="/stays">Book now</Link></Button>
          <Button variant="ghost" size="icon" className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </header>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => <a href={href} onClick={() => setMenuOpen(false)} key={label}>{label}</a>)}
          </nav>
        )}
        <div className="hero-copy">
          <h1>Stay closer to the soul<br className="hero-break" /> of Kerala</h1>
          <p>Thoughtfully selected stays, authentic regional experiences, and warm<br className="desktop-only" /> hospitality across Kerala.</p>
        </div>
        <div className="availability-panel" aria-label="Availability search">
          {/* Location Field with Popover Portal */}
          <Popover open={locationOpen} onOpenChange={setLocationOpen}>
            <PopoverTrigger asChild>
              <div className="search-field">
                <span className="search-label">Location</span>
                <button
                  type="button"
                  className="search-value"
                  aria-label="Select location"
                >
                  <span>
                    <MapPin size={16} strokeWidth={1.5} style={{ color: "#686358", flexShrink: 0 }} />
                    {location}
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    style={{
                      color: "#888073",
                      flexShrink: 0,
                      transform: locationOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={8}
              className="w-80 p-2 bg-[#FCFBF8] border border-[#E4DDD0] shadow-2xl rounded-2xl z-50"
            >
              <div className="p-2 border-b border-[#EDE7DC]">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#7F786C]">
                  Popular Destinations
                </div>
              </div>
              <div className="py-1 max-h-64 overflow-y-auto">
                {keralaLocations.map((loc) => (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => {
                      setLocation(loc.name);
                      setLocationOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-start gap-2.5 transition-colors ${
                      location === loc.name
                        ? "bg-[#EFEAE0] text-[#1E4B47] font-semibold"
                        : "hover:bg-[#F5F1E8] text-[#33302A]"
                    }`}
                  >
                    <MapPin size={15} className="mt-0.5 shrink-0 opacity-70" />
                    <div className="flex-1 min-w-0">
                      <div>{loc.name}</div>
                      <div className="text-xs text-[#878073] font-normal">{loc.desc}</div>
                    </div>
                    {location === loc.name && (
                      <Check size={16} className="mt-0.5 text-[#1E4B47] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Departure Month & Date Range Field with Popover Portal */}
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <div className="search-field">
                <span className="search-label">Departure Month</span>
                <button
                  type="button"
                  className="search-value"
                  aria-label="Select departure dates"
                >
                  <span>
                    <CalendarDays size={16} strokeWidth={1.5} style={{ color: "#686358", flexShrink: 0 }} />
                    {dateDisplay}
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    style={{
                      color: "#888073",
                      flexShrink: 0,
                      transform: dateOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="center"
              sideOffset={8}
              className="w-auto p-4 bg-[#FCFBF8] border border-[#E4DDD0] shadow-2xl rounded-2xl z-50"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#EDE7DC]">
                  <div>
                    <div className="text-sm font-semibold text-[#2D2A24]">Select Departure Dates</div>
                    <div className="text-xs text-[#7F786C]">Choose a specific range or travel month</div>
                  </div>
                  {(dateRange?.from || selectedMonth) && (
                    <button
                      type="button"
                      onClick={() => {
                        setDateRange(undefined);
                        setSelectedMonth(null);
                      }}
                      className="text-xs text-[#874A3D] hover:underline font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div>
                  <div className="text-xs font-medium text-[#7F786C] mb-2 uppercase tracking-wider">
                    Browse by Month
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-w-sm">
                    {["May 2026", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026"].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setSelectedMonth(m);
                          setDateRange(undefined);
                          setDateOpen(false);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedMonth === m
                            ? "bg-[#1E4B47] text-white"
                            : "bg-white border border-[#E5DFD5] text-[#3D3A34] hover:bg-[#F2ECE1]"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-[#7F786C] mb-1.5 uppercase tracking-wider">
                    Or Select Dates
                  </div>
                  <div className="rounded-xl border border-[#E9E3D6] bg-white p-2">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => {
                        setDateRange(range);
                        if (range?.from) setSelectedMonth(null);
                      }}
                      initialFocus
                      numberOfMonths={1}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#EDE7DC]">
                  <span className="text-xs text-[#6B655B] font-medium">
                    {dateDisplay !== "Select date range" ? dateDisplay : "No dates selected"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDateOpen(false)}
                    className="px-4 py-1.5 rounded-full bg-[#1E4B47] text-white text-xs font-medium hover:bg-[#163835] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Guests Field with Popover Portal */}
          <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
            <PopoverTrigger asChild>
              <div className="search-field">
                <span className="search-label">Guests</span>
                <button
                  type="button"
                  className="search-value"
                  aria-label="Select guests"
                >
                  <span>
                    <Users size={16} strokeWidth={1.5} style={{ color: "#686358", flexShrink: 0 }} />
                    {guestSummary}
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    style={{
                      color: "#888073",
                      flexShrink: 0,
                      transform: guestsOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-76 p-4 bg-[#FCFBF8] border border-[#E4DDD0] shadow-2xl rounded-2xl z-50"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#EDE7DC]">
                  <div>
                    <div className="text-sm font-semibold text-[#2D2A24]">Guests & Rooms</div>
                    <div className="text-xs text-[#7F786C]">Adjust your travel party</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-[#2D2A24]">Adults</div>
                    <div className="text-xs text-[#7F786C]">Ages 13 and above</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults((a) => Math.max(1, a - 1))}
                      className="w-8 h-8 rounded-full border border-[#D5CDBC] flex items-center justify-center text-[#3D3A34] disabled:opacity-30 hover:bg-[#F2ECE1] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-medium text-sm">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((a) => a + 1)}
                      className="w-8 h-8 rounded-full border border-[#D5CDBC] flex items-center justify-center text-[#3D3A34] hover:bg-[#F2ECE1] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-[#2D2A24]">Children</div>
                    <div className="text-xs text-[#7F786C]">Ages 0 to 12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren((c) => Math.max(0, c - 1))}
                      className="w-8 h-8 rounded-full border border-[#D5CDBC] flex items-center justify-center text-[#3D3A34] disabled:opacity-30 hover:bg-[#F2ECE1] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-medium text-sm">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren((c) => c + 1)}
                      className="w-8 h-8 rounded-full border border-[#D5CDBC] flex items-center justify-center text-[#3D3A34] hover:bg-[#F2ECE1] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-[#2D2A24]">Rooms</div>
                    <div className="text-xs text-[#7F786C]">Number of rooms</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={roomCount <= 1}
                      onClick={() => setRoomCount((r) => Math.max(1, r - 1))}
                      className="w-8 h-8 rounded-full border border-[#D5CDBC] flex items-center justify-center text-[#3D3A34] disabled:opacity-30 hover:bg-[#F2ECE1] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-medium text-sm">{roomCount}</span>
                    <button
                      type="button"
                      onClick={() => setRoomCount((r) => r + 1)}
                      className="w-8 h-8 rounded-full border border-[#D5CDBC] flex items-center justify-center text-[#3D3A34] hover:bg-[#F2ECE1] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EDE7DC] flex justify-end">
                  <button
                    type="button"
                    onClick={() => setGuestsOpen(false)}
                    className="px-4 py-1.5 rounded-full bg-[#1E4B47] text-white text-xs font-medium hover:bg-[#163835] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button className="availability-button" asChild>
            <Link to="/stays">
              Check Availability <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </Button>
        </div>
      </section>

      <section className="about-section content-width" id="about">
        <div className="about-heading">
          <SectionLabel number="01">About Kerala Stays</SectionLabel>
          <h2>Hospitality that feels<br />rooted, personal<br />and quietly<br />exceptional.</h2>
        </div>
        <div className="about-intro">
          <p>Kerala Stays, the flagship hospitality brand of Window Leisure Hotels LLP, brings together thoughtful hospitality, distinctive destinations and experiences designed to make every stay truly memorable.</p>
          <TextLink>Read Our Story</TextLink>
        </div>
        <div className="point-of-view">
          <p className="eyebrow">Our point of view</p>
          <h3>The character of a place should shape the character of every stay.</h3>
          <ul>
            {["Curated stays", "Multiple destinations", "End-to-end hospitality management"].map((item) => (
              <li key={item}><Check size={14} strokeWidth={2.5} style={{ color: "var(--olive)", flexShrink: 0 }} />{item}</li>
            ))}
          </ul>
        </div>
        <img className="tea-image" src={teaImage} alt="Tea plantations in the misty hills of Munnar" loading="lazy" />
      </section>

      <section className="film-section content-width" aria-label="Kerala Stays film">
        <button className="film-frame" type="button" onClick={() => setFilmOpen(true)} aria-label="Play the Kerala Stays film">
          <img src={videoPoster} alt="Misty Western Ghats at sunrise" loading="lazy" width={1920} height={1088} />
          <span className="film-play"><Play aria-hidden="true" /></span>
          <span className="film-caption"><small>The Kerala Stays Film</small><strong>What it means to stay closer to Kerala</strong></span>
          <span className="film-length">Film · Coming soon</span>
        </button>
        {filmOpen && (
          <div className="film-modal" role="dialog" aria-label="Kerala Stays film" onClick={() => setFilmOpen(false)}>
            <div className="film-modal-inner"><img src={videoPoster} alt="" /><p>Our brand film is being produced. Check back soon.</p><button type="button" aria-label="Close"><X /></button></div>
          </div>
        )}
      </section>

      <section className="services-section content-width" aria-label="Services">
        <div className="section-heading split-heading">
          <div><SectionLabel number="02">Our Services</SectionLabel><h2>Hospitality, Beyond the Room</h2></div>
          <p>Spaces and services across our properties, designed for rest, celebration and good company.</p>
        </div>
        <div className="services-grid">
          {services.map((s) => (
            <article className="service-card" key={s.title}>
              <div className="service-media"><img src={s.image} alt={s.title} loading="lazy" /></div>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
              <TextLink>Read More</TextLink>
            </article>
          ))}
        </div>
      </section>


      <section className="why-section">
        <div className="why-inner content-width">
          <p className="why-label">Why Choose Kerala Stays</p>
          <div className="why-copy">
            <h2>More Than a Place to Stay</h2>
            <p>We bring together distinctive places, thoughtful hospitality and experiences that help you experience Kerala beyond the usual itinerary.</p>
            <Button className="request-button" asChild>
              <a href="#contact">Request Access <ArrowRight size={15} strokeWidth={2} /></a>
            </Button>
          </div>
          <img className="why-wide" src={propertyCottageImage} alt="Kerala Stays cottage exterior" loading="lazy" />
          <img className="why-tall" src={propertyCottageImage} alt="Kerala Stays cottage exterior" loading="lazy" />
          <div className="why-features">
            {[
              ["Distinctive Stays", "Handpicked places with their own character."],
              ["Thoughtful Hospitality", "Warm, attentive service designed around your comfort."],
              ["Authentic Experiences", "Nature, food, local culture and memorable moments."],
              ["Comfort, Always.", "Essential amenities, guest support and dependable hospitality."],
            ].map(([title, copy]) => (
              <div className="why-feature" key={title}>
                <CornerDownRight size={15} strokeWidth={1.8} />
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stays-section content-width" id="stays">
        <div className="section-heading split-heading">
          <div><SectionLabel number="04">Featured Stays</SectionLabel><h2>Find Your Stay</h2></div>
          <p>From mountain retreats to peaceful escapes, discover a stay that fits the way you want to experience Kerala.</p>
        </div>
        <div className="property-stack">
          {properties.map((property, index) => (
            <div className="property-sticky" style={{ top: `${96 + index * 22}px`, zIndex: index + 1 }} key={property.slug}>
              <Link className="place-card place-card-wide" to="/stays/$stayId" params={{ stayId: property.slug }}>
                <img src={property.image} alt={`${property.name} in ${property.place}`} loading="lazy" />
                <span className="place-card-badge" aria-hidden="true"><ArrowUpRight /></span>
                <div className="place-card-body">
                  <small>0{index + 1} · {property.place}</small>
                  <h3>{property.name}</h3>
                  <p>{property.type} · {property.intro}</p>
                  <em>Explore property →</em>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="section-end-link">
          <Link className="text-link" to="/stays"><span>View all stays</span><ArrowRight size={18} strokeWidth={2} /></Link>
        </div>
      </section>


      <section className="experience-section content-width" id="experiences">
        <div className="section-heading split-heading">
          <div><SectionLabel number="06">The Stay Experience</SectionLabel><h2>Slow down.<br />Experience more.</h2></div>
          <p>Good days here unfold at their own pace — around a table, beside a fire, in cool water, or along a forest trail.</p>
        </div>
        <div className="experience-grid">
          {experiences.map((experience) => (
            <article className="experience-card" key={experience.title}>
              <div className={`experience-image ${experience.position}`}><img src={experiencesImage} alt="" loading="lazy" /></div>
              <div className="experience-copy">
                <div><span>{experience.number}</span><p>{experience.kicker}</p></div>
                <h3>{experience.title}</h3>
                <p>{experience.copy}</p>
                {experience.detail && <small>{experience.detail}</small>}
                {experience.number === "01" && <TextLink>Explore Dining</TextLink>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rooms-section" id="rooms">
        <div className="content-width">
          <div className="section-heading split-heading">
            <div><SectionLabel number="07">Rooms Category</SectionLabel><h2>Our Rooms</h2></div>
            <p>Discover comfortable stays designed for different kinds of travellers, with thoughtful amenities, beautiful views and everything you need for a relaxing Kerala getaway.</p>
          </div>
        </div>
        <div className="rooms-carousel content-width">
          <div className="rooms-viewport">
            <div className="rooms-track" style={{ transform: `translateX(-${roomIndex * 100}%)` }}>
              {rooms.map((room, i) => (
                <article className={`room-slide ${i === roomIndex ? "is-active" : ""}`} key={room.name} aria-hidden={i !== roomIndex}>
                  <div className="room-media"><img src={room.image} alt={room.name} loading="lazy" /></div>
                  <div className="room-panel">
                    <span className="room-rate">Rates from ₹{room.rate}</span>
                    <h3>{room.name}</h3>
                    <p>{room.copy}</p>
                    <dl className="room-specs">
                      <div><dt>Capacity</dt><dd>{room.capacity}</dd></div>
                      <div><dt>Size</dt><dd>{room.size}</dd></div>
                      <div><dt>Bed</dt><dd>{room.bed}</dd></div>
                      <div><dt>View</dt><dd>{room.view}</dd></div>
                    </dl>
                    <ul className="room-perks">
                      <li><Coffee aria-hidden="true" />Free Breakfast</li>
                      <li><Wifi aria-hidden="true" />Free Wifi</li>
                      <li><Droplet aria-hidden="true" />Free Water</li>
                    </ul>
                    <Button asChild className="room-button"><Link to="/stays" tabIndex={i === roomIndex ? 0 : -1}>Room Details <ArrowRight /></Link></Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="rooms-controls">
            <span className="rooms-count">0{roomIndex + 1} <i /> 0{rooms.length}</span>
            <div>
              <button type="button" aria-label="Previous room" onClick={() => setRoomIndex((i) => (i - 1 + rooms.length) % rooms.length)}><ChevronLeft /></button>
              <button type="button" aria-label="Next room" onClick={() => setRoomIndex((i) => (i + 1) % rooms.length)}><ChevronRight /></button>
            </div>
          </div>
        </div>
        <div className="content-width event-offer">
          <img src={eventImage} alt="Large event room set for a celebration" loading="lazy" width={1600} height={912} />
          <div className="event-card">
            <SectionLabel number="—">Events & Functions</SectionLabel>
            <h3>Large Event Room</h3>
            <p>A dedicated space for weddings, family functions, meetings and celebrations — planned with our team from the first enquiry to the final toast.</p>
            <a className="event-link" href="#contact">Enquire about events <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="amenities-section">
        <div className="content-width amenities-premium">
          <div className="amenities-intro">
            <SectionLabel number="08">Amenities</SectionLabel>
            <h2>Every Comfort, Considered</h2>
            <p>The essentials are taken care of, so your time in Kerala is spent on what matters.</p>
          </div>
          <div className="amenity-list">
            {amenities.map(({ icon: Icon, title, copy }, index) => (
              <div className="amenity-row" key={title}>
                <span className="amenity-num">0{index + 1}</span>
                <span className="amenity-icon"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="destinations-section content-width" id="explore">
        <div className="section-heading split-heading">
          <div><SectionLabel number="09">Explore & Experience</SectionLabel><h2>Discover the Places<br />Around Your Stay</h2></div>
          <p>From misty tea country to the southern coast, each destination opens a different side of Kerala.</p>
        </div>
        <div className="destination-grid destination-grid-four">
          {([
            ["Munnar", "Tea gardens & high ranges", gardeniaImage],
            ["Wayanad", "Forests & hidden gems", silverGreenImage],
            ["Kanthalloor", "Orchards & mountain valleys", canelaImage],
            ["Trivandrum", "Coastline & heritage", trivandrumImage],
          ] as const).map(([place, copy, image], index) => (
            <PlaceCard key={place} image={image} title={place} meta={copy} tag={`0${index + 1}`} to="/stays" tall />
          ))}
          <PlaceCard image={palaceImage} title="Bangalore" meta="More from Kerala Stays · The Palace" tag="+" to="/stays" tall />
        </div>
      </section>

      <section className="stories-section">
        <div className="content-width">
          <div className="stories-head">
            <div><SectionLabel number="10" light>Guest Stories</SectionLabel><h2>Stories From<br />Our Guests</h2></div>
            <div className="stories-score">
              <strong>4.8</strong>
              <div><span className="stars" aria-label="Rated 4.8 out of 5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}</span><p>Average guest rating · placeholder</p></div>
            </div>
          </div>
          <div className="reviews">
            {[
              ["Gardenia", "Munnar", "Family stay"],
              ["Canela Vista", "Kanthalloor", "Couple's retreat"],
              ["Silver Green", "Wayanad", "Friends' getaway"],
            ].map(([property, place, trip], i) => (
              <figure className={`review-card ${i === 1 ? "review-card-feature" : ""}`} key={property}>
                <Quote className="review-quote" aria-hidden="true" />
                <span className="stars">{[0, 1, 2, 3, 4].map((s) => <Star key={s} />)}</span>
                <blockquote>“Verified guest review goes here.”</blockquote>
                <figcaption>
                  <span className="review-avatar" aria-hidden="true">G</span>
                  <div><strong>Guest Name</strong><small>{property}, {place} · {trip}</small></div>
                  <span className="review-verified"><BadgeCheck aria-hidden="true" />Verified stay</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="partners">
            <p>Find and book us on</p>
            <div className="partner-row">
              {["Booking.com", "Agoda", "MakeMyTrip", "Tripadvisor", "Goibibo", "Airbnb"].map((name) => <span key={name}>{name}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="arrival-section" id="contact">
        <div className="content-width arrival-grid">
          <div className="arrival-copy">
            <SectionLabel number="11">Find Your Way</SectionLabel>
            <h2>Find Your Way<br />to Kerala</h2>
            <p className="arrival-lede">Your stay begins long before you arrive.</p>
            <p>Kerala Stays connects guests with destinations across Kerala. Our team is here to help with reservations, directions and anything related to your stay — before, during and after your visit.</p>
            <div className="arrival-panel">
              <a href="tel:+919446513996"><Phone aria-hidden="true" /><span><small>Reservations</small>+91 94465 13996</span></a>
              <a href="mailto:info@keralastays.in"><Mail aria-hidden="true" /><span><small>Email</small>info@keralastays.in</span></a>
            </div>
            <div className="arrival-ctas">
              <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Kerala+Stays+Kadavanthara+Kochi" target="_blank" rel="noreferrer"><span>Get Directions</span><ArrowRight size={18} strokeWidth={2} /></a>
              <a className="text-link" href="mailto:info@keralastays.in"><span>Contact Us</span><ArrowRight size={18} strokeWidth={2} /></a>
            </div>
            <div className="arrival-office">
              <small>Registered Office</small>
              <p>Room No. 243, 3rd Floor, DD Vyapara Bhavan, Kadavanthara, Kochi, Kerala, India – 682020</p>
            </div>
          </div>
          <figure className="arrival-visual">
            <img src={arrivalImage} alt="Road winding through misty Kerala tea hills at sunrise" loading="lazy" width={1600} height={1200} />
            <figcaption>
              <small>Our destinations</small>
              <ul>
                {([["Munnar", "Gardenia"], ["Kanthalloor", "Canela Vista"], ["Wayanad", "Silver Green"]] as const).map(([place, stay]) => (
                  <li key={place}><strong>{place}</strong><span>{stay}</span></li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="final-cta">
        <img src={heroImage11} alt="Traditional Kerala houseboat on lush backwaters" loading="lazy" />
        <div className="final-overlay">
          <SectionLabel number="12" light>Stays · Experiences · Destinations</SectionLabel>
          <h2>Find Your Place in Kerala.</h2>
          <p>Beautiful stays. Authentic experiences. Unforgettable escapes.</p>
          <div className="cta-buttons">
            <Button asChild className="final-primary"><Link to="/stays/$stayId" params={{ stayId: "gardenia" }}>Check availability <ArrowRight size={16} strokeWidth={2} /></Link></Button>
            <Button asChild variant="outline" className="final-secondary"><Link to="/stays">Discover our stays</Link></Button>
          </div>
        </div>
      </section>

      <footer className="site-footer content-width">
        <div className="footer-panel">
          <img className="footer-image" src={footerImage} alt="" aria-hidden="true" loading="lazy" />

          <div className="footer-inner">
            <div className="footer-top">
              <img className="footer-logo" src={logoLocal} alt="Kerala Stays" />
              <h2 className="footer-title">For Stays That Feel Like Kerala.</h2>
              <div className="footer-actions">
                <Button asChild className="footer-primary"><Link to="/stays">Book a stay</Link></Button>
                <Button asChild variant="outline" className="footer-secondary"><a href="mailto:info@keralastays.in">Email us</a></Button>
              </div>
            </div>
            <div className="footer-columns">
              <div>
                <h3>Navigation</h3>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <Link to="/stays">Stays</Link>
                <a href="#experiences">Experiences</a>
                <a href="#contact">Location</a>
              </div>
              <div>
                <h3>Stays</h3>
                {stays.map((stay) => (
                  <Link key={stay.slug} to="/stays/$stayId" params={{ stayId: stay.slug }}>{stay.name}, {stay.place}</Link>
                ))}
              </div>
              <div>
                <h3>Connect</h3>
                <a href="mailto:info@keralastays.in">info@keralastays.in</a>
                <a href="tel:+919446513996">+91 94465 13996</a>
                <span>Kadavanthara, Kochi, Kerala</span>
              </div>
              <div>
                <h3>Legal</h3>
                <span>Privacy policy</span>
                <span>Terms of stay</span>
                <span>Cancellation policy</span>
              </div>
            </div>
            <div className="footer-base">
              <span>Window Leisure Hotels LLP</span>
              <span>© 2026 Kerala Stays. All rights reserved.</span>
              <span>Designed and developed by Techiewizard Enterprises Pvt. Ltd.</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
