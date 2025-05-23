'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BotMessageSquare } from 'lucide-react';
import chatData from '@/utils/chatbot.json';

type Message = {
  sender: 'user' | 'bot';
  text: string;
  isTyping?: boolean;
};

const TypingDots = () => {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-gray-600 rounded-full"
          animate={{
            y: [0, -3, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: '¿Que dudas tienes?' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage: Message = { sender: 'user', text: input };
    const match = chatData.find(entry =>
      entry.keywords.some(keyword =>
        input.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    const botReply: Message = match
      ? { sender: 'bot', text: match.response }
      : { sender: 'bot', text: 'Lo siento, no entendí tu pregunta.' };
   
    setMessages(prev => [...prev, newUserMessage, { sender: 'bot', text: '', isTyping: true }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = botReply;
        return updated;
      });
    }, 2000);
  };

  return (
    <div>
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-700 shadow-lg flex items-center justify-center"
        >
          <BotMessageSquare className="text-white w-7 h-7" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 right-4 w-80 bg-white rounded-xl shadow-2xl p-4 z-50 max-h-[400px] flex flex-col"
            >
        <p className="font-semibold mb-2">
          Hola, soy <span className="text-blue-600 italic font-bold">SafeBot</span>, el chatbot de SafeStock y estoy listo para ayudarte.
        </p>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`p-2 rounded-md text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-100 self-end text-right'
                        : 'bg-gray-100 self-start text-left'
                    }`}
                  >
                    {msg.isTyping ? (
                      <TypingDots />
                    ) : (
                      msg.text
                    )}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-1 rounded-md border text-sm"
                  placeholder="Escribí tu pregunta..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-600 text-sm"
                >
                  Enviar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

