import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Header } from "./components/Header";
import { ContactUs } from "./components/ContactUs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "./redux/slices/authSlice"; // Импортируем метод loginUser из authSlice.js
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";

export default function App() {
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);

    useEffect(() => {
        // Вызываем метод loginUser при загрузке приложения
        // Этот метод может устанавливать информацию о пользователе в состояние
        dispatch(loginUser());
    }, []);

    return (
        <div className="container">
            <Toaster />
            {
                session?.loading ? <div className="spinner-border position-absolute top-50 start-50 m-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div> : ''
            }
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Navigate to="/home" />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/contact-us' element={<ContactUs />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
};