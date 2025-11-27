// src/pages/SuperAdmin/Table/ChatHistoryData.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatHistoryData = () => {
  const [sessions, setSessions] = useState([]);        // All sessions list
  const [messages, setMessages] = useState([]);        // Selected session messages
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Load all chat sessions on mount
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/widget/history");
        setSessions(res.data);
      } catch (error) {
        console.error("Error loading sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  // 2️⃣ Load messages for chosen session
  const loadMessages = async (sessionId) => {
    setSelectedSession(sessionId);
    setMessages([]); // clear previous chat

    try {
      const res = await axios.get(
        `http://localhost:7000/api/widget/history/${sessionId}`
      );
      setMessages(res.data);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 border">

      {/* TITLE */}
      <h3 className="text-2xl font-bold mb-4 text-purple-700">
        Chat History Panel
      </h3>

      {/* 1️⃣ Show All Sessions */}
      <h4 className="text-lg font-semibold mb-2">All Chat Sessions</h4>

      {loading ? (
        <p className="text-gray-500 text-center py-3">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-gray-500 text-center py-3">No chat sessions found.</p>
      ) : (
        <table className="w-full mb-6 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Session ID</th>
              <th className="p-2 border">Total Messages</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((s) => (
              <tr key={s.session_id} className="text-center">
                <td className="p-2 border">{s.session_id}</td>
                <td className="p-2 border">{s.messages?.length || 0}</td>
                <td className="p-2 border">
                  <button
                    className="px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                    onClick={() => loadMessages(s.session_id)}
                  >
                    View Chat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 2️⃣ Show Messages of Selected Session */}
      {selectedSession && (
        <>
          <h4 className="text-lg font-semibold mb-2">
            Chat Messages – {selectedSession}
          </h4>

          {messages.length === 0 ? (
            <p className="text-gray-500">No messages found.</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Sender</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Time</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id} className="text-center">
                    <td
                      className={`p-2 border font-semibold ${
                        msg.sender === "user"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {msg.sender.toUpperCase()}
                    </td>

                    <td className="p-2 border text-left">{msg.text}</td>

                    <td className="p-2 border">
                      {new Date(msg.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ChatHistoryData;
