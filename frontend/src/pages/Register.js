import { useState } from "react";
import { useRegisterMutation } from "../redux/api/authApi";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: null,
    password: null,
    role: null,
  });

  const [register] = useRegisterMutation();

  return (
    <main>
      <h1>Enter your credentials</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setCredentials((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setCredentials((prev) => ({ ...prev, password: e.target.value }));
          }}
        />

      </div>
      <button onClick={() => register(credentials)}>Register</button>
    </main>
  );
};

export default Register;
