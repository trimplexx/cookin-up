import PropTypes from "prop-types";
import { FaTrash, FaPlus } from "react-icons/fa";
import Button from "./Button";

const UsersInLobby = ({ users, onRemoveUser, onAddUserClick }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 sm:px-6 px-4 py-6 rounded-lg shadow-lg transform transition duration-200 hover:shadow-2xl flex-col">
      <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 mb-4 w-full flex justify-center py-4">
        Użytkownicy w lobby
      </h2>
      {users.length > 0 ? (
        <ul className="list-none p-0 max-h-40 overflow-y-auto">
          {users.map((user) => (
            <li
              key={user.userId}
              className="flex items-center justify-between p-2 border-b dark:border-neutral-700"
            >
              <span className="text-gray-700 dark:text-gray-300">
                {user.userName}
              </span>
              <div>
                <Button
                  onClick={() => onRemoveUser(user.userName)}
                  styleClass="text-red-500 hover:text-red-700"
                  icon={FaTrash}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-6">
          Brak użytkowników w lobby.
        </p>
      )}
      <div className="w-full flex justify-end py-4">
        <Button
          onClick={onAddUserClick}
          styleClass="mt-4 bg-emerald-500 text-white hover:bg-emerald-600"
          icon={FaPlus}
          text="Dodaj użytkownika"
        />
      </div>
    </div>
  );
};

UsersInLobby.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      userName: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveUser: PropTypes.func.isRequired,
  onAddUserClick: PropTypes.func.isRequired,
};

export default UsersInLobby;
