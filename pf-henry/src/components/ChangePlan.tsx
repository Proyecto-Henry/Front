"use client";
import React, { useState } from "react";
import useUserDataStore from "@/store";
import Modal from "@/utils/Modal";
import CanceledSubscription from "./CanceledSubscription";
import { toast } from "sonner";
import { apiUrl } from "@/services/config";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const ChangePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { subscription, setSubscription, userData } = useUserDataStore();
  const sub = subscription?.subscription;
  const subscriptionId = sub?.external_subscription_id;

  const planMap: { [key: string]: string } = {
    "1 store": "1 store",
    "2 stores": "2 stores",
    "4 stores": "4 stores",
  };

  const handleChangePlan = async () => {
    if (!selectedPlan) {
      setMessage("❗Selecciona un plan primero.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${apiUrl}/subscriptions/changePlan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription_id: subscriptionId,
          planId: planMap[selectedPlan],
        }),
      });

      if (!response.ok) throw new Error("Error al cambiar el plan.");

      const result = await response.json();
      setSubscription(result);
      toast.success("✅ Plan cambiado correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error al cambiar el plan.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), "PPPp", { locale: es });

  const statusColor = {
    active: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    trial: "bg-yellow-100 text-yellow-700",
    default: "bg-gray-100 text-gray-700",
  }[sub?.status ?? "default"];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#fefeff] to-[#4470af]">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Hola, {userData?.user.name}
        </h1>

        <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Información de tu suscripción
          </h2>
          <p>
            <span className="font-medium">Plan actual:</span>{" "}
            <span className="text-blue-600 font-semibold">{sub?.plan}</span>
          </p>
          <p>
            <span className="font-medium">Estado:</span>{" "}
            <span className={`inline-block px-2 py-1 rounded ${statusColor}`}>
              {sub?.status}
            </span>
          </p>
          <p>
            <span className="font-medium">Inicio:</span>{" "}
            {formatDate(sub!.start_date)}
          </p>
          <p>
            <span className="font-medium">Finaliza:</span>{" "}
            {formatDate(sub!.end_date)}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">Cambiar Plan</h2>

          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Seleccionar nuevo plan --</option>
            <option value="1 store">BASIC (1 tienda)</option>
            <option value="2 stores">PLUS (2 tiendas)</option>
            <option value="4 stores">PREMIUM (4 tiendas)</option>
          </select>

          <button
            onClick={handleChangePlan}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center"
          >
            {loading ? "Procesando..." : "Cambiar Plan"}
          </button>

          {message && <p className="text-red-500">{message}</p>}

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Cancelar suscripción
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CanceledSubscription onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ChangePlan;
