import { logoutUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Cart from "./Cart";

export function Header() {
  const menu = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "Contact-us",
      link: "/contact-us",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);

  // Обработчики событий
  const onLogoutClicked = () => {
    dispatch(logoutUser());
  };

  const onLoginClicked = () => {
    navigate("/login");
  };

  const onAdminClicked = () => {
    navigate("/admin");
  };

  const onRegisterClicked = () => {
    navigate("/register");
  };

  return (
    <>
      {location.pathname !== "/auth" && (
        <div className="d-flex mb-5 justify-content-between align-items-center pt-2 bg-red-300">
          <div className="logo cursor-pointer">
            <img
              width="100"
              src="https://seeklogo.com/images/C/creative-honey-logo-DF1AD5F440-seeklogo.com.png"
              alt="Logo"
            />
          </div>
          <ul className="nav-item d-flex gap-5 list-unstyled">
            {menu.map((menuItem) => (
              <li
                key={menuItem.link}
                onClick={() => navigate(menuItem.link)}
                className={
                  location.pathname === menuItem.link ? "active" : "text-black"
                }
              >
                <span className="cursor-pointer text-decoration-none link-warning list-unstyled fw-bold">
                  {menuItem.name}
                </span>
              </li>
            ))}
            <div className="position-relative">
              <Cart />
            </div>
            <div className="d-flex gap-3 align-items-center">
              {data.user ? (
                <div className="d-flex gap-3">
                  <div className="fw-bold text-black">
                    <i className="fa fa-user-alt me-3"></i>
                    {data?.user?.email}
                  </div>
                  {data.user.role === "admin" ? (
                    <div
                      className="cursor-pointer text-decoration-none text-black list-unstyled fw-bold"
                      onClick={onAdminClicked}
                    >
                      <i className="fa fa-cogs"></i>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className="cursor-pointer text-decoration-none text-black list-unstyled fw-bold"
                    onClick={onLogoutClicked}
                  >
                    <i className="fa fa-sign-out"></i>
                  </div>
                </div>
              ) : (
                <div>
                  {/* <div
                    className="cursor-pointer text-decoration-none text-black list-unstyled fw-bold"
                    onClick={onRegisterClicked}
                  >
                    Register
                  </div> */}
                  <div
                    className="cursor-pointer text-decoration-none text-black list-unstyled fw-bold"
                    onClick={onLoginClicked}
                  >
                    Login
                  </div>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </>
  );
}
