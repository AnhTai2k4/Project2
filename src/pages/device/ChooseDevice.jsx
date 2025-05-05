import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { useNavigate } from "react-router-dom";
import TopHeader from "../../components/TopHeader/TopHeader";
import "./ChooseDevice.css";
import treeIcon from "../../assets/tree.svg";
import trashIcon from "../../assets/trash.svg";

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
    const [devices, setDevices] = useState([
        { title: "Ban công", color: "#FF8080" },
        { title: "Vườn 1", color: "#F7D060" },
        { title: "Vườn 2", color: "#98D8AA" },
        { title: "Tầng thượng", color: "#888888" },
    ]);
    const navigate = useNavigate();
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
