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
  email: string;
  name: string;
  status: 'active' | 'inactive'; 
  storesCount: number;
  subscription: {
    status: string; 
    start_date: string; 
  };
}

export interface IPageProps {
  params: {
    id: string;
  };
}

export interface ICartModalProps {
  cart: Array<{
    id: string;
    name: string;
    price: string;
    cantidad: number;
    stock: number;
  }>;
  total: number;
  onClose: () => void;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCreateSale: () => void;
}

export interface IPropsSearchBar {
  value: string;
  onChange: (value: string) => void;
}

export interface IProducto {
  id: string;
  name: string;
  price: string; 
  stock: number;
  stock_min: number;
  status: boolean;
}

export interface IProductModalProps {
  producto: IProducto;
  onClose: () => void;
  onAddToCart: (producto: IProducto, cantidad: number) => void;
}

export interface ICartItem extends IProducto {
  cantidad: number;
}

export interface ISucursalProps {
  productos: IProducto[];
  store_id: string; 
}