'use client';

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';
// import type { Socket as SocketType } from 'socket.io-client';
import { Send } from 'lucide-react';

interface Message {
  senderName: string;
  senderRole: string;
  message: string;
}

const StudentChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState('Guest');
  const [userRole, setUserRole] = useState('guest');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Use correct type annotation for socketRef

// const socketRef = useRef<SocketType | null>(null);
const socketRef = useRef<Socket | null>(null);



  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUserName(decoded.fullName || 'User');
        setUserRole(decoded.role || 'student');
        socketRef.current.emit('joinRoom', { userName: decoded.fullName || 'User' });
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    } else {
      socketRef.current.emit('joinRoom', { userName: 'Guest' });
    }

    socketRef.current.on('newMessage', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    socketRef.current?.emit('chatMessage', {
      senderName: userName,
      senderRole: userRole,
      message: newMessage.trim(),
    });

    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-green-700 text-white text-center py-5 text-2xl font-extrabold tracking-wide shadow-lg">
        School Chat Room
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-20">No messages yet. Start the conversation!</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.senderName === userName ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-5 py-3 rounded-3xl shadow-md break-words ${
                msg.senderName === userName
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              <p className="font-semibold text-sm mb-1">
                {msg.senderName}{' '}
                <span className="text-xs italic text-green-200">({msg.senderRole})</span>
              </p>
              <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="flex items-center p-4 bg-white border-t border-gray-300">
        <input
          type="text"
          aria-label="Type a message"
          placeholder="Type your message..."
          className="flex-1 px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          className="ml-3 bg-green-600 hover:bg-green-700 transition-colors text-white p-3 rounded-full flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </footer>
    </div>
  );
};

export default StudentChatPage;
