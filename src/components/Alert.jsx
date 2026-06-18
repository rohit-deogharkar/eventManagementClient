const Alert = ({ type = "error", message, onClose }) => {
  if (!message) return null;

  const styles =
    type === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-red-200 bg-red-50 text-red-800";

  return (
    <div
      className={`mb-5 flex items-start justify-between gap-4 rounded-lg border px-4 py-3 text-sm ${styles}`}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          className="cursor-pointer text-xl leading-none opacity-60 hover:opacity-100"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
