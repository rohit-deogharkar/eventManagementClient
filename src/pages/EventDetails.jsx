import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteEvent,
  getEventById,
  registerForEvent,
  unregisterFromEvent,
} from "../api/eventApi";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { formatDate } from "../utils/formatDate";
import { getErrorMessage } from "../utils/getErrorMessage";
import { btnDanger, btnOutline, btnPrimary, pageClass } from "../utils/ui";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isRegistered = event?.attendees?.some(
    (attendee) => attendee._id === user?.id,
  );

  const fetchEvent = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError("");

    try {
      const data = await getEventById(id);
      setEvent(data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleRegistrationToggle = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/events/${id}` } });
      return;
    }

    setActionLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isRegistered) {
        await unregisterFromEvent(id);
        setSuccess("You have been unregistered from this event.");
      } else {
        await registerForEvent(id);
        setSuccess("You have successfully registered for this event!");
      }
      await fetchEvent(false);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone.",
    );

    if (!confirmed) return;

    setActionLoading(true);
    setError("");

    try {
      await deleteEvent(id);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
      setActionLoading(false);
    }
  };

  if (loading) {
    return <Loading text="Loading event details..." />;
  }

  if (!event) {
    return (
      <main className={pageClass}>
        <div className="py-16 text-center text-slate-500">
          <h3 className="mb-4 text-xl font-semibold text-slate-800">Event not found</h3>
          <Link to="/" className={`${btnPrimary} no-underline`}>
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={pageClass}>
      <Link
        to="/"
        className="mb-6 inline-block text-sm font-medium text-slate-500 no-underline hover:text-indigo-600"
      >
        &larr; Back to Events
      </Link>

      {error && <Alert message={error} onClose={() => setError("")} />}
      {success && (
        <Alert type="success" message={success} onClose={() => setSuccess("")} />
      )}

      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <header className="flex flex-col items-start justify-between gap-4 border-b border-slate-200 p-6 sm:flex-row sm:p-8">
          <div>
            <span className="mb-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
              {formatDate(event.date)}
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {event.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-slate-500">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {event.location}
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-3 sm:w-auto">
            {!isAdmin && (
              <button
                type="button"
                className={isRegistered ? btnOutline : btnPrimary}
                onClick={handleRegistrationToggle}
                disabled={actionLoading}
              >
                {actionLoading
                  ? "Processing..."
                  : isRegistered
                    ? "Unregister"
                    : isAuthenticated
                      ? "Register for Event"
                      : "Login to Register"}
              </button>
            )}

            {isAdmin && (
              <>
                <Link
                  to={`/edit-event/${event._id}`}
                  className={`${btnOutline} no-underline`}
                >
                  Edit Event
                </Link>
                <button
                  type="button"
                  className={btnDanger}
                  onClick={handleDelete}
                  disabled={actionLoading}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </header>

        <section className="border-b border-slate-200 p-6 sm:p-8">
          <h2 className="mb-3 text-lg font-bold text-slate-800">About this event</h2>
          <p className="leading-relaxed text-slate-500">{event.description}</p>

          {event.createdBy && (
            <p className="mt-5 text-sm text-slate-500">
              Organized by <strong className="text-slate-700">{event.createdBy.name}</strong>
            </p>
          )}
        </section>

        <section className="p-6 sm:p-8">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
            Attendees
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-sm font-semibold text-indigo-600">
              {event.attendees?.length || 0}
            </span>
          </h2>

          {event.attendees?.length > 0 ? (
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {event.attendees.map((attendee) => (
                <li
                  key={attendee._id}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-600">
                    {attendee.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <span className="block text-sm font-semibold text-slate-800">
                      {attendee.name}
                    </span>
                    <span className="block text-xs text-slate-500">{attendee.email}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500">No attendees yet. Be the first to register!</p>
          )}
        </section>
      </article>
    </main>
  );
};

export default EventDetails;
