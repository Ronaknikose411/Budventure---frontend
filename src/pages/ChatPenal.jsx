// src/pages/ChatPenal.jsx

import React, { useState } from "react";
import WaitingChatData from "./SuperAdmin/Table/WaitingChatData";
import ActiveChatData from "./SuperAdmin/Table/ActiveChatData";
import ChatHistoryData from "./SuperAdmin/Table/ChatHistoryData"; // 🔥 NEW

const ChatPenal = () => {
  const [activeTab, setActiveTab] = useState("waiting");

  const waitingCount = 0;
  const activeCount = 0;
  const historyCount = 0; // you can get this from API

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-center mb-8
         bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Admin Chat Panel
      </h1>

      {/* FILTER DROPDOWN */}
      <div className="flex justify-center mb-6">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="
            px-4 py-2 text-lg font-semibold
            border border-gray-300 rounded-lg bg-white
            text-gray-800 shadow-sm
            hover:border-gray-400 
            focus:ring-2 focus:ring-purple-300
            transition-all
          "
        >
          <option value="waiting">Waiting Chats</option>
          <option value="active">Active Chats</option>
          <option value="history">Chat History</option> {/* 🔥 NEW */}
        </select>
      </div>

      {/* HEADER STRIP */}
      <div className="flex justify-between items-center mb-4 p-4
          bg-white rounded-lg shadow-sm border">

        <h2 className="text-xl font-bold text-gray-700">
          {activeTab === "waiting"
            ? "Waiting for Human Support"
            : activeTab === "active"
            ? "Active Chats"
            : "All Chat History"}
        </h2>

        <span className="text-lg font-semibold text-purple-600">
          {activeTab === "waiting"
            ? `${waitingCount} request(s)`
            : activeTab === "active"
            ? `${activeCount} ongoing`
            : `${historyCount} total`}
        </span>
      </div>

      {/* CONTENT */}
      <div className="mt-4">
        {activeTab === "waiting" && <WaitingChatData />}
        {activeTab === "active" && <ActiveChatData />}
        {activeTab === "history" && <ChatHistoryData />} {/* 🔥 NEW */}
      </div>
    </div>
  );
};

export default ChatPenal;
