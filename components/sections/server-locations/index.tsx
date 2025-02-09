"use client";
import { motion } from "framer-motion";
import { ServerCard } from "./server-card";
import { ServerMap } from "./server-map";
import { serverLocations } from "./data";
import { useEffect, useState } from "react";

export function ServerLocations() {
  const [pingsServer, setPingsServer] = useState<{ id: string; latest_response_time: number }[]>([]);

  useEffect(() => {
    fetch("/api/ping")
      .then((res) => res.json())
      .then((data) => {
        setPingsServer(data);
      });
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Server Locations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Strategically positioned servers for optimal performance and minimal latency.
          </p>
        </motion.div>

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
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
