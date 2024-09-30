/*
 * Formatted file
 */

// this component is showing on toggling lazy loading routes (see router/Entrypoint.jsx)
const SuspenseLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 dark:bg-zinc-800">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300 dark:border-white"></div>
    </div>
  );
};

export default SuspenseLoader;
