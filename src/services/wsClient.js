import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs.min.js";

import apiUrl from "../config/api";

const socketUrl = `${apiUrl}/websocket`;

let stompClient = null;

export const connectWebSocket = (topic) => {
    stompClient = new Client({
        webSocketFactory: () => new SockJS(socketUrl),
        reconnectDelay: 5000,
        onConnect: () => {
            const fullTopic = `/topic/data/${topic}`;
            const trySubscribe = () => {
                if (stompClient.connected) {
                    console.log("📡 Subscribing to:", fullTopic);
                    stompClient.subscribe(fullTopic, (message) => {
                        const payload = JSON.parse(message.body);
                        console.log("📩 Data received:", payload);
                    });
                } else {
                    console.warn("⏳ STOMP not ready, retrying subscribe...");
                    setTimeout(trySubscribe, 200); // thử lại sau 200ms
                }
            };

            trySubscribe();
        },
        onStompError: (err) => {
            console.error("❌ STOMP error", err);
        },
    });

    stompClient.activate();
};
