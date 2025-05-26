import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { useNavigate } from "react-router-dom";
import TopHeader from "../../components/TopHeader/TopHeader";
import "./ChooseDevice.css";
import treeIcon from "../../assets/tree.svg";
import trashIcon from "../../assets/trash.svg";
import apiUrl from "../../config/api";

const DeviceCard = ({ title, color, selectDevice, deleteDevice }) => (
    <Card
        sx={{
            height: "300px",
            width: "200px",
            bgcolor: color,
            borderRadius: "16px",
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
                transform: "scale(1.05)",
            },
        }}
        onClick={selectDevice}
    >
        <CardContent
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div className="devices-trash-icon">
                <img
                    src={trashIcon}
                    alt=""
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteDevice();
                    }}
                />
            </div>
            <img src={treeIcon} alt="" />
            <Typography
                variant="h6"
                align="center"
                sx={{ color: "white", marginTop: "20px" }}
            >
                {title}
            </Typography>
        </CardContent>
    </Card>
);

const ChooseDevice = () => {
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(`${apiUrl}/api/login/devices`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const deviceMap = await response.json();
                    // Convert device map to array with colors
                    const deviceList = Object.entries(deviceMap).map(
                        ([deviceName, topic], index) => ({
                            title: deviceName,
                            topic: topic,
                            color: ["#FF8080", "#F7D060", "#98D8AA", "#888888"][
                                index % 4
                            ],
                        })
                    );
                    setDevices(deviceList);
                } else {
                    console.error("Failed to fetch devices");
                }
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        };

        fetchDevices();
    }, [navigate]);

    const handleDelete = (indexToDelete) => {
        const newDevices = devices.filter((_, i) => i !== indexToDelete);
        setDevices(newDevices);
    };

    return (
        <div className="devices-container">
            <TopHeader />
            <div className="devices">
                <Box sx={{ mt: 4, mb: 3 }}>
                    <Typography variant="h6">Xin chào, Username!</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Chọn một trong các thiết bị:
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {devices.map((device, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <DeviceCard
                                title={device.title}
                                color={device.color}
                                selectDevice={() => {
                                    sessionStorage.setItem(
                                        "topic",
                                        device.topic
                                    );
                                    sessionStorage.setItem(
                                        "device",
                                        device.title
                                    );
                                    navigate("/machine");
                                }}
                                deleteDevice={() => {
                                    handleDelete(index);
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default ChooseDevice;
