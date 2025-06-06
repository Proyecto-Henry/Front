import { UserRoundSearch } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const UserSearchBar = ({ value, onChange }: Props) => (
  <div className="relative mx-auto w-full max-w-md">
    <UserRoundSearch className="absolute left-3 top-2.5 text-gray-400" />
    <input
      type="text"
      placeholder="Buscar por nombre o email..."
      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);