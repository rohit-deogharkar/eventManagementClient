import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEvent } from "../api/eventApi";
import EventForm from "../components/EventForm";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { getErrorMessage } from "../utils/getErrorMessage";
import { btnPrimary, pageClass } from "../utils/ui";

const toDatetimeLocal = (dateString) => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
};

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleUpdate = async (eventData) => {
    setSaving(true);
    setError("");

    try {
      await updateEvent(id, {
        ...eventData,
        date: new Date(eventData.date).toISOString(),
      });
      navigate(`/events/${id}`);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading text="Loading event..." />;
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
        to={`/events/${id}`}
        className="mb-6 inline-block text-sm font-medium text-slate-500 no-underline hover:text-indigo-600"
      >
        &larr; Back to Event
      </Link>

      <section className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Edit Event</h1>
        <p className="mt-1 mb-8 text-slate-500">Update the event details below</p>

        {error && <Alert message={error} onClose={() => setError("")} />}

        <EventForm
          initialData={{
            title: event.title,
            description: event.description,
            date: toDatetimeLocal(event.date),
            location: event.location,
          }}
          buttonText="Update Event"
          onSubmit={handleUpdate}
          loading={saving}
        />
      </section>
    </main>
  );
};

export default EditEvent;
