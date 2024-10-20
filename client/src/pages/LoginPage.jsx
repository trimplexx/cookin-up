import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin, isAuthenticated } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleLogin(email, password);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full p-4">
      <div className="h-3/4 flex items-center justify-center">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default LoginPage;
