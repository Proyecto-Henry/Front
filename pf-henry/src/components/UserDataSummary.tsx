interface Props {
    active: number;
    total: number;
  }
  
  export const UserDataSummary = ({ active, total }: Props) => (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
          <span className="text-gray-700 font-medium">Usuarios activos:</span>
          <span className="text-blue-800 font-bold text-xl">{active}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-red-50 rounded">
          <span className="text-gray-700 font-medium">Usuarios inactivos:</span>
          <span className="text-red-700 font-bold text-xl">{total - active}</span>
        </div>
      </div>
    </div>
  );