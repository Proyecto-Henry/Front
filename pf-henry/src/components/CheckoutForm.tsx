'use client'
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import useUserDataStore from '@/store';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/services/config';
import { toast } from 'sonner';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
export const stripePromise = loadStripe(stripeKey as string);

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPlan, setSelectedPlan] = useState('1 store');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { userData , setUserData, subscription, setSubscription } = useUserDataStore();
  const router = useRouter();

interface Plan {
  amount: number;
  interval: string;
  enumKey: string;
  description: string;
}

  const plans:{[key: string]: Plan} = {
    '1 store': { amount: 10, interval: 'month', enumKey: 'BASIC', description: '1 Store - $10/mes' },
    '2 stores': { amount: 18, interval: 'month', enumKey: 'PLUS', description: '2 Stores - $18/mes' },
    '4 stores': { amount: 30, interval: 'month', enumKey: 'PREMIUM', description: '4 Stores - $30/mes' },
  };

  console.log("UserData fuera del handleSubmit:", userData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
    console.log("Respuesta del backend:", subscription);
    

    if (!stripe || !elements) return;

    setLoading(true);
    setSuccess(false);

    try {
        const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
    setLoading(false);
    alert('Por favor, ingrese la información de la tarjeta.');
    return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
    });

      if (error) {
        console.error('[Stripe error]', error);
        setLoading(false);
        return;
      }

      const planData = plans[selectedPlan];

      const response = await axios.post(`${apiUrl}/subscriptions/createSubscription`, {
        customer: {
            email: userData?.user.email,
            name: userData?.user.name,
        },
        plan: {
          name: selectedPlan,
          amount: planData.amount,
          interval: planData.interval,
        },
        subscription: {
          paymentMethod: paymentMethod.id,
          plan: selectedPlan,
        },
      });

      if (response?.data) {
        setSubscription({...subscription as any,
           ...response.data,
          status: 'active',
        });
        setSuccess(true);
        toast.success('✅ Suscripción creada exitosamente.');
        router.push('/subscription');
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Hubo un error al crear la suscripción.');
    } finally {
      setLoading(false);
      router.push('/subscription');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#fefeff] to-[#4470af]">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
            <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sistema de Gestión</h2>
          <p className='Suscribirse'>Elige tu plan y completa el pago para suscribirte</p>
        </div >
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Selecciona tu plan</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="1 store">1 Store - $10/mes</option>
              <option value="2 stores">2 Stores - $18/mes</option>
              <option value="4 stores">4 Stores - $30/mes</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Detalles de la tarjeta (número, vencimiento, CVC)
            </label>
            <div className="p-3 border border-gray-300 rounded-md">
              <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-700">
              <strong>Plan seleccionado:</strong> {plans[selectedPlan].description}
            </p >
            <p className="text-sm text-gray-700">
              <strong>Monto a pagar:</strong> ${plans[selectedPlan].amount}/mes
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!stripe || loading}
            >
            {loading ? 'Procesando...' : 'Suscribirse'}
          </button>

          {/* {success && (
              <div className='Suscribirse'>
              ✅ Suscripción creada exitosamente!
            </div>
          )} */}

          {/* if (success) {
  toast.success('✅ Suscripción creada exitosamente!')
} */}
        </form>
        </div>

      </div>
    </div>
  );
};