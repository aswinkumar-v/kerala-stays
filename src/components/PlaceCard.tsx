import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

type PlaceCardProps = {
  image: string;
  title: string;
  meta: string;
  tag?: string;
  to?: string;
  params?: Record<string, string>;
  tall?: boolean;
};

export default function PlaceCard({ image, title, meta, tag, to, params, tall = false }: PlaceCardProps) {
  const inner = (
    <>
      <img src={image} alt={title} loading="lazy" />
      <span className="place-card-badge" aria-hidden="true"><ArrowUpRight /></span>
      <div className="place-card-body">
        {tag && <small>{tag}</small>}
        <h3>{title}</h3>
        <p>{meta}</p>
      </div>
    </>
  );

  const className = `place-card ${tall ? "place-card-tall" : ""}`;

  if (to === "/stays/$stayId" && params) {
    return (
      <Link className={className} to="/stays/$stayId" params={{ stayId: params["stayId"] ?? "" }}>
        {inner}
      </Link>
    );
  }
  if (to === "/stays") {
    return <Link className={className} to="/stays">{inner}</Link>;
  }
  return <article className={className}>{inner}</article>;
}
