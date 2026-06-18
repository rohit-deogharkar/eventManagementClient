import { Link } from "react-router-dom";
import { formatShortDate } from "../utils/formatDate";
import { btnPrimary } from "../utils/ui";

const EventCard = ({ event }) => {
  const attendeeCount = event.attendees?.length ?? 0;

  return (
    <article className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-row flex-col">
      <div className="flex min-w-[72px] flex-col items-center justify-center bg-indigo-600 px-4 py-4 text-white sm:py-6">
        <span className="text-xs font-semibold tracking-wider uppercase">
          {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
        </span>
        <span className="text-3xl leading-none font-extrabold">
          {new Date(event.date).getDate()}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg leading-snug font-bold text-slate-800">{event.title}</h3>
        <p className="mb-4 flex-1 text-sm text-slate-500">
          {event.description.length > 120
            ? `${event.description.slice(0, 120)}...`
            : event.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-4">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {attendeeCount} attending
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-slate-400">{formatShortDate(event.date)}</span>
          <Link
            to={`/events/${event._id}`}
            className={`${btnPrimary} px-4 py-2 text-xs no-underline`}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
