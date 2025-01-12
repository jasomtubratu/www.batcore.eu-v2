import { ServerLocation } from "./types";

export const serverLocations: ServerLocation[] = [
  {
    name: "Prague DC1",
    location: "Prague, Czech Republic",
    status: "active",
    ping: 5,
    coordinates: { x: 45, y: 35 }
  },
  {
    name: "Prague DC2",
    location: "Prague, Czech Republic",
    status: "active",
    ping: 7,
    coordinates: { x: 48, y: 38 }
  },
  {
    name: "Brno DC1",
    location: "Brno, Czech Republic",
    status: "active",
    ping: 8,
    coordinates: { x: 52, y: 45 }
  }
];