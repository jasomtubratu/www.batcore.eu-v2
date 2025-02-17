import { ServerLocation } from "./types";

export const serverLocations: ServerLocation[] = [
  {
    id: "2954010", //betterstack
    name: "CZ1",
    location: "Prague, Czech Republic",
    pingUrl: "https://cz1.batcore.eu:2386/",
    status: "active",
    type: "minecraft",
    ip: "87.236.197.63",
    coordinates: { x: 5, y: 35 }
  },
  {
    id: "2953470", //betterstack
    name: "DE1",
    location: "Alsdorf, Germany",
    status: "active",
    pingUrl: "https://vps.batcore.eu/ping",
    ip: "de1.batcore.eu",
    type: "vps",
    coordinates: { x: 46, y: 54 }
  }
];