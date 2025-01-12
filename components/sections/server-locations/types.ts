export interface ServerLocation {
  name: string;
  location: string;
  status: 'active' | 'inactive';
  ping: number;
  coordinates: {
    x: number;
    y: number;
  };
}