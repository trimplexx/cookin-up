import PropTypes from 'prop-types';

const CommentsModal = ({ comments, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-300">
          Komentarze
        </h2>
        {comments.length > 0 ? (
          <ul className="space-y-2 dark:text-white">
            {comments.map((comment, index) => (
              <li key={index} className="border-b py-2">
                <p className="font-bold">{comment.userName}</p>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Brak komentarzy.</p>
        )}
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={onClose}
        >
          Zamknij
        </button>
      </div>
    </div>
  );
};

CommentsModal.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentsModal;
