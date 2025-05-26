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
import { dataStreamService } from "../../services/dataStreamService";
import "./Machine.css";
import Header from "../../components/Header/Header";
import tempIcon from "../../assets/temp.svg";
import pumpIcon from "../../assets/pump.svg";
import airIcon from "../../assets/humidity_air.svg";
import earthIcon from "../../assets/humidity_earth.svg";
import lightIcon from "../../assets/light.svg";

export default function Machine() {
    const [water, setWater] = useState(50);
    const [temperature, setTemperature] = useState(0);
    const [airHumidity, setAirHumidity] = useState(0);
    const [soilHumidity, setSoilHumidity] = useState(0);
    const [lightIntensity, setLightIntensity] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return;
                }

                // Add device pairs first
                const username = "tai@gmail.com"; // Replace with actual username
                const topics = ['u5/dnull-null', 'air-humidity', 'soil-humidity', 'light-intensity'];
                
                for (const topic of topics) {
                    try {
                        await fetch(`http://localhost:8080/api/device-pair?username=${username}&topic=${topic}`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        console.log(`Added device pair for topic: ${topic}`);
                    } catch (error) {
                        console.error(`Error adding device pair for ${topic}:`, error);
                    }
                }

                // Subscribe to topics
                await dataStreamService.subscribe('u5/dnull-null', token);
                await dataStreamService.subscribe('air-humidity', token);
                await dataStreamService.subscribe('soil-humidity', token);
                await dataStreamService.subscribe('light-intensity', token);

                // Fetch initial data
                const tempData = await dataStreamService.getRecentMessages('u5/dnull-null', token);
                const airHumidityData = await dataStreamService.getRecentMessages('air-humidity', token);
                const soilHumidityData = await dataStreamService.getRecentMessages('soil-humidity', token);
                const lightData = await dataStreamService.getRecentMessages('light-intensity', token);

                // Update state with latest values
                if (tempData && tempData.length > 0) {
                    setTemperature(tempData[tempData.length - 1].value);
                }
                if (airHumidityData && airHumidityData.length > 0) {
                    setAirHumidity(airHumidityData[airHumidityData.length - 1].value);
                }
                if (soilHumidityData && soilHumidityData.length > 0) {
                    setSoilHumidity(soilHumidityData[soilHumidityData.length - 1].value);
                }
                if (lightData && lightData.length > 0) {
                    setLightIntensity(lightData[lightData.length - 1].value);
                }

                // Update chart data
                setChartData(tempData || []);
            } catch (error) {
                console.error('Error fetching data:', error.response?.data || error.message);
            }
        };

        fetchData();

        // Cleanup function to unsubscribe from topics
        return () => {
            dataStreamService.unsubscribe('u5/dnull-null', token);
            dataStreamService.unsubscribe('air-humidity', token);
            dataStreamService.unsubscribe('soil-humidity', token);
            dataStreamService.unsubscribe('light-intensity', token);
        };
    }, [token]);

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
                                <span className="value">{temperature}°C</span>
                            </div>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
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
                                <span className="value">{airHumidity}%</span>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
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
                                <span className="value">{soilHumidity}%</span>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
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
                                <span className="value">{lightIntensity} lux</span>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
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
                                        min={100}
                                        max={1000}
                                        step={50}
                                        value={water}
                                        onChange={(e) => setWater(e.target.value)}
                                        className="schedule-slider"
                                    />
                                    <div className="schedule-slider-label">
                                        {water} ml
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
