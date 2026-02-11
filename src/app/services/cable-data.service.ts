import { Injectable } from '@angular/core';

export interface LandingPoint {
  name: string;
  coords: [number, number];
}

export interface CableSystem {
  id: string;
  name: string;
  fullName: string;
  color: string;
  length: string;
  owners: string;
  rfs: string;
  capacity: string;
  landingPoints: LandingPoint[];
  route: [number, number][];
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CableDataService {
  private cables: { [key: string]: CableSystem } = {
    sacs: {
      id: 'sacs',
      name: 'SACS',
      fullName: 'South Atlantic Cable System',
      color: '#1a73e8',
      length: '6,165 km',
      owners: 'Angola Cables',
      rfs: '2018',
      capacity: '40 Tbps',
      landingPoints: [
        { name: 'Sangano (Luanda), Angola', coords: [-9.53333, 13.2167] },
        { name: 'Fortaleza, Brazil', coords: [-3.7404, -38.4537] },
        { name: 'Fernando de Noronha, Brazil', coords: [-3.8538, -32.4238] }
      ],
      route: [
        [-9.53333, 13.2167],
        [-3.8538, -32.4238],
        [-3.7404, -38.4537]
      ],
      description: 'Angola Cables flagship project - the first submarine cable system to directly connect Africa and South America across the South Atlantic Ocean.'
    },
    monet: {
      id: 'monet',
      name: 'MONET',
      fullName: 'MONET Submarine Cable System',
      color: '#ff6b35',
      length: '10,556 km',
      owners: 'Angola Cables, Algar Telecom, Antel Uruguay',
      rfs: '2017',
      capacity: '64 Tbps',
      landingPoints: [
        { name: 'Fortaleza, Brazil', coords: [-3.7404, -38.4537] },
        { name: 'Santos, Brazil', coords: [-23.96, -46.33] },
        { name: 'Miami, USA', coords: [25.761, -80.191] },
        { name: 'Boca Raton, USA', coords: [26.35, -80.08] }
      ],
      route: [
        [-3.7404, -38.4537],
        [-23.96, -46.33],
        [25.761, -80.191],
        [26.35, -80.08]
      ],
      description: 'A key part of Angola Cables global network, connecting Brazil to the United States with high-capacity optical fiber.'
    },
    wacs: {
      id: 'wacs',
      name: 'WACS',
      fullName: 'West Africa Cable System',
      color: '#34a853',
      length: '14,530 km',
      owners: 'Consortium including Angola Cables',
      rfs: '2012',
      capacity: '5.12 Tbps',
      landingPoints: [
        { name: 'Yzerfontein, South Africa', coords: [-33.343, 18.162] },
        { name: 'Swakopmund, Namibia', coords: [-22.677, 14.527] },
        { name: 'Muanda, DRC', coords: [-5.933, 12.35] },
        { name: 'Pointe-Noire, Congo', coords: [-4.778, 11.863] },
        { name: 'Limbe, Cameroon', coords: [4.016, 9.206] },
        { name: 'Lagos, Nigeria', coords: [6.43, 3.53] },
        { name: 'Accra, Ghana', coords: [5.55, -0.2] },
        { name: 'Abidjan, Ivory Coast', coords: [5.317, -4.033] },
        { name: 'Praia, Cape Verde', coords: [14.933, -23.513] },
        { name: 'Lisbon, Portugal', coords: [38.722, -9.139] }
      ],
      route: [
        [-33.343, 18.162],
        [-22.677, 14.527],
        [-5.933, 12.35],
        [-4.778, 11.863],
        [4.016, 9.206],
        [6.43, 3.53],
        [5.55, -0.2],
        [5.317, -4.033],
        [14.933, -23.513],
        [38.722, -9.139]
      ],
      description: 'A critical submarine cable linking South Africa to the United Kingdom along the west coast of Africa.'
    },
    equiano: {
      id: 'equiano',
      name: 'EQUIANO',
      fullName: 'Equiano Submarine Cable',
      color: '#8b5cf6',
      length: '12,000 km',
      owners: 'Google (Partnership with Angola Cables)',
      rfs: '2022-2023',
      capacity: '144 Tbps',
      landingPoints: [
        { name: 'Sesimbra, Portugal', coords: [38.444, -9.101] },
        { name: 'Lomé, Togo', coords: [6.173, 1.231] },
        { name: 'Lagos, Nigeria', coords: [6.43, 3.53] },
        { name: 'Swakopmund, Namibia', coords: [-22.677, 14.527] },
        { name: 'Melkbosstrand, South Africa', coords: [-33.724, 18.442] },
        { name: 'Rupert\'s Bay, St Helena', coords: [-15.924, -5.715] }
      ],
      route: [
        [38.444, -9.101],
        [6.173, 1.231],
        [6.43, 3.53],
        [-15.924, -5.715],
        [-22.677, 14.527],
        [-33.724, 18.442]
      ],
      description: 'Google\'s Equiano cable with Angola Cables partnership, providing ultra-high capacity connectivity.'
    },
    ellalink: {
      id: 'ellalink',
      name: 'ELLALINK',
      fullName: 'EllaLink Submarine Cable',
      color: '#fbbf24',
      length: '5,900 km',
      owners: 'EllaLink (Partnership with Angola Cables)',
      rfs: '2021',
      capacity: '96 Tbps',
      landingPoints: [
        { name: 'Sines, Portugal', coords: [37.956, -8.869] },
        { name: 'Funchal, Madeira', coords: [32.65, -16.908] },
        { name: 'Praia, Cape Verde', coords: [14.933, -23.513] },
        { name: 'Fortaleza, Brazil', coords: [-3.7404, -38.4537] }
      ],
      route: [
        [37.956, -8.869],
        [32.65, -16.908],
        [14.933, -23.513],
        [-3.7404, -38.4537]
      ],
      description: 'EllaLink provides a direct, low-latency connection between Europe and Latin America.'
    }
  };

  getCable(id: string): CableSystem | null {
    return this.cables[id] || null;
  }

  getAllCables(): CableSystem[] {
    return Object.values(this.cables);
  }

  getCableIds(): string[] {
    return Object.keys(this.cables);
  }
}