// src/app/models/cable.model.ts
export interface Cable {
  id: string;
  name: string;
  fullName: string;
  color: string;
  length: string;
  owners: string;
  rfs: string;
  capacity: string;
  description: string;
  landingPoints: LandingPoint[];
  route: number[][];
  isActive: boolean;
}

export interface LandingPoint {
  name: string;
  coords: [number, number];
}