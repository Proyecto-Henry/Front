"use client";
import { useState } from 'react';
import { IUser } from '@/interfaces/interfaces';
import { UserDataSummary } from './UserDataSummary';
import { UserSearchBar } from './UserSearchBar';
import { UserCard } from './UserCard';
import { UserRoundX, SearchX } from 'lucide-react';

export const SuperAdmin = () => {
  const initialUsers: IUser[] = [
    {
        id: '1',
        name: "Pepe",
        email: "pepe@empresa.com",
        isActive: true,
        subscriptionType: "premium",
        branchCount: 5,
        lastPaymentDate: "28/04/2025",
        hasPaymentRecord: true,
      },
      {
        id: '2',
        name: "Fulano",
        email: "fulano@correo.com",
        isActive: false,
        subscriptionType: "premium",
        branchCount: 5,
        lastPaymentDate: "28/01/2025",
        hasPaymentRecord: true,
      },
      {
        id: '3',
        name: "Oakí",
        email: "oaki@negocio.com",
        isActive: false,
        subscriptionType: "basic",
        branchCount: 1,
        hasPaymentRecord: false,
      },
      {
        id: '4',
        name: "User 1",
        email: "user1@example.com",
        isActive: true,
        subscriptionType: "basic",
        branchCount: 0,
        hasPaymentRecord: false,
      },
      {
        id: '5',
        name: "Usuario adicional 1",
        email: "adicional1@mail.com",
        isActive: true,
        subscriptionType: "premium",
        branchCount: 3,
        lastPaymentDate: "15/04/2025",
        hasPaymentRecord: true,
      },
      {
        id: '6',
        name: "Usuario adicional 2",
        email: "adicional2@mail.com",
        isActive: false,
        subscriptionType: "basic",
        branchCount: 2,
        lastPaymentDate: "10/03/2025",
        hasPaymentRecord: true,
      }
  ];

  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState<IUser[]>(initialUsers);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const activeUsersCount = users.filter(user => user.isActive).length;

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#fefeff] to-[#4470af]">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">ADMINISTRACIÓN</h1>
        <UserDataSummary 
          active={activeUsersCount} 
          total={users.length} 
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">GESTIÓN DE USUARIOS</h2>
          <UserSearchBar 
            value={searchText} 
            onChange={setSearchText} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.length === 0 ? (
            <div className="col-span-full text-center py-5">
              {users.length === 0 ? (
                <div className="flex flex-col items-center">
                  <UserRoundX className="w-12 h-12 text-white" />
                  <h3 className="text-xl font-medium text-white">
                    No hay usuarios registrados
                  </h3>
                  <p className="text-white">
                    Comienza agregando nuevos usuarios al sistema
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <SearchX className="w-12 h-12 text-white" />
                  <h3 className="text-xl font-medium text-white">
                    No encontramos resultados
                  </h3>
                </div>
              )}
            </div>
          ) : (
            filteredUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onStatusChange={() => toggleUserStatus(user.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};