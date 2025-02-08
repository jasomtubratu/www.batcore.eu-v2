import { ServerLocation } from "./types";

export const serverLocations: ServerLocation[] = [
  {
    id: "cz1",
    name: "Prague DC1",
    location: "Prague, Czech Republic",
    status: "active",
    type: "minecraft",
    ip: "87.236.197.63",
    coordinates: { x: 45, y: 35 }
  },
  {
    id: "de1",
    name: "Germany DC1",
    location: "Brno, Czech Republic",
    status: "active",
    ip: "de1.batcore.eu",
    type: "vps",
    coordinates: { x: 52, y: 45 }
  }
];