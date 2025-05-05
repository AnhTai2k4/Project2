import "./TopHeader.css";
import logo from "../../assets/logo.svg";
import menu from "../../assets/menu.svg";
import notify from "../../assets/notify.svg";
import user from "../../assets/user.svg";

const TopHeader = () => {
    return (
        <div className="top-header-container">
            <img src={logo} alt="" />
            <div className="actions-group">
                <img src={menu} alt="" />
                <img src={notify} alt="" />
                <img src={user} alt="" />
            </div>
        </div>
    );
};

export default TopHeader;
