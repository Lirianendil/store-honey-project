import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import Admin  from "./pages/Admin/Admin";
import { Header } from "./components/Header";
import { ContactUs } from "./pages/ContactUs";
import { useSelector } from "react-redux";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Search from "./pages/Search";
import User from "./pages/User";
import { Order } from "./pages/Order/Order";
import Register from "./pages/Register";
import {useEffect} from "react";
import {useLoadMutation} from "./redux/api/authApi";
import EditProductPage from "./pages/EditProductPage";

export default function App() {
  const session = useSelector((state) => state.session);
  const [load] = useLoadMutation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    load(user?.token);
  }, []);

  return (
      <div className="container">
        <Toaster />
        {session && session.loading && ( // Проверяем наличие session перед доступом к loading
            <div
                className="spinner-border position-absolute top-50 start-50 m-5"
                role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
        )}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<User />} />
            <Route path="/order" element={<Order />} />
            <Route path="/Register" element={<Register />} />
            <Route
                path="/admin/products/edit/:productId"
                element={<EditProductPage />}
            />
          </Routes>
          <Footer />
        </Router>
      </div>
  );
}
