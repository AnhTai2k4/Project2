import { useNavigate } from "react-router-dom";
import "./Config.css";

const Config = () => {
    const navigate = useNavigate();
    return (
        <div className="white-container">
            <div className="config-container">
                <h2>Cấu hình thiết bị</h2>
                <span>
                    Kết nối thiết bị tưới nước tự động của bạn đến mạng WiFi
                </span>
                <div className="form-card">
                    <div className="select-group">
                        <span>Mạng WiFi có sẵn</span>
                        <div>
                            <i className="fa-solid fa-wifi"></i>
                            <select>
                                <option value="" disabled selected>
                                    Chọn WiFi
                                </option>
                            </select>
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
                    <div className="input-group">
                        <span>Tên thiết bị</span>
                        <div>
                            <i class="fa-solid fa-microchip"></i>
                            <input type="text" placeholder="Tên thiết bị" />
                        </div>
                    </div>
                    <button
                        className="icon-btn"
                        onClick={() => {
                            navigate("/machine");
                        }}
                    >
                        Connect{" "}
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Config;
