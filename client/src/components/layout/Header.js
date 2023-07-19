import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reqLogout } from "../../redux/slice";
import toast from "react-hot-toast";
import { Login } from "../Auth/Login";
import { SignUp } from "../Auth/Register";

export const Header = () => {
  const [login, setlogin] = useState(false);
  const [register, setregister] = useState(false);
  const data = useSelector((state) => state.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    toast.success("Logout Successful");
    dispatch(reqLogout());
    setTimeout(() => {
      navigate("/");
    }, 0);
  };
  const handleLogin=()=>{
    setlogin(true)
    console.log(login)
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="link navbar-brand" to="/">
            ALORA
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {!data.user ? (
                <>
                  <li className="nav-item" onClick={() => setregister(true)}>
                    <Link
                      className="nav-link"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={handleLogin} className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {data?.user.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/dashboard/${data?.user.role}`}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link onClick={handleLogout} className="dropdown-item">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/Cart">
                  Cart ({0})
                </Link>
              </li>
            </ul>
            {console.log(login)}
            {login && <Login login={login} setlogin={setlogin} />}
            {register && (
              <SignUp register={register} setregister={setregister} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
