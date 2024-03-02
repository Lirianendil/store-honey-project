import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from '../redux/slices/authSlice'; // Импорт loginUser из вашего authSlice.js
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onLoginSubmit = (event) => {
        event.preventDefault();
        const loginCredentials = { password, email: email.toLowerCase() };
       Promise.resolve(dispatch(loginUser(loginCredentials))).then((result) => {
                setEmail('');
                setPassword('');
                navigate('/');

        });
    }

    return (
        <form className="form-group custom-form" onSubmit={onLoginSubmit}>
            <label>Email</label>
            <input type="email" required className="form-control"  value={email} onChange={(e) => setEmail(e.target.value)} />
            <br/>
            <label>Password</label>
            <input type="password" required className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br/>
            <button type="submit" className="btn btn-warning btn md">Login</button>
        </form>
    )
}