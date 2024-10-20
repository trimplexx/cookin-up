const CookingDayCard = ({ title, content }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg transform transition duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 mb-4">
      <h3 className="text-xl font-bold mb-2 text-emerald-600 dark:text-emerald-300">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-400">{content}</p>
    </div>
  );
};

export default CookingDayCard;
