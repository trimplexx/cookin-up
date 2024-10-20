import { useState } from "react";
import { createLobby } from "../api/lobbyApi";
import { showToast } from "../utils/toastManager";
import { useNavigate } from "react-router-dom";
import CreateLobbyForm from "../components/CreateLobbyForm";

const AddLobbyPage = () => {
  const navigate = useNavigate();
  const [lobbyName, setLobbyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateLobby = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await createLobby(lobbyName);
      showToast.success("Lobby zostało pomyślnie utworzone.", "");
      navigate("/");
    } catch (error) {
      showToast(
        error.message || "Wystąpił błąd podczas tworzenia lobby.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="h-3/4 flex items-center justify-center">
        <div className="bg-white dark:bg-neutral-800 sm:px-10 px-6 py-10 rounded-lg shadow-lg max-w-lg w-full transform transition duration-200 hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-emerald-600 dark:text-emerald-300 mb-6">
            Stwórz nowe lobby
          </h2>
          <CreateLobbyForm
            lobbyName={lobbyName}
            setLobbyName={setLobbyName}
            isLoading={isLoading}
            onSubmit={handleCreateLobby}
          />
        </div>
      </div>
    </div>
  );
};

export default AddLobbyPage;
