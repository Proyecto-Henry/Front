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

export interface IUser {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  subscriptionType: "premium" | "basic";
  branchCount: number;
  lastPaymentDate?: string;
  hasPaymentRecord: boolean;
}