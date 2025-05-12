import { StoreService } from '@/services/storeService';
import Sucursal from '@/components/Sucursal';
import { notFound } from 'next/navigation';
import { IPageProps } from '@/interfaces/interfaces';


export default async function Page({ params: { id } }: IPageProps) {
  try {
    const productos = await StoreService.getProducts(id);
    return <Sucursal productos={productos} store_id={id} />; 
  } catch (error) {
    console.error('Error al cargar productos:', error);
    return notFound(); 
  }
}