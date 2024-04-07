import { useState } from "react";
import { useRegisterMutation } from "../redux/api/authApi";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: null,
    email: null,
    password: null,
  });

  const [register] = useRegisterMutation();

  return (
    <main>
      <h1>Enter your credentials</h1>
      <form className="form-group custom-form">
        <br />
        <label>Name</label>
        <input
          type="name"
          placeholder=""
          className="form-control"
          onChange={(e) => {
            setCredentials((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          placeholder=""
          className="form-control"
          onChange={(e) => {
            setCredentials((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder=""
          className="form-control"
          onChange={(e) => {
            setCredentials((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
      </form>
      <br />
      <button
        className="btn btn-warning btn md"
        onClick={() => register(credentials)}
      >
        Register
      </button>
    </main>
  );
};

export default Register;
