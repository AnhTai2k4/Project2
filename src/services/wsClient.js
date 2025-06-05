import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs.min.js";
import apiUrl from "../config/api";

const socketUrl = `${apiUrl}/websocket`;

let stompClient = null;
let connected = false;
let subscribers = [];
let latestMessage = null;

const log = (msg) => console.log("[WebSocket] " + msg);

export const connectWebSocket = (topic) => {
    if (connected || stompClient) return;

    stompClient = new Client({
        webSocketFactory: () => new SockJS(socketUrl),
        connectHeaders: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        onConnect: (frame) => {
            connected = true;
            log("WebSocket connected: " + frame);

            stompClient.subscribe(`/topic/data/${topic}`, (message) => {
                log("📨 " + message.body);
                latestMessage = message.body;

                sessionStorage.setItem("lastSensorData", latestMessage);

                subscribers.forEach((cb) => cb(latestMessage));
            });
        },
        onStompError: (frame) => {
            log("STOMP error: " + frame.headers["message"]);
            log("Details: " + frame.body);
        },
        onWebSocketError: (error) => {
            log("WebSocket error: " + error);
        },
        onDisconnect: () => {
            connected = false;
        },
    });

    stompClient.activate(); // Bắt đầu kết nối
};

export const subscribeToSensorData = (callback) => {
    if (typeof callback === "function") {
        subscribers.push(callback);
        // Gửi dữ liệu mới nhất nếu có
        if (latestMessage) {
            callback(latestMessage);
        } else {
            const cached = sessionStorage.getItem("lastSensorData");
            if (cached) callback(cached);
        }
    }

    return () => {
        subscribers = subscribers.filter((cb) => cb !== callback);
    };
};

export const disconnectWebSocket = () => {
    if (stompClient && stompClient.active) {
        stompClient.deactivate();
        log("WebSocket disconnected");
    }
    stompClient = null;
    connected = false;
    subscribers = [];
};
