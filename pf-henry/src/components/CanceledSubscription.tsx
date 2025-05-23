"use client";
import React, { useState } from "react";
import useUserDataStore from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiUrl } from "@/services/config";
type Props = {
  onClose: () => void;
};

const CanceledSubscription = ({ onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { subscription, setSubscription } = useUserDataStore();
  const router = useRouter();

  const subscriptionId = subscription?.subscription.external_subscription_id;

  const handleCancel = async () => {
    setLoading(true);
    setMessage("");
    router.refresh();
    // router.push("/subscription");

    try {
      const response = await fetch(
        `${apiUrl}/subscriptions/canceledSubscription/${subscriptionId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Error al cancelar la suscripción");
      }

      const result = await response.json();
      toast.success("✅ Suscripción cancelada exitosamente.");

      setSubscription(result);

      router.push("/subscription");
    } catch (error) {
      console.error(error);
      toast.error("❌ Hubo un error al cancelar la suscripción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 pb-6">
      <h2>Advertenvia</h2>
      <p>
        Una vez cancelada la subscripcion, ya no tendras los beneficios de tu
        plan actual.¿Seguro que quieres cancelar?
      </p>
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={handleCancel}
        disabled={loading}
      >
        {loading ? "Cancelando..." : "Cancelar Suscripción"}
      </button>
      {message && <p className="text-green">{message}</p>}
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-grey-700 bg-grey-600 hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={onClose}
        disabled={loading}
      >
        {"Mejor no"}
      </button>
    </div>
  );
};

export default CanceledSubscription;
