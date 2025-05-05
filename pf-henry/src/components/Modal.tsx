"use client";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex flex-col p-6 rounded-lg w-md gap-4 mt-24 w-[350px] h-[500px] bg-gradient-to-b from-[#fefeff] to-[#4470af] rounded-[10px] shadow-[5px_20px_50px_#00000066] overflow-hidden"/* className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative */ >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
