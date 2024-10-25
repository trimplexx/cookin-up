const SuspenseLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400 bg-opacity-75 z-50 dark:bg-zinc-900">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-emerald-200 dark:border-emerald-300"></div>
    </div>
  );
};

export default SuspenseLoader;
