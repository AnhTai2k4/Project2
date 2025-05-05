import { useNavigate } from "react-router-dom";
import "./Register.css";
import existedIcon from "../../assets/exist.svg";
import newIcon from "../../assets/new.svg";

const Register = () => {
    const navigate = useNavigate();
    return (
        <div className="white-container">
            <div className="register-container">
                <h2>Đăng ký thiết bị</h2>
                <span>
                    Chọn tài khoản bạn muốn sử dụng để theo dõi thiết bị này
                    hoặc tạo tài khoản mới
                </span>
                <div className="cards-group">
                    <div className="form-card">
                        <div className="title">
                            <img src={existedIcon} alt="" /> Thêm thiết bị vào
                            một tài khoản đã tồn tại
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div>
                                    <input type="email" placeholder="Email" />
                                </div>
                            </div>
                            <div className="input-group">
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                navigate("/config");
                            }}
                        >
                            Thêm
                        </button>
                    </div>
                    <div className="form-card">
                        <div className="title">
                            <img src={newIcon} alt="" /> Tạo tài khoản mới
                        </div>
                        <div className="form-group">
                            <div className="name">
                                <div className="input-group">
                                    <div>
                                        <input type="text" placeholder="Tên" />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div>
                                        <input type="text" placeholder="Họ" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group">
                                <div>
                                    <input type="email" placeholder="Email" />
                                </div>
                            </div>
                            <div className="input-group">
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                navigate("/config");
                            }}
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
