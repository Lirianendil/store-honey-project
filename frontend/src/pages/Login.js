import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const onLoginSubmit = (event) => {
  //       event.preventDefault();
  //       const loginCredentials = { password, email: email.toLowerCase() };
  //       dispatch(loginUser(loginCredentials)).then((result) => {
  //           if (result.payload.data) {
  //               setEmail('');
  //               setPassword('');
  //               navigate('/');
  //           }
  //       });
  //   }

  const onLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginCredentials = { password, email: email.toLowerCase() };
      const result = await dispatch(loginUser(loginCredentials));

      if (result.payload.data) navigate("/");
      {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.error("Ошибка при входе в систему:", error);
    }
  };

  return (
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
  );
};
