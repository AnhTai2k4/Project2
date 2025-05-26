import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useState } from "react";

import "./Config.css";

const Config = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const checkConfigWifi = () => {
        setIsLoading(true);
        fetch("http://192.168.4.1", { mode: "no-cors" })
            .then(() => {
                window.location.href = "http://192.168.4.1";
            })
            .catch((e) => {
                alert(
                    "Bạn chưa kết nối WiFi ESP_Config. Vui lòng kết nối và thử lại."
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
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
            <div className="white-container">
                <div className="config-container">
                    <h2>Cấu hình thiết bị</h2>
                    <span>
                        Kết nối thiết bị tưới nước tự động của bạn đến mạng WiFi
                    </span>
                    <div className="form-card">
                        <p>
                            Bước 1: Kết nối tới WiFi <strong>ESP_Config</strong>{" "}
                            mà bạn muốn cấu hình.
                        </p>
                        <p>
                            Bước 2: Sau đó quay lại đây và bấm nút xác nhận bên
                            dưới
                        </p>
                        <p>
                            (<strong>Lưu ý:</strong> Nếu bạn đang cấu hình nhiều
                            thiết bị tưới cây cùng lúc, hãy đảm bảo chỉ có{" "}
                            <strong>01</strong> thiết bị được bật tại một thời
                            điểm!){" "}
                        </p>
                        <button
                            className="icon-btn"
                            onClick={() => {
                                checkConfigWifi();
                            }}
                        >
                            Tôi đã kết nối với ESP_Config
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Config;
