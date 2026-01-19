export interface LocationProps {
  location_id: number;
  name?: string;
  latitude: number;
  longitude: number;
}

class Location {
  public readonly location_id: number;
  public readonly name?: string;
  public readonly latitude: number;
  public readonly longitude: number;

  constructor({ location_id, name, latitude, longitude }: LocationProps) {
    this.location_id = location_id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export default Location;
