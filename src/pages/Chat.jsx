import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket";

function Chat() {
  const { state } = useLocation();

  const buyerId = 1;
  const sellerId = state.sellerId;
  const productId = state.productId;
  const sellerName = state.sellerName || "Seller";

  const roomId = `${productId}_${buyerId}_${sellerId}`;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);

      socket.emit("messageSeen", data);
    });

    socket.on("userStatus", (users) => {
      setOnlineUsers(users);
    });

    socket.on("messageSeenUpdate", (msgId) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === msgId ? { ...msg, seen: true } : msg
        )
      );
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userStatus");
      socket.off("messageSeenUpdate");
    };
  }, []);

  const sendMessage = () => {
    if (!input && !image) return;

    const msgData = {
      roomId,
      sender: buyerId,
      text: input,
      image,
      delivered: true,
      seen: false,
    };

    socket.emit("sendMessage", msgData);
    setMessages((prev) => [...prev, msgData]);

    setInput("");
    setImage(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">

      {/* HEADER */}
      <div className="chat-header">
        <h3>{sellerName}</h3>
        <span style={{marginTop:15}}>
          {onlineUsers.includes(sellerId) ? "🟢 Online" : "⚫ Offline"}
        </span>
      </div>

      {/* MESSAGES */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === buyerId ? "msg buyer" : "msg seller"}
          >
            {msg.text && <p>{msg.text}</p>}

            {msg.image && (
              <img src={msg.image} alt="chat" className="chat-img" />
            )}

            {msg.sender === buyerId && (
              <span className="status">
                {msg.seen ? "✔✔ Seen" : "✔ Delivered"}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type message..."
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(URL.createObjectURL(e.target.files[0]))
          }
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;