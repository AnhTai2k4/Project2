import { PropagateLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import apiUrl from "../../config/api";

const ConfigSuccess = () => {
    const [device, setDevice] = useState(null);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDevice((pre) => ({ ...pre, [name]: value }));
    };

    const handleInput = (e) => {
        const { name } = e.target;
        setErrors({ ...errors, [name]: "" });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (value.trim() === "") {
            setErrors({ ...errors, [name]: "Required" });
            return;
        }
    };

    const handleSetupDevice = async () => {
        setIsLoading(true);
        const sendRequest = async () => {
            return await fetch(`${apiUrl}/api/register/new-device`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Esp8266: "add-device-register",
                },
                body: JSON.stringify({
                    username: jwtDecode(sessionStorage.getItem("token")).sub,
                    deviceName: device?.name,
                    deviceId: device?.id,
                }),
            });
        };

        try {
            let isValid = true;
            for (let prop in device) {
                if (device[prop] === "") {
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
                    sessionStorage.setItem("topic", data.topic);
                    sessionStorage.setItem("device", device.name);
                    sessionStorage.setItem("deviceId", device.id);
                    navigate(`/machine`);
                } else {
                    alert("Unexpected error. Please try again.");
                }
            }
        } catch (e) {
            console.error("Set up device error: ", e);
        } finally {
            setIsLoading(false);
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
            <div className="white-container">
                <div className="config-container">
                    <h2>Thêm thông tin thiết bị</h2>
                    <span>
                        Thiết lập thông tin cơ bản cho thiết bị tưới nước của
                        bạn
                    </span>
                    <div className="form-card">
                        <div className="input-group">
                            <span>Tên thiết bị</span>
                            <div>
                                <i className="fa-solid fa-microchip" />
                                <input
                                    name="name"
                                    type="text"
                                    value={device?.name}
                                    placeholder="Tên thiết bị"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onInput={handleInput}
                                />
                            </div>
                            <span className="error-message">
                                {errors?.name}
                            </span>
                        </div>
                        <div className="input-group">
                            <span>ID thiết bị</span>
                            <div>
                                <i className="fa-solid fa-fingerprint" />
                                <input
                                    name="id"
                                    type="text"
                                    value={device?.id}
                                    placeholder="ID thiết bị (đi kèm khi mua sản phẩm)"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onInput={handleInput}
                                />
                            </div>
                            <span className="error-message">{errors?.id}</span>
                        </div>
                        <button
                            className="icon-btn"
                            onClick={() => {
                                handleSetupDevice();
                            }}
                        >
                            Hoàn tất
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfigSuccess;
