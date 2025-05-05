import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="login-container">
            <img src={logo} alt="" />
            <div className="login-box">
                <span>Đăng nhập</span>
                <div className="form-group">
                    <div className="input-group">
                        <span>Email</span>
                        <div>
                            <i className="fa-solid fa-user"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                    </div>
                    <div className="input-group">
                        <span>Mật khẩu</span>
                        <div>
                            <i className="fa-solid fa-key"></i>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        navigate("/choose-device");
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
    );
};

export default Login;
