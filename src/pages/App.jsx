import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import Config from "./components/device/Config.jsx";
import ChooseDevice from "./components/device/ChooseDevice.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/config" element={<Config />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/choose-device" element={<ChooseDevice />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
