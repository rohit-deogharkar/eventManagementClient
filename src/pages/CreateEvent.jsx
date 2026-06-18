import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createEvent } from "../api/eventApi";
import EventForm from "../components/EventForm";
import Alert from "../components/Alert";
import { getErrorMessage } from "../utils/getErrorMessage";
import { pageClass } from "../utils/ui";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (eventData) => {
    setLoading(true);
    setError("");

    try {
      await createEvent({
        ...eventData,
        date: new Date(eventData.date).toISOString(),
      });
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={pageClass}>
      <Link
        to="/"
        className="mb-6 inline-block text-sm font-medium text-slate-500 no-underline hover:text-indigo-600"
      >
        &larr; Back to Events
      </Link>

      <section className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Create New Event
        </h1>
        <p className="mt-1 mb-8 text-slate-500">
          Fill in the details to publish a new event
        </p>

        {error && <Alert message={error} onClose={() => setError("")} />}

        <EventForm
          buttonText="Create Event"
          onSubmit={handleCreate}
          loading={loading}
        />
      </section>
    </main>
  );
};

export default CreateEvent;
