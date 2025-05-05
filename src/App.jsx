import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Config from "./pages/device/Config.jsx";
import ChooseDevice from "./pages/device/ChooseDevice.jsx";
import Machine from "./pages/machine/Machine.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/config" element={<Config />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/choose-device" element={<ChooseDevice />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/machine" element={<Machine />} />
            </Routes>
        </Router>
    );
}

export default App;
