export type Location = {
  id?: number;          // Location ID from database (internal use)
  label: string;        // "Koti", "Mökki", "Helsinki"
  latitude: number;
  longitude: number;
};