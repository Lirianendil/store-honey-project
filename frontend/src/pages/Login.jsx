import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [login, { isSuccess: loginIsSuccess }] = useLoginMutation();

  useEffect(() => {
    if (loginIsSuccess) {
      setEmail("");
      setPassword("");
      navigate("/");
    }
  }, [loginIsSuccess, navigate]);

  const onLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginCredentials = { password, email: email.toLowerCase() };
      login(loginCredentials);

      // if (loginIsSuccess)
      // {
      //      setEmail("");
      //      setPassword("");
      //      navigate("/");
      // }
    } catch (error) {
      console.error("Ошибка при входе в систему:", error);
    }
  };

  return (
    <div>
      <form className="form-group custom-form" onSubmit={onLoginSubmit}>
        <label>Email</label>
        <input
          type="email"
          required
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          required
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="btn btn-warning btn md">
          Login
        </button>
      </form>
      <p className="text-left text-sm mt-2">
        Don't have account ?{" "}
        <Link to={"/register"} className="text-red-500 underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
