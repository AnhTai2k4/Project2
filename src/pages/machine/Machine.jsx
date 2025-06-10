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
import { format } from "date-fns";
import { toast } from "react-toastify";

import "./Machine.css";
import Header from "../../components/Header/Header";
import tempIcon from "../../assets/temp.svg";
import pumpIcon from "../../assets/pump.svg";
import airIcon from "../../assets/humidity_air.svg";
import earthIcon from "../../assets/humidity_earth.svg";
import apiUrl from "../../config/api";
import {
    connectWebSocket,
    subscribeToSensorData,
} from "../../services/wsClient";
import CustomTooltip from "../../components/CustomToolTip/CustomToolTip";

export default function Machine() {
    const [duration, setDuration] = useState(10);
    const [temperature, setTemperature] = useState(0);
    const [airHumidity, setAirHumidity] = useState(0);
    const [soilHumidity, setSoilHumidity] = useState(0);
    const [chartTemp, setChartTemp] = useState([]);
    const [chartAir, setChartAir] = useState([]);
    const [chartSoil, setChartSoil] = useState([]);
    const [historyWatering, setHistoryWatering] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        connectWebSocket(sessionStorage.getItem("topic"));

        const unsubscribe = subscribeToSensorData((message) => {
            try {
                const data = JSON.parse(message);
                setAirHumidity(data.air);
                setSoilHumidity(data.soil);
                setTemperature(data.temp);
            } catch (e) {
                console.error(
                    "Không parse được JSON từ WebSocket:",
                    e,
                    message
                );
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        // setIsLoading(true);
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const sendRequest = async () => {
            const getRecent = async () => {
                return await fetch(
                    `${apiUrl}/api/data-streaming/recent-data?topic=${sessionStorage.getItem(
                        "topic"
                    )}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            };

            try {
                const res = await getRecent();
                const parsed = await res.json();
                parsed.reverse();

                const air = parsed.map((obj) => ({
                    name: obj.timestamp,
                    value: obj.air,
                }));
                const soil = parsed.map((obj) => ({
                    name: obj.timestamp,
                    value: obj.soil,
                }));
                const temp = parsed.map((obj) => ({
                    name: obj.timestamp,
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

        sendRequest();
    }, []);

    const handlePump = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        setIsLoading(true);
        const sendRequest = async (token) => {
            return await fetch(`${apiUrl}/api/watering/start`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    deviceId: sessionStorage.getItem("deviceId"),
                    deviceName: sessionStorage.getItem("device"),
                    duration: duration * 60,
                }),
            });
        };

        try {
            const res = await sendRequest(token);
            if (res.ok) {
                getHistoryWatering();
            }
        } catch (e) {
            console.error("Pump error: ", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStopPump = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        setIsLoading(true);
        const sendRequest = async () => {
            return await fetch(`${apiUrl}/api/watering/stop`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    deviceId: sessionStorage.getItem("deviceId"),
                    deviceName: sessionStorage.getItem("device"),
                    duration: 0,
                }),
            });
        };

        try {
            const res = await sendRequest();
            if (res.ok) {
                toast.success("Dừng bơm thành công", { autoClose: 1000 });
                getHistoryWatering();
            }
        } catch (e) {
            console.error("Pump error: ", e);
        } finally {
            setIsLoading(false);
        }
    };

    const getHistoryWatering = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const sendRequest = async () => {
            return await fetch(
                `${apiUrl}/api/watering/recent-log?deviceId=${sessionStorage.getItem(
                    "deviceId"
                )}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
        };

        try {
            const res = await sendRequest();
            if (res.ok) {
                const data = await res.json();
                setHistoryWatering(data);
            }
        } catch (e) {
            console.error("Get history watering error: ", e);
        }
    };

    useEffect(() => {
        getHistoryWatering();
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
                                    <LineChart
                                        data={chartTemp}
                                        margin={{ bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="name"
                                            tickFormatter={(value) =>
                                                format(
                                                    new Date(value),
                                                    "HH:mm dd/MM"
                                                )
                                            }
                                            tick={{ fontSize: 10 }}
                                            interval={0}
                                            angle={-45}
                                            textAnchor="end"
                                        />
                                        <YAxis width={30} />
                                        <Tooltip
                                            content={
                                                <CustomTooltip
                                                    attribute="Nhiệt độ"
                                                    unit="°C"
                                                />
                                            }
                                        />
                                        {/* <Legend /> */}
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
                                    <LineChart
                                        data={chartAir}
                                        margin={{ bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="name"
                                            tickFormatter={(value) =>
                                                format(
                                                    new Date(value),
                                                    "HH:mm dd/MM"
                                                )
                                            }
                                            tick={{ fontSize: 10 }}
                                            interval={0}
                                            angle={-45}
                                            textAnchor="end"
                                        />
                                        <YAxis width={30} />
                                        <Tooltip
                                            content={
                                                <CustomTooltip
                                                    attribute="Độ ẩm không khí"
                                                    unit="%"
                                                />
                                            }
                                        />
                                        {/* <Legend /> */}
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
                                    <LineChart
                                        data={chartSoil}
                                        margin={{ bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="name"
                                            tickFormatter={(value) =>
                                                format(
                                                    new Date(value),
                                                    "HH:mm dd/MM"
                                                )
                                            }
                                            tick={{ fontSize: 10 }}
                                            interval={0}
                                            angle={-45}
                                            textAnchor="end"
                                        />
                                        <YAxis width={30} />
                                        <Tooltip
                                            content={
                                                <CustomTooltip
                                                    attribute="Độ ẩm đất"
                                                    unit="%"
                                                />
                                            }
                                        />
                                        {/* <Legend /> */}
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
                                <div className="group-btn-pump pump-group">
                                    <button
                                        className="machine-pump-btn"
                                        onClick={handlePump}
                                    >
                                        Bơm ngay
                                    </button>
                                    <button
                                        className="machine-pump-btn"
                                        onClick={handleStopPump}
                                    >
                                        Dừng bơm
                                    </button>
                                </div>
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
                                        {historyWatering?.map(
                                            (watering, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {format(
                                                            new Date(
                                                                watering.executeTime
                                                            ),
                                                            "HH:mm dd/MM"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {(
                                                            watering.duration /
                                                            60
                                                        ).toFixed(2)}{" "}
                                                        phút
                                                    </td>
                                                </tr>
                                            )
                                        )}
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
