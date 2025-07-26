'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useSession } from 'next-auth/react';

type Message = {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { data: session } = useSession();

  // Load existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      if (data) setMessages(data as Message[]);
    };
    fetchMessages();
  }, []);

  // Listen for new messages
  useEffect(() => {
    const channel = supabase
      .channel('realtime:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim() || !session?.user) return;
    await supabase.from('messages').insert([
      { content: newMessage.trim(), sender_id: session.user.id }
    ]);
    setNewMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gray-900 text-white p-4 h-[500px] overflow-y-scroll rounded">
        {messages.map(msg => (
          <div key={msg.id} className="mb-2">
            <span className="font-bold">{msg.sender_id.slice(0, 6)}:</span> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
