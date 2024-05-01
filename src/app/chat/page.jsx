"use client";
import useWebSocket from "@/hooks/useWebSocket";
import { useEffect, useRef } from "react";
export default function Chat() {
  const { messages, connected, sendMessage, error } = useWebSocket(
    "ws://localhost:5000"
  );

  const messagesRef = useRef();
  const inputRef = useRef(null);
  useEffect(() => {
    if (messagesRef.current) {
      // Add the received message to the messages div with a blue color
      const messageParagraph = document.createElement("p");
      messageParagraph.textContent = messages; // Assuming messages is an array of strings
      messageParagraph.style.color = "blue";
      messagesRef.current.appendChild(messageParagraph);
    }
  }, [messages]);

  const handleSend = () => {
    if (inputRef.current && messagesRef.current) {
      const messageText = inputRef.current.value;
      sendMessage({ message: messageText, request: "newMessage" });

      // Add the sent message to the messages div with a green color
      const messageParagraph = document.createElement("p");
      messageParagraph.textContent = messageText;
      messageParagraph.style.color = "green";
      messagesRef.current.appendChild(messageParagraph);

      inputRef.current.value = "";
    }
  };
  return (
    <>
      <div>
        <div ref={messagesRef}></div>
        <input ref={inputRef} type="text" />
        <button onClick={handleSend}>send</button>
      </div>
    </>
  );
}
