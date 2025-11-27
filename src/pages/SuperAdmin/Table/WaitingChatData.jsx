// src/pages/Chat/WaitingChats.jsx
import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const WaitingChatData = () => {
  const [waiting, setWaiting] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWaitingChats();
    const interval = setInterval(fetchWaitingChats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchWaitingChats = async () => {
    try {
      const res = await api.get("/admin-chat/waiting");
      setWaiting(res.data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (sessionId) => {
    if (!confirm("Accept this chat?")) return;

    try {
      const res = await api.post(`/admin-chat/accept/${sessionId}`);
      alert(res.data.message); // "Chat connected"
      navigate(`/chat/active/${sessionId}`);
    } catch {
      alert("Failed to accept chat");
    }
  };

  if (loading) return <div className="text-center py-20 text-2xl">Loading...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-linear-to-r from-orange-500 to-red-600 text-white p-8">

      </div>

      {waiting.length === 0 ? (
        <div className="p-20 text-center text-gray-500 text-2xl">
          No users waiting
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-5 text-left">Session ID</th>
              <th className="px-8 py-5 text-left">Messages</th>
              <th className="px-8 py-5 text-left">Requested At</th>
              <th className="px-8 py-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {waiting.map((chat) => (
              <tr key={chat._id} className="border-b hover:bg-orange-50">
                <td className="px-8 py-6 font-mono">{chat.userSessionId}</td>
                <td className="px-8 py-6">{chat.messages.length} messages</td>
                <td className="px-8 py-6">
                  {new Date(chat.createdAt).toLocaleString()}
                </td>
                <td className="px-8 py-6 text-center">
                  <button
                    onClick={() => handleAccept(chat.userSessionId)}
                    className="px-10 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold text-lg shadow-lg"
                  >
                    ACCEPT CHAT
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

export default WaitingChatData;