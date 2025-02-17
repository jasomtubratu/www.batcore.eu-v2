"use client";
import { motion } from "framer-motion";
import { ServerCard } from "./server-card";
import { ServerMap } from "./server-map";
import { serverLocations } from "./data";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function ServerLocations() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingsServer, setPingsServer] = useState<{ id: string; latest_response_time: number | "Timed Out" }[]>([]);
  const { t } = useTranslation();

  // Function to ping servers one by one, updating each as soon as it finishes
  const measurePingAll = async () => {
    setIsButtonDisabled(true);
    setIsPinging(true);

    const updatedPings = [...pingsServer];

    await Promise.all(
      serverLocations.map(async (server) => {
        try {
          // First request (to warm up the connection)
          await fetch(server.pingUrl, { mode: "cors" });

          // Second request for actual ping measurement with timeout
          const start = performance.now();
          const response = await Promise.race([
            fetch(server.pingUrl, { mode: "cors" }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timed Out")), 7000)),
          ]);
          const end = performance.now();
          const elapsed = Math.round(end - start);

          let result: number | "Timed Out" = "Timed Out";
          if (response instanceof Response && (await response.text()) === "Pong") {
            result = elapsed;
          }

          // Update ping results immediately
          setPingsServer((prev) => [...prev.filter((p) => p.id !== server.id), { id: server.id, latest_response_time: result }]);
        } catch (error) {
          setPingsServer((prev) => [...prev.filter((p) => p.id !== server.id), { id: server.id, latest_response_time: "Timed Out" }]);
        }
      })
    );

    setIsPinging(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t("serverLocations.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("serverLocations.description")}</p>
        </motion.div>

        {/* Button to Ping All Servers */}
        <div className="flex justify-center mb-8">
          <button
            onClick={measurePingAll}
            disabled={isButtonDisabled}
            className="px-4 py-2 text-sm bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-600"
          >
            {isButtonDisabled ? "Pinged!" : "Test Ping"}
          </button>
        </div>

        {/* Server List */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <ServerMap locations={serverLocations} />
          <div className="grid gap-4">
            {serverLocations.map((location, index) => {
              const serverPing = pingsServer.find((ping) => ping.id === location.id);

              return (
                <ServerCard
                  key={index}
                  {...location}
                  ping={serverPing?.latest_response_time}
                  isPinging={isPinging && !serverPing}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
