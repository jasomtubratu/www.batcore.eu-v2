import { ServerLocation } from "./types";

export const serverLocations: ServerLocation[] = [
  {
    id: "cz1",
    name: "CZ1",
    location: "Prague, Czech Republic",
    status: "active",
    type: "minecraft",
    ip: "87.236.197.63",
    coordinates: { x: 5, y: 35 }
  },
  {
    id: "de1",
    name: "DE1",
    location: "Alsdorf, Czech Republic",
    status: "active",
    ip: "de1.batcore.eu",
    type: "vps",
    coordinates: { x: 46, y: 54 }
  }
];