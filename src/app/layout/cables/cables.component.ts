import { AfterViewInit, Component, ElementRef, ViewChild, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

interface Cable {
  id: string;
  name: string;
  fullName: string;
  color: string;
  length: string;
  owners: string;
  rfs: string;
  capacity: string;
  description: string;
  landingPoints: { name: string; coords: [number, number] }[];
  route: [number, number][];
  visible: boolean;
}

@Component({
  selector: 'app-cables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cables.component.html',
  styleUrl: './cables.component.css'
})
export class CablesComponent implements AfterViewInit {

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  private map!: L.Map;
  private cableLayers = new Map<string, L.LayerGroup>();

  cables = signal<Cable[]>(this.getInitialCables());
  selectedCableId = signal<string | null>('sacs');

  selectedCable = computed(() => {
    const id = this.selectedCableId();
    return id ? this.cables().find(c => c.id === id) ?? null : null;
  });

  allVisible = computed(() => this.cables().every(c => c.visible));

  constructor() {
    // React to visibility changes
    effect(() => {
      this.cables(); // track
      this.updateMapLayersVisibility();
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.mapContainer?.nativeElement) {
      console.error('Map container element not found');
      return;
    }

    try {
      // Load leaflet.curve extension
      await import('@elfalem/leaflet-curve');
      console.log('leaflet.curve loaded successfully');
    } catch (err) {
      console.error('Failed to load leaflet.curve plugin', err);
    }

    // Check if curve is actually available
    if (typeof (L as any).curve !== 'function') {
      console.warn('L.curve is not available - curves may not display correctly');
    }

    this.initMap();
    this.createCableLayers();
    this.fitMapToAllCables();
  }

  private getInitialCables(): Cable[] {
    return [
      {
        id: 'sacs',
        name: 'SACS',
        fullName: 'South Atlantic Cable System',
        color: '#1a73e8', // Blue
        length: '6,165 km',
        owners: 'Angola Cables',
        rfs: '2018',
        capacity: '40 Tbps',
        description: 'Angola Cables\' flagship project - the first submarine cable system to directly connect Africa and South America across the South Atlantic Ocean.',
        landingPoints: [
          { name: 'Sangano (Luanda), Angola', coords: [-9.53333, 13.2167] },
          { name: 'Fortaleza, Brazil', coords: [-3.7404, -38.4537] },
          { name: 'Fernando de Noronha, Brazil', coords: [-3.8538, -32.4238] }
        ],
        route: [[-9.53333, 13.2167], [-3.8538, -32.4238], [-3.7404, -38.4537]],
        visible: true
      },
      {
        id: 'monet',
        name: 'MONET',
        fullName: 'MONET Submarine Cable System',
        color: '#ff6b35', // Orange
        length: '10,556 km',
        owners: 'Angola Cables, Algar Telecom, Antel Uruguay',
        rfs: '2017',
        capacity: '64 Tbps',
        description: 'A key part of Angola Cables\' global network, connecting Brazil to the United States with high-capacity optical fiber.',
        landingPoints: [
          { name: 'Fortaleza, Brazil', coords: [-3.7404, -38.4537] },
          { name: 'Santos, Brazil', coords: [-23.96, -46.33] },
          { name: 'Miami, USA', coords: [25.761, -80.191] },
          { name: 'Boca Raton, USA', coords: [26.35, -80.08] }
        ],
        route: [[-3.7404, -38.4537], [-23.96, -46.33], [25.761, -80.191], [26.35, -80.08]],
        visible: true
      },
      {
        id: 'wacs',
        name: 'WACS',
        fullName: 'West Africa Cable System',
        color: '#34a853', // Green
        length: '14,530 km',
        owners: 'Consortium including Angola Cables',
        rfs: '2012',
        capacity: '5.12 Tbps',
        description: 'A critical submarine cable linking South Africa to Portugal along the west coast of Africa, with Angola Cables as a key consortium member.',
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
        route: [[-33.343, 18.162], [-22.677, 14.527], [-5.933, 12.35], [-4.778, 11.863], [4.016, 9.206], [6.43, 3.53], [5.55, -0.2], [5.317, -4.033], [14.933, -23.513], [38.722, -9.139]],
        visible: true
      },
      {
        id: 'equiano',
        name: 'EQUIANO',
        fullName: 'Equiano Submarine Cable',
        color: '#8b5cf6', // Purple
        length: '12,000 km',
        owners: 'Google (Partnership with Angola Cables)',
        rfs: '2022-2023',
        capacity: '144 Tbps',
        description: 'Google\'s Equiano cable with Angola Cables partnership, providing ultra-high capacity connectivity from Europe to Africa along the west coast.',
        landingPoints: [
          { name: 'Sesimbra, Portugal', coords: [38.444, -9.101] },
          { name: 'Lomé, Togo', coords: [6.173, 1.231] },
          { name: 'Lagos, Nigeria', coords: [6.43, 3.53] },
          { name: 'Swakopmund, Namibia', coords: [-22.677, 14.527] },
          { name: 'Melkbosstrand, South Africa', coords: [-33.724, 18.442] },
          { name: 'Rupert\'s Bay, St Helena', coords: [-15.924, -5.715] }
        ],
        route: [[38.444, -9.101], [6.173, 1.231], [6.43, 3.53], [-15.924, -5.715], [-22.677, 14.527], [-33.724, 18.442]],
        visible: true
      },
      {
        id: 'ellalink',
        name: 'ELLALINK',
        fullName: 'EllaLink Submarine Cable',
        color: '#fbbf24', // Yellow
        length: '5,900 km',
        owners: 'EllaLink (Partnership with Angola Cables)',
        rfs: '2021',
        capacity: '96 Tbps',
        description: 'EllaLink provides a direct, low-latency connection between Europe and Latin America, with Angola Cables providing connectivity services.',
        landingPoints: [
          { name: 'Sines, Portugal', coords: [37.956, -8.869] },
          { name: 'Funchal, Madeira', coords: [32.65, -16.908] },
          { name: 'Praia, Cape Verde', coords: [14.933, -23.513] },
          { name: 'Fortaleza, Brazil', coords: [-3.7404, -38.4537] }
        ],
        route: [[37.956, -8.869], [32.65, -16.908], [14.933, -23.513], [-3.7404, -38.4537]],
        visible: true
      }
    ];
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      zoomControl: true,
      attributionControl: true
    }).setView([2, -15], 3);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> & <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 18,
    }).addTo(this.map);
  }

  private createCableLayers(): void {
    this.cables().forEach(cable => {
      const layerGroup = L.layerGroup();

      // Landing point markers
      cable.landingPoints.forEach(point => {
        const isAngolaRelated =
          point.name.toLowerCase().includes('angola') ||
          point.name.toLowerCase().includes('luanda') ||
          point.name.toLowerCase().includes('sangano') ||
          point.name.toLowerCase().includes('fortaleza');

        const icon = L.divIcon({
          html: isAngolaRelated ? '<i class="fas fa-satellite-dish"></i>' : '<i class="fas fa-map-marker-alt"></i>',
          className: isAngolaRelated ? 'angola-marker' : 'partner-marker',
          iconSize: isAngolaRelated ? [38, 38] : [32, 32],
          iconAnchor: isAngolaRelated ? [19, 38] : [16, 32]
        });

        L.marker(point.coords, { icon })
          .bindPopup(`
            <div style="font-weight: 700; color: ${cable.color}; margin-bottom: 6px;">
              ${point.name}
            </div>
            <div style="font-size: 0.95rem;">${cable.fullName}</div>
          `)
          .addTo(layerGroup);
      });

      // Curved cable path
      const curve = (L as any).curve(
        this.buildCurvePath(cable.route),
        {
          color: cable.color,
          weight: 4,
          opacity: 0.85,
          className: 'cable-path'
        }
      ).bindPopup(`
        <div style="font-weight: 700; color: ${cable.color}; font-size: 1.1rem; margin-bottom: 8px;">
          ${cable.fullName}
        </div>
        <div>Length: ${cable.length}</div>
        <div>Capacity: ${cable.capacity}</div>
        <div>RFS: ${cable.rfs}</div>
        <div>Owners: ${cable.owners}</div>
      `);

      curve.addTo(layerGroup);

      this.cableLayers.set(cable.id, layerGroup);

      // Add to map if visible
      if (cable.visible) {
        layerGroup.addTo(this.map);
      }
    });
  }

  private buildCurvePath(route: [number, number][]): any[] {
    const path: any[] = [];
    for (let i = 0; i < route.length - 1; i++) {
      const start = route[i];
      const end = route[i + 1];

      const midLat = (start[0] + end[0]) / 2;
      const midLng = (start[1] + end[1]) / 2;

      // Curvature control - adjust this value to make curves more/less pronounced
      const curvature = 0.35;

      const cpLat = midLat + curvature * (end[1] - start[1]);
      const cpLng = midLng - curvature * (end[0] - start[0]);

      path.push(['M', start[1], start[0]]);
      path.push(['Q', cpLng, cpLat, end[1], end[0]]);
    }
    return path;
  }

  private updateMapLayersVisibility(): void {
    this.cables().forEach(cable => {
      const layer = this.cableLayers.get(cable.id);
      if (!layer) return;

      if (cable.visible) {
        if (!this.map.hasLayer(layer)) {
          layer.addTo(this.map);
        }
      } else {
        if (this.map.hasLayer(layer)) {
          this.map.removeLayer(layer);
        }
      }
    });
  }

  toggleCable(cableId: string): void {
    this.cables.update(prev =>
      prev.map(c =>
        c.id === cableId ? { ...c, visible: !c.visible } : c
      )
    );
  }

  selectCable(cableId: string): void {
    this.selectedCableId.set(cableId);

    const cable = this.cables().find(c => c.id === cableId);
    if (cable && cable.route.length > 0) {
      const bounds = L.latLngBounds(cable.route.map(([lat, lng]) => [lat, lng]));
      this.map.fitBounds(bounds, { padding: [100, 100], maxZoom: 6 });
    }
  }

  toggleAll(): void {
    const shouldShow = !this.allVisible();
    this.cables.update(prev => prev.map(c => ({ ...c, visible: shouldShow })));
  }

  private fitMapToAllCables(): void {
    const allPoints: L.LatLngExpression[] = [];
    this.cables().forEach(c => {
      allPoints.push(...c.route);
    });

    if (allPoints.length > 0) {
      this.map.fitBounds(L.latLngBounds(allPoints), { padding: [120, 120] });
    }
  }
}