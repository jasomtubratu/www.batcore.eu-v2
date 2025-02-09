export interface ServerLocation {
  id: string;
  name: string;
  location: string;
  ping?: number | string;
  status: 'active' | 'inactive';
  ip: string;
  type: 'vps' | 'minecraft';
  coordinates: {
    x: number;
    y: number;
  };
}