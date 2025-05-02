export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ProtectedPageProps{
  children: React.ReactNode;
}

export interface IAdmin {
  id: string;
  name: string;
  status: 'active' | 'inactive'; 
  storesCount: number;
  subscription: {
    status: string; 
    start_date: string; 
  };
}