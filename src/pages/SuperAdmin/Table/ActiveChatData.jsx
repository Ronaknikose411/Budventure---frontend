// src/pages/Chat/ActiveChats.jsx
import React, { useEffect, useState } from "react";
 // Assume this provides socket from context
import api from "../../../api/axios";
import { Link } from "react-router-dom";
import { useChat } from "../../../context/useChat";

const ActiveChatData = () => {
  const { socket } = useChat(); // Get socket from context
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveChats();

    if (socket) {
      socket.on('chatAccepted', (updatedChat) => {
        // Add or update the chat in active list
        setActive((prev) => {
          const exists = prev.find((c) => c._id === updatedChat._id);
          if (exists) {
            return prev.map((c) => (c._id === updatedChat._id ? updatedChat : c));
          }
          return [...prev, updatedChat];
        });
      });

      socket.on('chatClosed', (closedChat) => {
        // Remove from active list
        setActive((prev) => prev.filter((c) => c._id !== closedChat._id));
      });

      return () => {
        socket.off('chatAccepted');
        socket.off('chatClosed');
      };
    }
  }, [socket]);

  const fetchActiveChats = async () => {
    try {
      const res = await api.get("/admin-chat/active");
      setActive(res.data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleClose = async (sessionId) => {
    if (!confirm("Close this chat permanently?")) return;

    try {
      const res = await api.post(`/admin-chat/close/${sessionId}`);
      alert(res.data.message); // "Chat closed"
      // No need to refetch; socket will handle removal
    } catch {
      alert("Failed to close chat");
    }
  };

  if (loading) return <div className="text-center py-20 text-2xl">Loading...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-linear-to-r from-green-600 to-teal-600 text-white p-8">
     
      </div>

      {active.length === 0 ? (
        <div className="p-20 text-center text-gray-500 text-2xl">
          No active chats
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-5 text-left">Session ID</th>
              <th className="px-8 py-5 text-left">Messages</th>
              <th className="px-8 py-5 text-left">Status</th>
              <th className="px-8 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {active.map((chat) => (
              <tr key={chat._id} className="border-b hover:bg-green-50">
                <td className="px-8 py-6 font-mono">{chat.userSessionId}</td>
                <td className="px-8 py-6">{chat.messages.length} msgs</td>
                <td className="px-8 py-6">
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-bold">
                    {chat.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-8 py-6 text-center space-x-4">
                  <Link
                    to={`/chat/active/${chat.userSessionId}`}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold"
                  >
                    OPEN CHAT
                  </Link>

                  <button
                    onClick={() => handleClose(chat.userSessionId)}
                    className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-bold"
                  >
                    CLOSE CHAT
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

export default ActiveChatData;