import { useEffect, useState } from "react";
import { inputClass } from "../utils/ui";

const SearchBar = ({ value, onChange, placeholder = "Search events..." }) => {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(input);
    }, 400);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="relative mb-8">
      <svg
        className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="search"
        className={`${inputClass} pl-11`}
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
