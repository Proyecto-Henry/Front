'use client'
import React, { use, useState } from 'react';
import useUserDataStore from '@/store';
import Modal from '@/utils/Modal';
import CanceledSubscription from './CanceledSubscription';
import { toast } from 'sonner';
import { apiUrl } from '@/services/config';



const ChangePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { userData, subscription, setSubscription } = useUserDataStore();

  // Subscription ID hardcodeado
//   const subscriptionId = 'sub_1RMDiUBdMx2Sby7CscArRyFi';
  const subscriptionId = subscription?.external_subscription_id;
  console.log(subscriptionId);
  

  const planMap: { [key: string]: string } = {
    '1 store': 'BASIC',
    '2 stores': 'PLUS',
    '4 stores': 'PREMIUM',
  };

  const handleChangePlan = async () => {
    if (!selectedPlan) {
      setMessage('❗Selecciona un plan primero.');
      return;
    }

    const planId = planMap[selectedPlan];

    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${apiUrl}/subscriptions/changePlan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_id: subscriptionId,
          planId: selectedPlan,
        //   planId: planId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar el plan.');
      }

      setSubscription(await response.json());
      toast.success('✅ Plan cambiado correctamente.');
    } catch (error) {
      console.error(error);
      toast.error('❌ Error al cambiar el plan.');
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#fefeff] to-[#4470af]">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cambiar Plan</h2>
          <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">-- Seleccionar plan --</option>
            <option value="1 store">BASIC (1 store)</option>
            <option value="2 stores">PLUS (2 stores)</option>
            <option value="4 stores">PREMIUM (4 stores)</option>
          </select>

            {/* <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
  <option value="">-- Seleccionar plan --</option>
  <option value="BASIC">BASIC (1 store)</option>
  <option value="PLUS">PLUS (2 stores)</option>
  <option value="PREMIUM">PREMIUM (4 stores)</option>
</select> */}

          <button onClick={handleChangePlan} disabled={loading} className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center">
            {loading ? 'Procesando...' : 'Cambiar Plan'}
          </button>
          {message && <p>{message}</p>}

  <button onClick={() => setIsModalOpen(true)} className="mt-4 text-blue-600 hover:text-blue-800 transition-colors underline">
    Cancelar subscripcion
  </button>
  </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CanceledSubscription  onClose={() => setIsModalOpen(false)} />
        </Modal>
        </div>
    </div>
      );
};

export default ChangePlan;