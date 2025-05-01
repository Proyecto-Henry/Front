import { IUser } from '@/interfaces/interfaces';

interface Props {
  user: IUser;
  onStatusChange: () => void;
}

export const UserCard = ({ user, onStatusChange }: Props) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-bold text-lg">{user.name}</h4>
      <span className={`px-3 py-1 rounded-full text-xs ${
        user.subscriptionType === "premium" 
          ? "bg-purple-100 text-purple-800" 
          : "bg-blue-100 text-blue-800"
      }`}>
        {user.subscriptionType === "premium" ? "Premium" : "Básico"}
      </span>
    </div>

    <div className="border-t border-gray-200 my-2"></div>

    <div className="space-y-1 text-sm">
      <p>
        <span className="font-medium">Email:</span> {user.email}
      </p>
      <p>
        <span className="font-medium">Estado:</span>
        <span className={user.isActive ? "text-green-600" : "text-red-600"}>
          {user.isActive ? " Activo" : " Inactivo"}
        </span>
      </p>
      <p>
        <span className="font-medium">Sucursales:</span> {user.branchCount}
      </p>
      {user.hasPaymentRecord ? (
        <p>
          <span className="font-medium">Último pago:</span> {user.lastPaymentDate}
        </p>
      ) : (
        <p className="text-gray-500">Sin registros de pago</p>
      )}
    </div>

    <button
      onClick={onStatusChange}
      className={`w-full mt-4 py-2 rounded-md font-medium ${
        user.isActive
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {user.isActive ? "Desactivar cuenta" : "Activar cuenta"}
    </button>
  </div>
);