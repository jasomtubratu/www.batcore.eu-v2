export interface ServerLocation {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  ip: string;
  type: 'vps' | 'minecraft';
  coordinates: {
    x: number;
    y: number;
  };
}