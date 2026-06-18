import { useState } from "react";
import { btnPrimary, inputClass, labelClass } from "../utils/ui";

const EventForm = ({ initialData, onSubmit, buttonText, loading }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      date: "",
      location: "",
    },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className={labelClass}>
          Event Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          className={inputClass}
          placeholder="e.g. Tech Meetup 2026"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className={`${inputClass} min-h-[100px] resize-y`}
          placeholder="Describe your event..."
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className={labelClass}>
            Date & Time
          </label>
          <input
            id="date"
            type="datetime-local"
            name="date"
            className={inputClass}
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="location" className={labelClass}>
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            className={inputClass}
            placeholder="e.g. Mumbai, India"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button type="submit" className={`${btnPrimary} w-full`} disabled={loading}>
        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  );
};

export default EventForm;
