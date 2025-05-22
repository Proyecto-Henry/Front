"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "sonner";
import useUserDataStore from "@/store";
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe("pk_test_xxx...");


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
    enumKey: "BASIC",
    description: "1 Store - $10/mes",
  },
  "2 stores": {
    amount: 18,
    interval: "month",
    enumKey: "PLUS",
    description: "2 Stores - $18/mes",
  },
  "4 stores": {
    amount: 30,
    interval: "month",
    enumKey: "PREMIUM",
    description: "4 Stores - $30/mes",
  },
};

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { userData, setSubscription, subscription } = useUserDataStore();

  const [selectedPlan, setSelectedPlan] = useState("1 store");
  const [loading, setLoading] = useState(false);

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
        console.error("[Stripe error]", error);
        alert(error.message || "Error con el método de pago.");
        return;
      }

      const planData = plans[selectedPlan];
      console.log(planData);

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
        setSubscription({
          ...subscription,
          ...response.data,
          status: "active",
        });
        toast.success("✅ Suscripción creada exitosamente.");
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
