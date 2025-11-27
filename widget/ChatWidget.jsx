
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import {  getWidgetConfig, createWidgetSession, sendUserMessage, requestHumanSupport, getWidgetHistory  } from '../src/api/widgetApi';

const SOCKET_SERVER_URL = 'http://localhost:7000'; // Match your backend Socket.IO URL

const ChatWidget = () => {
  const [sessionId] = useState(() => {
    let storedSessionId = localStorage.getItem('chatSessionId');
    if (!storedSessionId) {
      storedSessionId = `session_${uuidv4().slice(0, 8)}`; // Generate unique ID
      localStorage.setItem('chatSessionId', storedSessionId);
    }
    return storedSessionId;
  });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isHumanRequested, setIsHumanRequested] = useState(false);
  const [status, setStatus] = useState('ai'); // 'ai', 'waiting', 'connected', 'closed'
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Fetch welcome message and create session
  useEffect(() => {
    const initChat = async () => {
      try {
        const config = await getWidgetConfig();
        setMessages([{ sender: 'ai', text: config.welcomeMessage, timestamp: new Date() }]);

        if (sessionId) {
          await createWidgetSession(sessionId);
          const history = await getWidgetHistory(sessionId);
          setMessages((prev) => [...prev, ...history]);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    if (sessionId) initChat();
  }, [sessionId]);

  // Set up Socket.IO
  useEffect(() => {
    if (sessionId) {
      socketRef.current = io(SOCKET_SERVER_URL);
      socketRef.current.emit('join', sessionId);

      socketRef.current.on('message', (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
        if (newMessage.sender === 'admin') setStatus('connected');
      });

      socketRef.current.on('statusUpdate', (newStatus) => {
        setStatus(newStatus);
        if (newStatus === 'connected') setIsHumanRequested(true);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [sessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      if (!isHumanRequested) {
        // AI mode
        const response = await sendUserMessage(sessionId, input);
        setMessages((prev) => [...prev, response]);
      } else {
        // Human mode: Send via socket
        socketRef.current.emit('message', { room: sessionId, ...userMessage });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleRequestHuman = async () => {
    try {
      await requestHumanSupport(sessionId);
      setIsHumanRequested(true);
      setStatus('waiting');
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Requesting human support...', timestamp: new Date() }]);
    } catch (error) {
      console.error('Error requesting human:', error);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px', background: '#f9f9f9' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <span style={{ background: msg.sender === 'user' ? '#dcf8c6' : '#fff', padding: '8px', borderRadius: '10px', display: 'inline-block' }}>
              {msg.text}
            </span>
            <small style={{ display: 'block', color: '#999' }}>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {status === 'waiting' && <p style={{ textAlign: 'center', color: '#ffa500' }}>Waiting for support...</p>}
      <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ddd' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          placeholder="Type your message..."
          disabled={status === 'closed'}
        />
        <button onClick={handleSendMessage} style={{ marginLeft: '5px', padding: '8px 12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Send
        </button>
      </div>
      {!isHumanRequested && (
        <button onClick={handleRequestHuman} style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', margin: '10px' }}>
          Talk to Human Support
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
