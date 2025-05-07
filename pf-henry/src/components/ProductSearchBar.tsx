'use client';

import { Search } from "lucide-react"; 

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ProductSearchBar = ({ value, onChange }: Props) => (
  <div className="relative mx-auto w-full max-w-2xl mb-6">
    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
    <input
      type="text"
      placeholder="Buscar productos por nombre..."
      className="pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);