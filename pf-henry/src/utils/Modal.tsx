"use client";

import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalCreate({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4 relative shadow-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()} // evitar cerrar al hacer click dentro
      >
        <button
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-200 transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-red-600" />
        </button>
        {children}
      </div>
    </div>
  );
}
