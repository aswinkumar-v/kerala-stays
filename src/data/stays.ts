import gardeniaImage from "@/assets/gardenia-munnar.jpg";
import canelaImage from "@/assets/canela-kanthalloor.jpg";
import silverGreenImage from "@/assets/silver-green-wayanad.jpg";
import experiencesImage from "@/assets/experiences-grid.jpg";
import img1 from "@/assets/img1.jpg";
import img2 from "@/assets/img2.jpeg";

export type Stay = {
  slug: string;
  name: string;
  place: string;
  type: string;
  image: string;
  gallery: string[];
  intro: string;
  about: string;
  highlights: string[];
  rooms: { name: string; detail: string; guests: string }[];
};

export const stays: Stay[] = [
  {
    slug: "gardenia",
    name: "Gardenia",
    place: "Munnar",
    type: "Mountain Escape",
    image: gardeniaImage,
    gallery: [gardeniaImage, img1, img2, experiencesImage],
    intro: "A quiet mountain address above the tea slopes of Munnar.",
    about:
      "Gardenia sits high above the tea gardens, where mornings open with mist and evenings settle into cool, clear air. Rooms look out across the valley, meals lean on Kerala flavours, and the pace of the day is set entirely by you.",
    highlights: [
      "Valley-facing rooms and balconies",
      "Multi-cuisine and Kerala dining",
      "Campfire evenings",
      "Tea estate walks nearby",
    ],
    rooms: [
      { name: "Valley Room", detail: "Queen bed, private balcony, valley view", guests: "2 guests" },
      { name: "Garden Suite", detail: "Separate living space and seating deck", guests: "3 guests" },
      { name: "Family Cottage", detail: "Two bedrooms with a shared verandah", guests: "5 guests" },
    ],
  },
  {
    slug: "canela-vista",
    name: "Canela Vista",
    place: "Kanthalloor",
    type: "Hill Retreat",
    image: canelaImage,
    gallery: [canelaImage, experiencesImage, img2, img1],
    intro: "Orchards, cool air and long valley views in Kanthalloor.",
    about:
      "Canela Vista is surrounded by the orchards and terraced farms that make Kanthalloor unlike anywhere else in Kerala. It is a small, calm retreat built for slow mornings, fruit-season walks and evenings spent outdoors.",
    highlights: [
      "Orchard and valley surroundings",
      "Home-style Kerala breakfasts",
      "Bonfire and stargazing",
      "Guided farm and orchard walks",
    ],
    rooms: [
      { name: "Orchard Room", detail: "King bed with orchard-facing windows", guests: "2 guests" },
      { name: "Hill Suite", detail: "Corner suite with a private sit-out", guests: "3 guests" },
      { name: "Group Cabin", detail: "Shared cabin for friends and families", guests: "6 guests" },
    ],
  },
  {
    slug: "silver-green",
    name: "Silver Green",
    place: "Wayanad",
    type: "Nature Getaway",
    image: silverGreenImage,
    gallery: [silverGreenImage, img2, experiencesImage, img2],
    intro: "Forest edges, birdsong and a pool with a view in Wayanad.",
    about:
      "Silver Green sits close to Wayanad's forests and waterfalls, with wide green surroundings and space to simply be outside. Days can be full of trails and landmarks, or spent entirely by the pool.",
    highlights: [
      "Swimming pool with garden views",
      "Multi-cuisine dining",
      "Close to trails and waterfalls",
      "Ample private parking",
    ],
    rooms: [
      { name: "Garden Room", detail: "Twin or king bed opening to the lawn", guests: "2 guests" },
      { name: "Pool Suite", detail: "Spacious suite steps from the pool", guests: "3 guests" },
      { name: "Nature Villa", detail: "Private villa with its own sit-out", guests: "4 guests" },
    ],
  },
];

export function getStay(slug: string) {
  return stays.find((stay) => stay.slug === slug);
}
