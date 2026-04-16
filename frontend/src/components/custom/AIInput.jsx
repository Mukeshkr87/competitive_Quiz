const AIInput = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};
export default AIInput;
