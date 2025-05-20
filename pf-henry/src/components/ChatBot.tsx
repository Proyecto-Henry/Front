'use client';

import { useState } from "react";
import { BotMessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { adminQuestions, storeQuestions } from "@/utils/questions";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'home' | 'admin' | 'store' | 'answer'>('home');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [lastRole, setLastRole] = useState<'admin' | 'store'>('admin');

  const handleBack = () => {
    if (view === 'answer') {
      setSelectedAnswer(null);
      setSelectedQuestion(null);
      setView(lastRole);
    } else {
      setView('home');
    }
  };

  const handleQuestionClick = (question: string, answer: string) => {
    setSelectedQuestion(question);
    setSelectedAnswer(answer);
    setView('answer');
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
              className="fixed bottom-20 right-4 w-80 bg-white rounded-xl shadow-2xl p-4 z-50 max-h-[400px] overflow-hidden flex flex-col"
            >
              {view === 'home' && (
                <div className="space-y-3">
                  <p className="font-semibold">
                    Hola, soy <span className="text-blue-600 italic font-bold">SafeBot</span>, el chatbot de SafeStock y estoy listo para ayudarte.
                  </p>
                  <button
                    onClick={() => { setView('admin'); setLastRole('admin'); }}
                    className="w-full px-4 py-2 bg-blue-800 text-white rounded-lg"
                  >
                    Administrador
                  </button>
                  <button
                    onClick={() => { setView('store'); setLastRole('store'); }}
                    className="w-full px-4 py-2 bg-blue-800 text-white rounded-lg"
                  >
                    Sucursal
                  </button>
                </div>
              )}

              {view === 'admin' && (
                <div className="space-y-3 overflow-y-auto flex-1">
                  <p className="font-semibold">¿Qué necesitás saber?</p>
                  {adminQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuestionClick(q.question, q.answer)}
                      className="text-left w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              )}

              {view === 'store' && (
                <div className="space-y-3 overflow-y-auto flex-1">
                  <p className="font-semibold">¿Qué necesitás saber?</p>
                  {storeQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuestionClick(q.question, q.answer)}
                      className="text-left w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              )}

              {view === 'answer' && selectedAnswer && (
                <div className="space-y-3 overflow-y-auto flex-1">
                  {selectedQuestion && (
                    <p className="text-gray-800 italic font-semibold">{selectedQuestion}</p>
                  )}
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedAnswer}</p>
                </div>
              )}

              {view !== 'home' && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleBack}
                    className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-400 text-sm"
                  >
                    Volver
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
