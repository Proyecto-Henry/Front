"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm, stripePromise } from "@/components/CheckoutForm";
import ChangePlan from "./ChangePlan";
import useUserDataStore from "@/store";
import axios from "axios";
import { apiUrl } from "@/services/config";

const Subscription = () => {
  const { userData, isHydrated, subscription, setSubscription } =
    useUserDataStore();
  console.log("userData:", userData);

  const [loading, setLoading] = useState(true);

  const userId = userData?.user?.id;

  useEffect(() => {
    if (!isHydrated || !userId) return;
    const fetchSubscription = async () => {
      try {
        const res = await axios.get(`${apiUrl}/subscriptions/admin/${userId}`);
        console.log("Respuesta del backend:", res.data);

        setSubscription(res.data);

        console.log("subscripcion:", subscription);
        console.log("Subscripción cargada:", res.data);
      } catch (err) {
        console.error("Error al cargar subscripción:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [isHydrated, userId, setSubscription]);

  if (loading) return <div>Cargando subscripción...</div>;

  return (
    <Elements stripe={stripePromise}>
      {(subscription?.success === true || subscription?.status === "trial") && (
        <CheckoutForm />
      )}
      {subscription?.status === "active" && <ChangePlan />}
      {!subscription?.status && (
        <div>No se encontró información de subscripción.</div>
      )}
    </Elements>
  );
};

export default Subscription;
