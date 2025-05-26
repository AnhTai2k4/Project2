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
import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

import { dataStreamService } from "../../services/dataStreamService";
import "./Machine.css";
import Header from "../../components/Header/Header";
import tempIcon from "../../assets/temp.svg";
import pumpIcon from "../../assets/pump.svg";
import airIcon from "../../assets/humidity_air.svg";
import earthIcon from "../../assets/humidity_earth.svg";
import lightIcon from "../../assets/light.svg";
import apiUrl from "../../config/api";

export default function Machine() {
    const [duration, setDuration] = useState(10);
    const [temperature, setTemperature] = useState(0);
    const [airHumidity, setAirHumidity] = useState(0);
    const [soilHumidity, setSoilHumidity] = useState(0);
    const [lightIntensity, setLightIntensity] = useState(0);
    const [chartTemp, setChartTemp] = useState([]);
    const [chartAir, setChartAir] = useState([]);
    const [chartSoil, setChartSoil] = useState([]);
    const [chartLight, setChartLight] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const token = sessionStorage.getItem("token");

        const sendRequest = async () => {
            const getRecent = async (token) => {
                return await fetch(
                    `${apiUrl}/api/data-streaming/recent?topic=u5/dnull-null`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            };

            const subcribe = async (token) => {
                return await fetch(
                    `${apiUrl}/api/data-streaming/subscribe?topic=u5/dnull-null`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            };

            try {
                const res = await getRecent(token);
                const data = await res.json();
                const parsed = data.map((item) => JSON.parse(item));

                const air = parsed.map((obj, index) => ({
                    name: `Day ${index + 1}`,
                    value: obj.air,
                }));
                const soil = parsed.map((obj, index) => ({
                    name: `Day ${index + 1}`,
                    value: obj.soil,
                }));
                const temp = parsed.map((obj, index) => ({
                    name: `Day ${index + 1}`,
                    value: obj.temp,
                }));
                setChartAir(air);
                setChartSoil(soil);
                setChartTemp(temp);
            } catch (e) {
                console.error("Get recent error: ", e);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) sendRequest();
    }, []);

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
                                    <span className="value">
                                        {temperature}°C
                                    </span>
                                </div>

                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={chartTemp}>
                                        <CartesianGrid strokeDasharray="3 3" />
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
                                    <span className="value">
                                        {airHumidity}%
                                    </span>
                                </div>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={chartAir}>
                                        <CartesianGrid strokeDasharray="3 3" />
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
                                    <span className="value">
                                        {soilHumidity}%
                                    </span>
                                </div>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={chartSoil}>
                                        <CartesianGrid strokeDasharray="3 3" />
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
                                    <span className="value">
                                        {lightIntensity} lux
                                    </span>
                                </div>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={chartLight}>
                                        <CartesianGrid strokeDasharray="3 3" />
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
                                            min={0.5}
                                            max={60}
                                            step={0.5}
                                            value={duration}
                                            onChange={(e) =>
                                                setDuration(e.target.value)
                                            }
                                            className="schedule-slider"
                                        />
                                        <div className="schedule-slider-label">
                                            {duration} phút
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
                                            <th>Khoảng thời gian bơm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>14/04/2025 22:30</td>
                                            <td>10 phút</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
