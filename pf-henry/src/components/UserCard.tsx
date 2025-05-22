import { IAdmin } from '@/interfaces/interfaces';

interface Props {
  admin: IAdmin;
  onStatusChange: () => void;
}

export const UserCard = ({ admin, onStatusChange }: Props) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-bold text-lg">{admin.name}</h4>
      <span className={`px-3 py-1 rounded-full text-xs ${
        admin.subscription?.status === "premium" 
          ? "bg-purple-100 text-purple-800" 
          : "bg-blue-100 text-blue-800"
      }`}>
        {admin.subscription?.plan}
      </span>
    </div>

    <div className="border-t border-gray-200 my-2"></div>

    <div className="space-y-1 text-sm">
      <p>
        <span className="font-medium">Email:</span> {admin.email || "N/A"}
      </p>
      <p>
        <span className="font-medium">Estado:</span>
        <span className={admin.status === 'active' ? "text-green-600" : "text-red-600"}>
          {admin.status === 'active' ? " Activo" : " Inactivo"}
        </span>
      </p>
           
      {admin.subscription?.start_date ? (
        <p>
          <span className="font-medium">Última actualización:</span> {new Date(admin.subscription.start_date).toLocaleDateString()}
        </p>
      ) : (
        <p className="text-gray-500">Sin registros recientes</p>
      )}
    </div>

    <button
      onClick={onStatusChange}
      className={`w-full mt-4 py-2 rounded-md font-medium ${
        admin.status === 'active'
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {admin.status === 'active' ? "Desactivar cuenta" : "Activar cuenta"}
    </button>
  </div>
);