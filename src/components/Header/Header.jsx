import BottomHeader from "../BottomHeader/BottomHeader";
import TopHeader from "../TopHeader/TopHeader";
import "./Header.css";

const Header = () => {
    return (
        <div className="header-container">
            <TopHeader />
            <BottomHeader />
        </div>
    );
};

export default Header;
