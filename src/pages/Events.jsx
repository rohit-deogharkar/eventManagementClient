import { useCallback, useEffect, useState } from "react";
import { getEvents } from "../api/eventApi";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { getErrorMessage } from "../utils/getErrorMessage";
import { pageClass } from "../utils/ui";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getEvents(page, search);
      setEvents(data.data);
      setTotalPages(data.pages);
      setTotal(data.total);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  return (
    <main className={pageClass}>
      <section className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Discover Events
        </h1>
        <p className="mt-1 text-slate-500">
          Browse upcoming events and register to attend
        </p>
      </section>

      <SearchBar value={search} onChange={handleSearchChange} />

      {error && <Alert message={error} onClose={() => setError("")} />}

      {loading ? (
        <Loading text="Fetching events..." />
      ) : events.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          <h3 className="mb-2 text-xl font-semibold text-slate-800">No events found</h3>
          <p>
            {search
              ? "Try a different search term."
              : "Check back soon for new events."}
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">
            Showing {events.length} of {total} events
          </p>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </main>
  );
};

export default Events;
