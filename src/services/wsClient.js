import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs.min.js";
import apiUrl from "../config/api";

const socketUrl = `${apiUrl}/websocket`;

let stompClient = null;

const log = (msg) => console.log("[WebSocket] " + msg);

/**
 * Kết nối WebSocket và gọi callback khi nhận message
 * @param {string} topic - Tên topic để subscribe
 * @param {(message: string) => void} onMessageCallback - Callback để xử lý message
 */
export const connectWebSocket = (topic, onMessageCallback) => {
    stompClient = new Client({
        webSocketFactory: () => new SockJS(socketUrl),
        connectHeaders: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        onConnect: (frame) => {
            log("WebSocket connected: " + frame);
            stompClient.subscribe("/topic/data/" + topic, (message) => {
                log("📨 " + message.body);
                if (
                    onMessageCallback &&
                    typeof onMessageCallback === "function"
                ) {
                    onMessageCallback(message.body);
                }
            });
        },
        onStompError: (frame) => {
            log("STOMP error: " + frame.headers["message"]);
            log("Details: " + frame.body);
        },
        onWebSocketError: (error) => {
            log("WebSocket error: " + error);
        },
    });

    stompClient.activate(); // Bắt đầu kết nối
};

export const disconnectWebSocket = () => {
    if (stompClient && stompClient.active) {
        stompClient.deactivate();
        log("WebSocket disconnected");
    }
};
