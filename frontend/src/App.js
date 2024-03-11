import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin/Admin";
import { Header } from "./components/Header";
import { ContactUs } from "./pages/ContactUs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "./redux/slices/authSlice";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Search from "./pages/Search";
import User from "./pages/User";
import { Order } from "./pages/Order/Order";

export default function App() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(loginUser());
  }, []);

  return (
    <div className="container">
      <Toaster />
      {session?.loading ? (
        <div
          className="spinner-border position-absolute top-50 start-50 m-5"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        ""
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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
