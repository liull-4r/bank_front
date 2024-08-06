import { IoCloseSharp } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
// import { useAuth } from "../../../context/AuthContext";
// import loginService from "../../../Services/login.service";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Header() {
  // const { isLogged, setIsLogged } = useAuth();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const closeMenu = () => setShow(false);

  const handleLinkClick = () => {
    closeMenu();
    scrollToTop();
  };

  const navbarClassName = show
    ? "navbar-mobile"
    : "navbar order-last order-lg-0";

  // const logOut = () => {
  //   loginService.Logout();
  //   setIsLogged(false);
  //   navigate("/");
  //   window.location.replace();
  // };

  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <div className="logo me-auto mt-1 d-flex align-items-center">
          <Link
            onClick={scrollToTop}
            className="logotext"
            style={{
              color: "rgb(39, 55, 70)",
              fontWeight: "600",
              marginLeft: "10px",
            }}
            to="/"
          >
            Doorstep Banking Service
          </Link>
        </div>

        <nav id="navbar" className={navbarClassName}>
          <ul className="header">
            <IoCloseSharp onClick={handleShow} className="mobile-nav-toggle" />

            <li>
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/login"
              >
                <button style={{ backgroundColor: "#D02149" }}>Login</button>
              </Link>
            </li>
          </ul>
          <IoIosMenu onClick={handleShow} className="mobile-nav-toggle" />
        </nav>
      </div>
    </header>
  );
}

export default Header;
