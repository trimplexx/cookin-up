import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import FormButton from "../components/FormButton";
import { register } from "../api/usersApi";
import { toast } from "react-hot-toast"; // Import react-hot-toast

const RegisterPage = () => {
  const [nick, setNick] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nick || !email || !password || !confirmPassword) {
      toast.error("Wszystkie pola muszą być wypełnione");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Hasła muszą być takie same");
      return;
    }

    try {
      setIsLoading(true);
      const result = await register(nick, email, password);

      if (result) {
        toast.success("Rejestracja powiodła się");
        navigate("/logowanie");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-4 ">
      <div className="h-full flex items-center justify-center">
        <div className="bg-white dark:bg-neutral-800 sm:px-10 px-6 py-10  rounded-lg shadow-lg max-w-lg w-full transform transition duration-200 hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-emerald-600 dark:text-emerald-300 mb-6">
            Zarejestruj się
          </h2>
          <form className="space-y-6" onSubmit={handleRegister}>
            <InputField
              id="nick"
              label="Nick"
              placeholder="Podaj swój Nick"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Podaj email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              id="password"
              label="Hasło"
              placeholder="Podaj hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isPassword={true}
              autoComplete="new-password"
            />
            <InputField
              id="confirm-password"
              label="Powtórz hasło"
              placeholder="Powtórz hasło"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isPassword={true}
              autoComplete="new-password"
            />
            <div className="flex justify-between items-center mb-6">
              <FormButton
                label={isLoading ? "Przetwarzanie..." : "Zarejestruj się"}
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Masz już konto?{" "}
            <NavLink
              to="/logowanie"
              className="text-emerald-600 dark:text-emerald-300 hover:underline transition-colors"
            >
              Zaloguj się
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
