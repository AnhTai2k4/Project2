import "./BottomHeader.css";
import waterIcon from "../../assets/water.svg";
import batteryIcon from "../../assets/battery.svg";
import wifiIcon from "../../assets/wifi.svg";

const BottomHeader = () => {
    return (
        <div className="bottom-header-container">
            <div className="device-group">
                <span>Thiết bị: </span> Ban công
            </div>
            <div className="icon-group">
                <img src={waterIcon} alt="" /> 95%
            </div>
            <div className="icon-group">
                <img src={batteryIcon} alt="" /> 100%
            </div>
            <div className="icon-group">
                <img src={wifiIcon} alt="" /> Good
            </div>
            <div className="update-time">
                <span>Cập nhật lần cuối:</span>
                <span>14/04/2025 22:30</span>
            </div>
        </div>
    );
};

export default BottomHeader;
