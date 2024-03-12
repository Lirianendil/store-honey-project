import { logoutUser } from "../redux/slices/authSlice"; // Обновленный импорт для logoutUser
import { useDispatch, useSelector } from "react-redux";
import { setLoadingReducer } from "../redux/slices/sessionSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export function Header() {
  const menu = [
    {
      name: "Home",
      link: "/home",
    },
    {
      link: "/contact-us",
      name: "Contact-us",
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);

  // Header logic
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
      {location.pathname === "/auth" ? (
        ""
      ) : (
        <div className="d-flex mb-5 justify-content-between align-items-center pt-2 bg-red-300">
          <div className="logo">
            <img
              width="100"
              src="https://seeklogo.com/images/C/creative-honey-logo-DF1AD5F440-seeklogo.com.png"
              alt="Logo"
            />
          </div>
          <ul className="nav-item d-flex gap-5 list-unstyled">
            {menu.map((menuItem) => {
              return (
                <li key={menuItem.link} onClick={() => navigate(menuItem.link)}>
                  <span
                    className={`${
                      location.pathname === menuItem.link
                        ? "active"
                        : "text-black"
                    } cursor-pointer text-decoration-none link-warning list-unstyled fw-bold`}
                  >
                    {menuItem.name}
                  </span>
                </li>
              );
            })}
            <div className="position-relative">
              <Link
                to={"/order"}
                className=" cursor-pointer  fa fa-cart-shopping fw-bold text-black"
              >
                0
              </Link>
            </div>
            <div className="d-flex gap-3 align-items-center">
              {data.user ? (
                <div className="d-flex gap-3">
                  <div className="fw-bold text-black">{data.user.name}</div>
                  <div
                    className="cursor-pointer  text-decoration-none text-black list-unstyled fw-bold"
                    onClick={onLogoutClicked}
                  >
                    <i className="fa fa-sign-out"></i>
                  </div>
                  <div
                    className="cursor-pointer  text-decoration-none text-black list-unstyled fw-bold"
                    onClick={onAdminClicked}
                  >
                    {" "}
                    Admin
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className="cursor-pointer text-decoration-none text-black
                    list-unstyled fw-bold"
                    onClick={onRegisterClicked}
                  >
                    Register
                  </div>
                  <div
                    className="cursor-pointer  text-decoration-none text-black list-unstyled fw-bold"
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
