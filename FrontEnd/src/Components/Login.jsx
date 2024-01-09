import React, { useEffect, useState } from "react";
import loginStyle from "./Login.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  loginApi,
  registerApi,
  errorMessage,
  error_message_while_gegistering,
} from "../Redux/action";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errorMesageForReg, errorInLogin } = useSelector(
    (state) => state.data
  );

  const [viewPasswordForLogin, setViewPasswordForLogin] = useState(false);
  const [viewPasswordForRegister, setViewPasswordForRegister] = useState(false);
  const [viewPasswordForPassword, setViewPasswordForPassword] = useState(false);

  const [inputFiledForLoginEmail, setInputFiledForLoginEmail] = useState("");
  const [inputFiledForLoginPassword, setInputFiledForLoginPassword] =
    useState("");
  const [openRegisterPage, setOpenRegisterPage] = useState(true);

  const [jsonForRegister, setJsonForRegister] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
  });

  const handleViewPasswordForLogin = () =>
    setViewPasswordForLogin(!viewPasswordForLogin);

  const handleViewPasswordForRegister = () =>
    setViewPasswordForRegister(!viewPasswordForRegister);

  const handleViewPasswordForPassword = () =>
    setViewPasswordForPassword(!viewPasswordForPassword);

  const handlelogin = (e) => {
    e.preventDefault();
    if (inputFiledForLoginEmail === "" || inputFiledForLoginPassword === "") {
      alert("Field can't be empty!");
    } else {
      dispatch(
        loginApi(
          { email: inputFiledForLoginEmail, pass: inputFiledForLoginPassword },
          redirectToFeed
        )
      );
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const redirectToFeed = () => {
    navigate("/Feed");
  };

  const handleRegister = (e) => {
    dispatch(error_message_while_gegistering(""));
    e.preventDefault();

    let flag = true;

    for (let i in jsonForRegister) {
      if (jsonForRegister[i] === "") {
        flag = false;
        Swal.fire({
          icon: "error",
          title: `${i} can't be null`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    if (jsonForRegister.password === jsonForRegister.conformPassword) {
      flag = true;
    } else {
      flag = false;
      dispatch(
        error_message_while_gegistering(
          "password and conform passowrd is not matching"
        )
      );
    }

    if (flag) {
      dispatch(
        registerApi({
          name: jsonForRegister.name,
          email: jsonForRegister.email,
          pass: jsonForRegister.password,
        })
      );
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleBackToLoginPage = () => {
    setOpenRegisterPage(!openRegisterPage); 
    dispatch(error_message_while_gegistering(""));
    dispatch(errorMessage(""));
  }

  const handleBackToRegister = () => {
    setOpenRegisterPage(!openRegisterPage);
    dispatch(errorMessage(""));
    dispatch(error_message_while_gegistering(""))
  }

  return (
    <>
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <div className={loginStyle.topheader}>
          The dashboard has been crafted by Harsh. The frontend is built with
          React, while the backend is powered by Node.js.
        </div>

        <div className={loginStyle.loginContainer}>
          <div className={loginStyle.loginSecondContainer}>
            <div className={loginStyle.forMobileOnly}>Digital Notebook</div>

            <div className={loginStyle.leftSide}>
              <p>Digital Notebook</p>
            </div>

            <div className={loginStyle.rightSide}>
              {openRegisterPage ? (
                <div className={loginStyle.formStyle}>
                  <div className={loginStyle.formStyleBorder}>
                    <h2
                      style={{
                        textAlign: "center",
                        marginBottom: "5px",
                        color: "#292c31",
                      }}
                    >
                      Login
                    </h2>
                    <form onSubmit={handlelogin}>
                      <div className={loginStyle.formStyleTextField}>
                        <TextField
                          id="outlined-basic"
                          style={{ marginTop: "20px" }}
                          label="Email"
                          fullWidth
                          onChange={(e) => {
                            setInputFiledForLoginEmail(e.target.value);
                            dispatch(errorMessage(""));
                          }}
                          variant="outlined"
                        />
                        <FormControl
                          sx={{ m: 1, width: "100%", marginTop: "20px" }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={viewPasswordForLogin ? "text" : "password"}
                            onChange={(e) => {
                              setInputFiledForLoginPassword(e.target.value);
                              dispatch(errorMessage(""));
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleViewPasswordForLogin}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {viewPasswordForLogin ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                        </FormControl>
                        {errorInLogin !== "" && (
                          <div
                            style={{
                              color: "red",
                              fontWeight: "600",
                              fontSize: "16px",
                            }}
                          >
                            {errorInLogin}
                          </div>
                        )}
                        <button
                          type="submit"
                          className={loginStyle.loginButton}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <p
                      className={loginStyle.registerAndLoginText}
                      onClick={ handleBackToRegister }
                    >
                      Register
                    </p>
                  </div>
                </div>
              ) : (
                <div className={loginStyle.formStyle}>
                  <div className={loginStyle.formStyleBorder}>
                    <h2
                      style={{
                        textAlign: "center",
                        marginBottom: "5px",
                        color: "#292c31",
                      }}
                    >
                      Create Account
                    </h2>
                    <form onSubmit={handleRegister}>
                      <div className={loginStyle.formStyleTextField}>
                        <TextField
                          id="outlined-basic"
                          style={{ marginTop: "20px" }}
                          label="User Name"
                          fullWidth
                          onChange={(e) =>
                            setJsonForRegister({
                              ...jsonForRegister,
                              name: e.target.value,
                            })
                          }
                          variant="outlined"
                        />
                        <TextField
                          id="outlined-basic"
                          style={{ marginTop: "20px" }}
                          label="User Email"
                          fullWidth
                          onChange={(e) =>
                            setJsonForRegister({
                              ...jsonForRegister,
                              email: e.target.value,
                            })
                          }
                          variant="outlined"
                        />

                        <FormControl
                          sx={{ m: 1, width: "100%", marginTop: "20px" }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={viewPasswordForPassword ? "text" : "password"}
                            onChange={(e) =>
                              setJsonForRegister({
                                ...jsonForRegister,
                                password: e.target.value,
                              })
                            }
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleViewPasswordForPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {viewPasswordForPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                        </FormControl>

                        <FormControl
                          sx={{ m: 1, width: "100%", marginTop: "20px" }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Conform Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={viewPasswordForRegister ? "text" : "password"}
                            onChange={(e) =>
                              setJsonForRegister({
                                ...jsonForRegister,
                                conformPassword: e.target.value,
                              })
                            }
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleViewPasswordForRegister}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {viewPasswordForRegister ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Conform Password"
                          />
                        </FormControl>

                        {errorMesageForReg !== "" && (
                          <div
                            style={{
                              color: "red",
                              fontWeight: "600",
                              fontSize: "16px",
                            }}
                          >
                            {errorMesageForReg}
                          </div>
                        )}
                        <button
                          type="submit"
                          className={loginStyle.loginButton}
                        >
                          Register
                        </button>
                      </div>
                    </form>

                    <p
                      className={loginStyle.registerAndLoginText}
                      onClick={ handleBackToLoginPage }
                    >
                      Back To Login
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
