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

    return (
        <div className="top-header-container">
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
                        <i class="fa-solid fa-droplet"></i>Tưới cây
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
                <img src={user} alt="" />
            </div>
        </div>
    );
};

export default TopHeader;
