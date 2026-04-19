const AIInput = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 ${className}`}
      {...props}
    />
  );
};
export default AIInput;
