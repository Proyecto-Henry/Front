"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
        className="text-center"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <Ghost size={80} className="mx-auto text-indigo-400" />
        </motion.div>

        <h1 className="text-5xl font-bold mt-6">¡Oops!</h1>
        <p className="text-lg mt-2 text-gray-300">
          No pudimos encontrar esta página.
        </p>

        <Link href="/" passHref>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl shadow-lg transition-all"
          >
            Volver al inicio
          </motion.a>
        </Link>
      </motion.div>
    </div>
  );
}
