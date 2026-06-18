const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-slate-500">
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-indigo-600" />
      <p>{text}</p>
    </div>
  );
};

export default Loading;
