"use client";

import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "sonner";
import useUserDataStore from "@/store";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/services/config";

interface Plan {
  amount: number;
  interval: string;
  enumKey: string;
  description: string;
}

const plans: { [key: string]: Plan } = {
  "1 store": {
    amount: 10,
    interval: "month",
    enumKey: "1 store",
    description: "1 Store - $10/mes",
  },
  "2 stores": {
    amount: 18,
    interval: "month",
    enumKey: "2 stores",
    description: "2 Stores - $18/mes",
  },
  "4 stores": {
    amount: 30,
    interval: "month",
    enumKey: "4 stores",
    description: "4 Stores - $30/mes",
  },
};

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { userData, setSubscription, subscription } = useUserDataStore();
  const [selectedPlan, setSelectedPlan] = useState("1 store");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (subscription?.subscription.status === "active") {
      router.push("/chancePlan");
    }
  }, [subscription, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      alert("Por favor, ingresa la información de la tarjeta.");
      return;
    }

    setLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        alert(error.message || "Error con el método de pago.");
        return;
      }

      const planData = plans[selectedPlan];

      const response = await axios.post(
        `${apiUrl}/subscriptions/createSubscription`,
        {
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
            plan: planData.enumKey,
          },
        }
      );

      if (response.data) {
        if (!response.data)
          toast.error("Hubo un error al crear la suscripción.");
        setSubscription(response.data);
        toast.success("✅ Suscripción creada exitosamente.");
        router.push("/chancePlan");
      }
    } catch (err) {
      console.error(err);
      toast.error("Hubo un error al crear la suscripción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#fefeff] to-[#4470af]">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Sistema de Gestión
        </h2>
        <p className="text-center mb-4">
          Elige tu plan y completa el pago para suscribirte
        </p>
        <p className="text-center mb-4">
          Elige tu plan y completa el pago para suscribirte
        </p>

        {subscription?.subscription.status === "cancelled" && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded">
            {" "}
            Tu suscripción actual está <strong>cancelada</strong>. Por favor
            elige un nuevo plan para continuar disfrutando del servicio.
          </div>
        )}
        {subscription?.subscription.status === "trial" && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-800 border border-blue-300 rounded">
            Tu plan actual está en <strong>período de prueba</strong>. Algunas
            funciones pueden estar limitadas. Para aprovechar al máximo todos
            nuestros servicios, te invitamos a elegir uno de nuestros planes
            disponibles.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">
              Selecciona tu plan
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              {Object.entries(plans).map(([key, plan]) => (
                <option key={key} value={key}>
                  {plan.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Detalles de la tarjeta
            </label>
            <div className="p-3 border border-gray-300 rounded-md">
              <CardElement
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>
          </div>

          <div className="text-sm text-gray-700">
            <p>
              <strong>Plan:</strong> {plans[selectedPlan].description}
            </p>
            <p>
              <strong>Pago:</strong> ${plans[selectedPlan].amount}/mes
            </p>
          </div>

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Suscribirse"}
          </button>
        </form>
      </div>
    </div>
  );
};
