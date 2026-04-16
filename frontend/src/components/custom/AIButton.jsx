const AIButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default AIButton;
