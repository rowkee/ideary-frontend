import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Log in</h2>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        ></input>
      </div>
      <button
        className="bg-transparent hover:bg-green-500 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded ml-3"
        disabled={isLoading}
      >
        Log in
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
