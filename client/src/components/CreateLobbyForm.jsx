import PropTypes from "prop-types";
import InputField from "./InputField";
import FormButton from "./FormButton";

const CreateLobbyForm = ({ lobbyName, setLobbyName, isLoading, onSubmit }) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <InputField
        id="lobbyName"
        label="Nazwa lobby"
        type="text"
        placeholder="Podaj nazwę lobby"
        value={lobbyName}
        onChange={(e) => setLobbyName(e.target.value)}
      />
      <div className="flex justify-between items-center mb-6">
        <FormButton
          label={isLoading ? "Tworzenie..." : "Stwórz lobby"}
          type="submit"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

CreateLobbyForm.propTypes = {
  lobbyName: PropTypes.string.isRequired,
  setLobbyName: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateLobbyForm;
