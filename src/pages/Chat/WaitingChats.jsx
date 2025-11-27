import React, { useEffect, useState } from "react";
import { getWaitingChats, acceptChat } from "../../api/chatApi";
import { useNavigate } from "react-router-dom";

const WaitingChats = () => {
  const [waiting, setWaiting] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadChats = async () => {
    try {
      const res = await getWaitingChats();
      setWaiting(res);
    } catch (err) {
      console.error(err);
      alert("Failed to load waiting chats");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadChats();

    // Auto refresh every 10 seconds
    const interval = setInterval(() => loadChats(), 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (sessionId) => {
    try {
      const res = await acceptChat(sessionId);
      navigate(`/chat/active/${sessionId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to accept chat");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Waiting Chat Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : waiting.length === 0 ? (
        <p>No users are waiting for human support.</p>
      ) : (
        <table width="100%" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Session ID</th>
              <th>Requested At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {waiting.map((item) => (
              <tr key={item._id}>
                <td>{item.userSessionId}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleAccept(item.userSessionId)}>
                    Accept Chat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WaitingChats;
