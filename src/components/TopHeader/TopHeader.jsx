import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import "./TopHeader.css";
import logo from "../../assets/logo.svg";
import menu from "../../assets/menu.svg";
import notify from "../../assets/notify.svg";
import user from "../../assets/user.svg";

const TopHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCloseMenu, setIsCloseMenu] = useState(true);
    const [isCloseUserBox, setIsCloseUserBox] = useState(true);

    return (
        <div className="top-header-container">
            <div
                className={`overlay ${
                    isCloseMenu && isCloseUserBox ? "hidden" : ""
                }`}
                onClick={() => {
                    setIsCloseMenu(true);
                    setIsCloseUserBox(true);
                }}
            ></div>
            <div className={`menu ${isCloseMenu ? "hidden" : ""}`}>
                <div
                    className="page-nav"
                    onClick={() => {
                        navigate("/choose-device");
                        setIsCloseMenu(true);
                    }}
                >
                    {" "}
                    <span>
                        <i className="fa-solid fa-microchip" />
                        Thiết bị
                    </span>
                </div>
                <div
                    className="page-nav"
                    onClick={() => {
                        navigate("/machine");
                        setIsCloseMenu(true);
                    }}
                >
                    <span>
                        <i className="fa-solid fa-droplet"></i>Tưới cây
                    </span>
                </div>
                <div
                    className="page-nav"
                    onClick={() => {
                        navigate("/schedule");
                        setIsCloseMenu(true);
                    }}
                >
                    <span>
                        <i className="fa-regular fa-calendar-days" />
                        Lên lịch
                    </span>
                </div>
            </div>
            <div className={`menu user-box ${isCloseUserBox ? "hidden" : ""}`}>
                <div
                    className="page-nav"
                    onClick={() => {
                        navigate("/login");
                        setIsCloseUserBox(true);
                    }}
                >
                    {" "}
                    <span>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        Đăng xuất
                    </span>
                </div>
                <div
                    className="page-nav"
                    onClick={() => {
                        navigate("/config");
                        setIsCloseUserBox(true);
                    }}
                >
                    {" "}
                    <span>
                        <i className="fa-solid fa-plus"></i>
                        Thêm thiết bị
                    </span>
                </div>
            </div>
            <img src={logo} alt="" />
            <div className="actions-group">
                <img
                    src={menu}
                    alt=""
                    onClick={() => {
                        setIsCloseMenu((pre) => !pre);
                    }}
                    className={
                        location.pathname === "/choose-device" ? "hidden" : ""
                    }
                />
                <img src={notify} alt="" />
                <img
                    src={user}
                    alt=""
                    onClick={() => {
                        setIsCloseUserBox((pre) => !pre);
                    }}
                />
            </div>
        </div>
    );
};

export default TopHeader;
