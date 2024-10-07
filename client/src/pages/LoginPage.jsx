import { useState } from "react";
import { NavLink } from "react-router-dom";
import InputField from "../components/InputField";
import FormButton from "../components/FormButton";
import { login } from "../api/usersApi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const result = await login(email, password);

      if (result) {
        localStorage.setItem("jwtToken", result);
        toast.success("Pomyślnie zalogowano");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="w-full p-4">
      <div className="h-3/4 flex items-center justify-center">
        <div className="bg-white dark:bg-neutral-800 sm:px-10 px-6 py-10 rounded-lg shadow-lg max-w-lg w-full transform transition duration-200 hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-emerald-600 dark:text-emerald-300 mb-6">
            Zaloguj się
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
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
            />
            <div className="flex justify-between items-center mb-6">
              <FormButton
                label={isLoading ? "Przetwarzanie..." : "Zaloguj się"}
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Nie masz konta?{" "}
            <NavLink
              to="/rejestracja"
              className="text-emerald-600 dark:text-emerald-300 hover:underline transition-colors"
            >
              Zarejestruj się
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
