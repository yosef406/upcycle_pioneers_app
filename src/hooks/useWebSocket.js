import { useEffect, useState, useRef } from "react";
export default function useWebSocket(url) {
  const [messages, setMessages] = useState();
  const [connected, setConnected] = useState(false);
  const [ai, setAi] = useState();
  const [error, setError] = useState(null);
  const websocket = useRef(null);

  useEffect(() => {
    // Create WebSocket connection
    if (!connected) websocket.current = new WebSocket(url);

    // Connection opened
    websocket.current.onopen = () => {
      console.log("Connected to WS Server");
      setConnected(true);
      setError(null);
      websocket.current.send(
        JSON.stringify({
          type: "client",
          request: "hand shake",
          message: "",
        })
      );
    };

    // Listen for messages
    websocket.current.onmessage = (event) => {
      console.log("Message from server: ", event.data);
      setMessages((prevMessages) => JSON.parse(event.data).message);
    };

    // Handle errors
    websocket.current.onerror = (event) => {
      console.error("WebSocket error: ", event);
      setError("WebSocket error");
    };

    // Handle WebSocket closure
    websocket.current.onclose = (event) => {
      console.log("Disconnected from WS Server", event.reason);
      setConnected(false);
      setError("WebSocket connection closed");
    };

    // Cleanup on component unmount or url change
    return () => {
      websocket.current.close();
    };
  }, [url]);

  const sendMessage = ({ message, request }) => {
    console.log("sending");
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(
        JSON.stringify({
          type: "client",
          request,
          message,
        })
      );
    } else {
      console.log("WebSocket not connected.");
    }
  };

  return { messages, connected, sendMessage, error };
}
