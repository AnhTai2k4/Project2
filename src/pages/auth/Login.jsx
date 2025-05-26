import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

import logo from "../../assets/logo.svg";
import "./Login.css";
import apiUrl from "../../config/api";

const Login = () => {
    const passwordRegex = /^[A-Za-z0-9]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [account, setAccount] = useState(null);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount((pre) => ({ ...pre, [name]: value }));
    };

    const handleInput = (e) => {
        const { name } = e.target;
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const sendRequest = async () => {
            return await fetch(`${apiUrl}/api/login/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Esp8266: "add-device-register",
                },
                body: JSON.stringify({
                    username: account.email,
                    password: account.password,
                }),
            });
        };

        try {
            let isValid = true;
            for (let prop in account) {
                if (account[prop] === "") {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [prop]: "Required",
                    }));

                    isValid = false;
                }
            }
            if (isValid) {
                const res = await sendRequest();
                if (res.status === 200) {
                    const data = await res.json();
                    sessionStorage.setItem("token", data.token);
                    navigate("/choose-device");
                } else if (res.status === 401) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        username: "Invalid username or password",
                    }));
                } else {
                    toast.error("Unexpected error. Please try again.", {
                        autoClose: 3000,
                    });
                }
            }
        } catch (e) {
            console.error("Sign in error: ", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (value.trim() === "") {
            setErrors({ ...errors, [name]: "Required" });
            return;
        }
        switch (name) {
            case "password":
                if (!passwordRegex.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: "Must be at least 8 characters with letter and number, no special or non-ASCII characters.",
                    });
                }
                break;
            case "confirmPassword":
                if (value !== account.password) {
                    setErrors({
                        ...errors,
                        [name]: "The passwords you entered do not match.",
                    });
                }
                break;
            case "email":
                if (!emailRegex.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: "Invalid email address.",
                    });
                }
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div
                className={`dark-overlay overlay overall-overlay ${
                    isLoading ? "" : "hidden"
                }`}
            >
                <PropagateLoader
                    color="#36d7b7"
                    loading={isLoading}
                    size={35}
                />
            </div>
            <div className="login-container">
                <img src={logo} alt="" />
                <div className="login-box">
                    <span>Đăng nhập</span>
                    <div className="form-group">
                        <div className="input-group">
                            <span>Email</span>
                            <div>
                                <i className="fa-solid fa-user"></i>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={account?.email}
                                    onChange={handleChange}
                                    onInput={handleInput}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {errors?.email && (
                                <span className="error-message">
                                    {errors?.email}
                                </span>
                            )}
                        </div>
                        <div className="input-group">
                            <span>Mật khẩu</span>
                            <div>
                                <i className="fa-solid fa-key"></i>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    value={account?.password}
                                    onChange={handleChange}
                                    onInput={handleInput}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {errors?.password && (
                                <span className="error-message">
                                    {errors?.password}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            handleSubmit();
                            // navigate("/choose-device");
                        }}
                    >
                        Đăng nhập
                    </button>
                    <span>
                        Chưa có tài khoản?{" "}
                        <Link to="/register" className="register-action">
                            Đăng ký
                        </Link>
                    </span>
                </div>
            </div>
        </>
    );
};

export default Login;
