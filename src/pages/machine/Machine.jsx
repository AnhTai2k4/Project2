import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { useState } from "react";

import "./Machine.css";
import Header from "../../components/Header/Header";
import tempIcon from "../../assets/temp.svg";
import pumpIcon from "../../assets/pump.svg";
import airIcon from "../../assets/humidity_air.svg";
import earthIcon from "../../assets/humidity_earth.svg";
import lightIcon from "../../assets/light.svg";

export default function Machine() {
    const [water, setWater] = useState(50);

    const data = [
        { name: "Day 1", value: 400 },
        { name: "Day 2", value: 300 },
        { name: "Day 3", value: 500 },
        { name: "Day 4", value: 420 },
        { name: "Day 5", value: 100 },
        { name: "Day 6", value: 265 },
        { name: "Day 7", value: 350 },
        { name: "Day 8", value: 510 },
        { name: "Day 9", value: 370 },
    ];

    return (
        <div className="machine-root">
            <Header />
            <div className="machine-main scrollable">
                <div className="machine-cards">
                    <div className="machine-row">
                        {/* Nhiệt độ */}
                        <div className="machine-card top1">
                            <div className="machine-card-header">
                                <img src={tempIcon} alt="" />
                                <span className="label">Nhiệt độ</span>
                                <span className="value">27.5°C</span>
                            </div>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    {/* <XAxis dataKey="name" /> */}
                                    <YAxis width={30} />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Độ ẩm không khí */}
                        <div className="machine-card top2">
                            <div className="machine-card-header">
                                <img src={airIcon} alt="" />
                                <span>Độ ẩm không khí</span>
                                <span className="value">68%</span>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    {/* <XAxis dataKey="name" /> */}
                                    <YAxis width={30} />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="machine-row">
                        {/* Độ ẩm đất */}
                        <div className="machine-card top4">
                            <div className="machine-card-header">
                                <img src={earthIcon} alt="" />
                                <span>Độ ẩm đất</span>
                                <span className="value">42%</span>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    {/* <XAxis dataKey="name" /> */}
                                    <YAxis width={30} />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Cường độ ánh sáng */}
                        <div className="machine-card top5">
                            <div className="machine-card-header">
                                <img src={lightIcon} alt="" />
                                <span>Cường độ ánh sáng</span>
                                <span className="value">825 lux</span>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    {/* <XAxis dataKey="name" /> */}
                                    <YAxis width={30} />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                {/* Card bơm nước */}
                <div className="machine-pump-col">
                    <div className="machine-card top3 machine-pump-card">
                        <div style={{ width: "100%", marginBottom: 8 }}>
                            <div className="pump-group">
                                <img
                                    src={pumpIcon}
                                    alt=""
                                    className="pump-icon"
                                />
                                <label style={{ width: "100%" }}>
                                    <input
                                        type="range"
                                        min={100}
                                        max={1000}
                                        step={50}
                                        // value={form.amount}
                                        // onChange={handleAmountChange}
                                        className="schedule-slider"
                                    />
                                    <div className="schedule-slider-label">
                                        500 ml
                                    </div>
                                </label>
                            </div>
                            <button className="machine-pump-btn">
                                Bơm ngay
                            </button>
                        </div>
                        <div style={{ width: "100%" }}>
                            <table className="machine-pump-table">
                                <thead>
                                    <tr>
                                        <th>Thời điểm</th>
                                        <th>Lượng nước</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>14/04/2025 22:30</td>
                                        <td>100 ml</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
