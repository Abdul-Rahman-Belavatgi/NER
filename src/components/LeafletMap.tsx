import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Incident, Vehicle } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LeafletMapProps {
  incidents?: Incident[];
  vehicles?: Vehicle[];
  highlightIncidentId?: string;
  highlightVehicleId?: string;
  activeFilters?: { roadStatus?: string; district?: string };
  onClearFilters?: () => void;
  onSelectIncident?: (incident: Incident) => void;
  onSelectVehicle?: (vehicle: Vehicle) => void;
  showLayersControl?: boolean;
  showLegend?: boolean;
  showActiveFilters?: boolean;
  layers?: {
    weatherRadar: boolean;
    incidents: boolean;
    vehicles: boolean;
    roadStatus: boolean;
  };
  onToggleLayer?: (layerKey: 'weatherRadar' | 'incidents' | 'vehicles' | 'roadStatus') => void;
  showRouteAB?: boolean;
  selectedRouteId?: string;
  className?: string;
  theme?: 'dark' | 'light';
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  incidents = [],
  vehicles = [],
  highlightIncidentId,
  highlightVehicleId,
  activeFilters,
  onClearFilters,
  onSelectIncident,
  onSelectVehicle,
  showLayersControl = true,
  showLegend = false,
  showActiveFilters = false,
  layers = {
    weatherRadar: true,
    incidents: true,
    vehicles: true,
    roadStatus: true,
  },
  onToggleLayer,
  showRouteAB = false,
  selectedRouteId = 'routeB',
  className = 'w-full h-full min-h-[380px]',
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  const [isLayersMenuOpen, setIsLayersMenuOpen] = useState(false);
  const [isFiltersMinimized, setIsFiltersMinimized] = useState(true);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(true);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);
  const refTileLayerRef = useRef<L.TileLayer | null>(null);
  const layerGroupsRef = useRef<{
    incidents: L.LayerGroup;
    vehicles: L.LayerGroup;
    roads: L.LayerGroup;
    radar: L.LayerGroup;
  }>({
    incidents: L.layerGroup(),
    vehicles: L.layerGroup(),
    roads: L.layerGroup(),
    radar: L.layerGroup(),
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Meghalaya / North-East corridor (Shillong / Guwahati region)
    const map = L.map(mapContainerRef.current, {
      center: [25.75, 92.05],
      zoom: 8,
      zoomControl: false,
      scrollWheelZoom: false, // Prevents map zoom from hijacking page scrolling!
      attributionControl: false,
    });

    // Free public OpenStreetMap tile layer (no API key required, crisp background without watermarks)
    const baseTile = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);
    baseTileLayerRef.current = baseTile;

    layerGroupsRef.current.incidents.addTo(map);
    layerGroupsRef.current.vehicles.addTo(map);
    layerGroupsRef.current.roads.addTo(map);
    layerGroupsRef.current.radar.addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync Layers visibility
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const { incidents: incGrp, vehicles: vehGrp, roads: rdGrp, radar: radGrp } = layerGroupsRef.current;

    if (layers.incidents) {
      if (!map.hasLayer(incGrp)) map.addLayer(incGrp);
    } else {
      if (map.hasLayer(incGrp)) map.removeLayer(incGrp);
    }

    if (layers.vehicles) {
      if (!map.hasLayer(vehGrp)) map.addLayer(vehGrp);
    } else {
      if (map.hasLayer(vehGrp)) map.removeLayer(vehGrp);
    }

    if (layers.roadStatus) {
      if (!map.hasLayer(rdGrp)) map.addLayer(rdGrp);
    } else {
      if (map.hasLayer(rdGrp)) map.removeLayer(rdGrp);
    }

    if (layers.weatherRadar) {
      if (!map.hasLayer(radGrp)) map.addLayer(radGrp);
    } else {
      if (map.hasLayer(radGrp)) map.removeLayer(radGrp);
    }
  }, [layers]);

  // Update Roads and Radar
  useEffect(() => {
    const { roads: rdGrp, radar: radGrp } = layerGroupsRef.current;
    rdGrp.clearLayers();
    radGrp.clearLayers();

    // 1. NH-27 East-West Corridor (Guwahati to Nagaon / Lumding) - Open / Clear (Green)
    const polyNH27 = L.polyline(
      [
        [26.144, 91.736],
        [26.18, 91.95],
        [26.25, 92.20],
        [26.35, 92.68],
      ],
      {
        color: '#10b981',
        weight: 5,
        opacity: 0.9,
      }
    );
    polyNH27.bindPopup('<b>NH-27 (Guwahati – Nagaon Corridor):</b> Open &amp; Clear (Normal Flow)');
    rdGrp.addLayer(polyNH27);

    // 2. NH-40 / NH-6 North Section (Guwahati to Nongpoh) - Open / Clear (Green)
    const polyOpen = L.polyline(
      [
        [26.144, 91.736],
        [26.08, 91.79],
        [25.99, 91.84],
        [25.901, 91.881],
      ],
      {
        color: '#10b981',
        weight: 5,
        opacity: 0.9,
      }
    );
    polyOpen.bindPopup('<b>NH-6 North (Guwahati – Nongpoh):</b> Open &amp; Clear (Two-way Freight Flow)');
    rdGrp.addLayer(polyOpen);

    // 3. NH-6 Central Section (Nongpoh to Shillong / Umiam) - Partial Disruption / Slow Traffic (Orange)
    const polyRestricted = L.polyline(
      [
        [25.901, 91.881],
        [25.78, 91.91],
        [25.666, 91.895],
        [25.578, 91.893],
      ],
      {
        color: '#f59e0b',
        weight: 5,
        dashArray: '6, 6',
        opacity: 0.9,
      }
    );
    polyRestricted.bindPopup('<b>NH-6 Central (Umiam Sector):</b> Slow Traffic (Single-lane traffic due to loose gravel)');
    rdGrp.addLayer(polyRestricted);

    // 4. NH-6 South Section (Shillong to Sonapur Tunnel) - Blocked Segment (Red Broken Line)
    const polyBlocked = L.polyline(
      [
        [25.578, 91.893],
        [25.45, 92.05],
        [25.32, 92.20],
        [25.132, 92.355],
      ],
      {
        color: '#ef4444',
        weight: 6,
        dashArray: '8, 8',
        opacity: 0.95,
      }
    );
    polyBlocked.bindPopup('<b>NH-6 South (Sonapur Tunnel):</b> Road Closed (Major Landslide Clearance Underway)');
    rdGrp.addLayer(polyBlocked);

    // 5. NH-6 to Silchar (Sonapur to Silchar) - Slow Movement / Waterlogged (Orange)
    const polySilchar = L.polyline(
      [
        [25.132, 92.355],
        [24.98, 92.55],
        [24.833, 92.779],
      ],
      {
        color: '#f59e0b',
        weight: 4,
        dashArray: '5, 5',
        opacity: 0.85,
      }
    );
    polySilchar.bindPopup('<b>NH-6 / NH-44 (Cachar Valley):</b> Restricted Flow (Lowland waterlogging near Silchar)');
    rdGrp.addLayer(polySilchar);

    // 6. NH-102 (Imphal Corridor) - Slow Traffic (Orange)
    const polyImphal = L.polyline(
      [
        [24.817, 93.936],
        [24.50, 93.98],
        [24.25, 94.02],
      ],
      {
        color: '#f59e0b',
        weight: 4,
        opacity: 0.85,
      }
    );
    polyImphal.bindPopup('<b>NH-102 (Manipur Corridor):</b> Restricted Movement (Rain saturation)');
    rdGrp.addLayer(polyImphal);

    // Route A vs Route B visualization if requested
    if (showRouteAB) {
      // Route B (Safer recommended bypass via expressway)
      const routeBPoly = L.polyline(
        [
          [26.144, 91.736],
          [26.05, 91.82],
          [25.901, 91.881],
          [25.75, 91.90],
          [25.578, 91.893],
        ],
        {
          color: '#10b981',
          weight: selectedRouteId === 'routeB' ? 6 : 4,
          opacity: 0.95,
        }
      );
      rdGrp.addLayer(routeBPoly);

      // Route A (Direct but hazardous)
      const routeAPoly = L.polyline(
        [
          [26.144, 91.736],
          [25.80, 91.85],
          [25.666, 91.895],
          [25.578, 91.893],
          [25.132, 92.355],
        ],
        {
          color: '#ef4444',
          weight: selectedRouteId === 'routeA' ? 6 : 3,
          dashArray: '6, 6',
          opacity: 0.9,
        }
      );
      rdGrp.addLayer(routeAPoly);
    }

    // Weather radar simulation: soft cloud precipitation band (NO air-strike target circles)
    if (layers.weatherRadar) {
      const radarCloud = L.polygon(
        [
          [25.10, 91.45],
          [25.38, 91.75],
          [25.42, 92.45],
          [25.15, 92.75],
          [24.95, 92.15],
        ],
        {
          color: '#0284c7',
          fillColor: '#38bdf8',
          fillOpacity: 0.15,
          weight: 1.5,
          dashArray: '4, 4',
        }
      );
      radarCloud.bindPopup('<b>Monsoon Rain Band:</b> Precipitation Cloud Cell (>45mm)');
      radGrp.addLayer(radarCloud);
    }
  }, [showRouteAB, selectedRouteId, layers.weatherRadar]);

  // Update Incidents Markers with Real Road Hazard Icons and Human-Readable Labels
  useEffect(() => {
    const { incidents: incGrp } = layerGroupsRef.current;
    incGrp.clearLayers();

    incidents.forEach((inc) => {
      const isHighlighted = highlightIncidentId === inc.id;
      const statusColor =
        inc.status === 'BLOCKED'
          ? 'bg-rose-600 text-white border-white shadow-rose-900/50'
          : inc.status === 'RESTRICTED'
          ? 'bg-amber-500 text-slate-950 border-white shadow-amber-900/50'
          : 'bg-emerald-600 text-white border-white shadow-emerald-900/50';

      // Intuitive hazard icons
      let hazardEmoji = '⚠️';
      if (inc.hazardType === 'Landslide') hazardEmoji = '🪨';
      else if (inc.hazardType === 'Flash Flood') hazardEmoji = '🌊';
      else if (inc.hazardType === 'Bridge/Culvert Damage') hazardEmoji = '🚧';
      else if (inc.hazardType === 'Commercial Congestion') hazardEmoji = '🚛';
      else if (inc.hazardType === 'Rockfall') hazardEmoji = '⚠️';

      // Human readable label instead of cryptic code
      let readableLabel = `${inc.district}`;
      if (inc.id === 'inc-1' || inc.title.includes('Sonapur')) {
        readableLabel = 'NH-6 Sonapur Tunnel (Closed)';
      } else if (inc.id === 'inc-2' || inc.title.includes('Flooding')) {
        readableLabel = 'Silchar Route B (Flooded)';
      } else if (inc.id === 'inc-3' || inc.title.includes('Bridge')) {
        readableLabel = 'River Crossing 4 (Repair)';
      } else if (inc.id === 'inc-4' || inc.title.includes('Umiam')) {
        readableLabel = 'Umiam Pass (Caution)';
      } else if (inc.id === 'inc-5' || inc.title.includes('Congestion')) {
        readableLabel = 'Beltola Logistics Hub';
      }

      const iconHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group">
          <div class="w-8 h-8 rounded-full border-2 shadow-lg flex items-center justify-center text-sm font-bold ${statusColor} transition-transform group-hover:scale-110 ${
        isHighlighted ? 'ring-4 ring-offset-2 ring-offset-slate-900 animate-pulse' : ''
      }">
            <span>${hazardEmoji}</span>
          </div>
          <div class="mt-1 whitespace-nowrap px-2 py-0.5 rounded-md bg-slate-900/95 border border-slate-700 shadow-lg text-[10px] font-medium text-slate-100 flex items-center gap-1 backdrop-blur-sm">
            <span class="w-1.5 h-1.5 rounded-full ${
              inc.status === 'BLOCKED' ? 'bg-rose-500' : inc.status === 'RESTRICTED' ? 'bg-amber-500' : 'bg-emerald-500'
            }"></span>
            <span>${readableLabel}</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-incident-pin',
        iconSize: [32, 54],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(inc.coordinates, { icon: customIcon });

      marker.on('click', () => {
        if (onSelectIncident) onSelectIncident(inc);
      });

      marker.bindPopup(`
        <div class="p-1 font-sans">
          <div class="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-neutral-800 pb-1.5">
            <span class="font-bold text-xs text-slate-900 dark:text-white">${readableLabel}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
              inc.status === 'BLOCKED'
                ? 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                : inc.status === 'RESTRICTED'
                ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
            }">${inc.status}</span>
          </div>
          <div class="font-bold text-xs text-slate-900 dark:text-slate-100 mt-1.5">${inc.title}</div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${inc.location}</div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">${inc.description}</p>
          ${inc.reportedBy ? `<div class="text-[10px] text-slate-400 dark:text-slate-500 mt-2 pt-1 border-t border-slate-200 dark:border-neutral-800">${inc.reportedBy}</div>` : ''}
        </div>
      `);

      incGrp.addLayer(marker);
    });
  }, [incidents, highlightIncidentId, onSelectIncident]);

  // Update Vehicle Markers
  useEffect(() => {
    const { vehicles: vehGrp } = layerGroupsRef.current;
    vehGrp.clearLayers();

    vehicles.forEach((veh) => {
      const isHighlighted = highlightVehicleId === veh.id;
      const statusBg =
        veh.status === 'MOVING'
          ? 'bg-[#f1f3f7] border-white ring-white/50 text-slate-950'
          : veh.status === 'DELAYED'
          ? 'bg-rose-600 border-rose-300 ring-rose-500/50 text-white'
          : 'bg-amber-500 border-amber-300 ring-amber-500/50 text-white';

      const iconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer transform transition hover:scale-110">
          <div class="w-8 h-8 rounded-full border-2 shadow-lg flex items-center justify-center ${statusBg} ${
        isHighlighted ? 'ring-4 ring-offset-2 ring-offset-slate-900 animate-bounce' : ''
      }">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <span class="absolute -bottom-5 whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[9px] font-mono font-semibold text-slate-200">
            ${veh.plate}
          </span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-vehicle-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(veh.coordinates, { icon: customIcon });

      marker.on('click', () => {
        if (onSelectVehicle) onSelectVehicle(veh);
      });

      marker.bindPopup(`
        <div class="p-1 font-mono">
          <div class="flex items-center justify-between gap-2 border-b border-[#262626] pb-1">
            <span class="font-bold text-xs text-white">${veh.plate}</span>
            <span class="px-1.5 py-0.2 rounded text-[9px] font-bold ${
              veh.status === 'MOVING' ? 'bg-[#f1f3f7] text-slate-950' : 'bg-rose-950 text-rose-400 border border-rose-800'
            }">${veh.status}</span>
          </div>
          <div class="text-[10px] text-slate-300 mt-1.5">${veh.modelType} &bull; Driver: ${veh.driverName}</div>
          <div class="flex items-center justify-between text-[10px] text-slate-400 mt-1">
            <span>SPEED: ${veh.speedKmh} KM/H</span>
            <span>FUEL: ${veh.fuelPercent}%</span>
          </div>
          ${veh.alertNote ? `<div class="mt-1.5 text-[10px] text-amber-400 font-medium">⚠️ ${veh.alertNote}</div>` : ''}
        </div>
      `);

      vehGrp.addLayer(marker);
    });
  }, [vehicles, highlightVehicleId, onSelectVehicle]);

  // Zoom to item if highlighted
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (highlightIncidentId) {
      const inc = incidents.find((i) => i.id === highlightIncidentId);
      if (inc) {
        map.flyTo(inc.coordinates, 10, { duration: 1.2 });
      }
    } else if (highlightVehicleId) {
      const veh = vehicles.find((v) => v.id === highlightVehicleId);
      if (veh) {
        map.flyTo(veh.coordinates, 10, { duration: 1.2 });
      }
    }
  }, [highlightIncidentId, highlightVehicleId, incidents, vehicles]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleReset = () => {
    mapInstanceRef.current?.flyTo([25.75, 92.05], 8, { duration: 1.2 });
  };

  const cardBg = theme === 'dark' ? 'bg-black/95 border-[#262626]' : 'bg-white/95 border-slate-300 shadow-md';
  const chipBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626] text-neutral-200' : 'bg-slate-100 border-slate-300 text-slate-800';
  const chipText = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';

  return (
    <div className={`isolate relative overflow-hidden rounded-xl border ${
      theme === 'dark' ? 'border-[#262626] bg-black' : 'border-slate-300 bg-slate-100'
    } z-0 select-none ${className}`}>
      {/* Actual Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[360px] z-0" />

      {/* Top-Right Control Deck: Active Filters & Map Layers (Collapsible) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2 max-w-[calc(100%-24px)]">
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Active Filters Toggle */}
          {showActiveFilters && activeFilters && (activeFilters.roadStatus || activeFilters.district) && (
            <button
              onClick={() => setIsFiltersMinimized((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-lg transition backdrop-blur-md cursor-pointer ${
                !isFiltersMinimized
                  ? theme === 'dark'
                    ? 'bg-[#f1f3f7] border-white text-slate-950'
                    : 'bg-slate-900 border-slate-900 text-white'
                  : theme === 'dark'
                  ? 'bg-black/90 border-rose-500/50 text-rose-300 hover:text-white hover:bg-[#141414]'
                  : 'bg-white/95 border-rose-400 text-rose-700 hover:text-black hover:bg-slate-50'
              }`}
              title="Toggle Active Filters"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>Active Filters</span>
              <span className="text-[9px] ml-0.5">{!isFiltersMinimized ? '▲' : '▼'}</span>
            </button>
          )}

          {/* Map Layers Toggle */}
          {showLayersControl && (
            <button
              onClick={() => setIsLayersMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-lg transition backdrop-blur-md cursor-pointer ${
                isLayersMenuOpen
                  ? theme === 'dark'
                    ? 'bg-[#f1f3f7] border-white text-slate-950'
                    : 'bg-slate-900 border-slate-900 text-white'
                  : theme === 'dark'
                  ? 'bg-black/90 border-[#262626] text-neutral-300 hover:text-white hover:bg-[#141414]'
                  : 'bg-white/95 border-slate-300 text-slate-800 hover:text-black hover:bg-slate-50'
              }`}
              title="Toggle Map Layers"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>{at.dashLayers || 'Map Layers'}</span>
              <span className="text-[9px] ml-0.5">{isLayersMenuOpen ? '▲' : '▼'}</span>
            </button>
          )}
        </div>

        {/* Collapsible Active Filters Card */}
        {showActiveFilters && activeFilters && (activeFilters.roadStatus || activeFilters.district) && !isFiltersMinimized && (
          <div className={`${cardBg} backdrop-blur-md border rounded-lg p-2.5 shadow-xl text-xs flex flex-col gap-2 min-w-[200px] max-w-[260px]`}>
            <div className={`flex items-center justify-between text-[11px] font-bold ${textMuted} uppercase tracking-wider`}>
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-slate-300' : 'bg-slate-700'}`}></span>
                Active Filters
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClearFilters}
                  className={`${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'} font-medium text-[10px] hover:underline`}
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsFiltersMinimized(true)}
                  title="Minimize filter chip"
                  className={`${textMuted} hover:${chipText} text-xs px-1`}
                >
                  −
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              {activeFilters.roadStatus && (
                <div className={`flex items-center justify-between ${chipBg} px-2 py-1 rounded border text-[11px]`}>
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                    Status: <strong className={`${chipText} ml-0.5 truncate`}>{activeFilters.roadStatus}</strong>
                  </span>
                  <button
                    onClick={onClearFilters}
                    className={`${textMuted} hover:${chipText} ml-1 text-xs font-bold shrink-0`}
                  >
                    ✕
                  </button>
                </div>
              )}
              {activeFilters.district && (
                <div className={`flex items-center justify-between ${chipBg} px-2 py-1 rounded border text-[11px]`}>
                  <span className="flex items-center gap-1.5 truncate">
                    <svg className={`w-3 h-3 ${textMuted} shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="truncate">District: <strong className={`${chipText} ml-0.5`}>{activeFilters.district}</strong></span>
                  </span>
                  <button
                    onClick={onClearFilters}
                    className={`${textMuted} hover:${chipText} ml-1 text-xs font-bold shrink-0`}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Collapsible Map Layers Card */}
        {showLayersControl && isLayersMenuOpen && (
          <div className={`mt-0.5 ${cardBg} backdrop-blur-md border rounded-lg p-2.5 shadow-2xl text-xs w-[170px] space-y-1.5`}>
            <div className={`text-[10px] font-bold ${textMuted} uppercase tracking-wider pb-1 border-b ${
              theme === 'dark' ? 'border-[#262626]' : 'border-slate-200'
            } flex items-center justify-between`}>
              <span>{at.dashLayers || 'Overlay Layers'}</span>
              <button
                onClick={() => setIsLayersMenuOpen(false)}
                className={`${textMuted} hover:${chipText} text-xs`}
              >
                ✕
              </button>
            </div>
            <label className={`flex items-center justify-between ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'
            } cursor-pointer select-none`}>
              <span className="flex items-center gap-1.5">
                <span className="text-xs">🌧️</span> {at.dashWeatherRadar || 'Weather Radar'}
              </span>
              <input
                type="checkbox"
                checked={layers.weatherRadar}
                onChange={() => onToggleLayer && onToggleLayer('weatherRadar')}
                className="rounded border-slate-400 text-slate-900 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
              />
            </label>
            <label className={`flex items-center justify-between ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'
            } cursor-pointer select-none`}>
              <span className="flex items-center gap-1.5">
                <span className="text-amber-500 text-xs">⚠️</span> {at.navHazardsSafetyTitle || 'Incidents'}
              </span>
              <input
                type="checkbox"
                checked={layers.incidents}
                onChange={() => onToggleLayer && onToggleLayer('incidents')}
                className="rounded border-slate-400 text-slate-900 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
              />
            </label>
            <label className={`flex items-center justify-between ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'
            } cursor-pointer select-none`}>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-500 text-xs">🚛</span> {at.navFleetTracking || 'Vehicles'}
              </span>
              <input
                type="checkbox"
                checked={layers.vehicles}
                onChange={() => onToggleLayer && onToggleLayer('vehicles')}
                className="rounded border-slate-400 text-slate-900 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
              />
            </label>
            <label className={`flex items-center justify-between ${
              theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'
            } cursor-pointer select-none`}>
              <span className="flex items-center gap-1.5">
                <span className="text-slate-500 text-xs">↗</span> {at.incidentsColStatus || 'Road Status'}
              </span>
              <input
                type="checkbox"
                checked={layers.roadStatus}
                onChange={() => onToggleLayer && onToggleLayer('roadStatus')}
                className="rounded border-slate-400 text-slate-900 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
              />
            </label>
          </div>
        )}
      </div>

      {/* Floating Zoom & Reset Controls (Right Side) */}
      <div className={`absolute right-3 bottom-14 z-10 flex flex-col ${cardBg} border rounded-lg shadow-xl overflow-hidden`}>
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className={`w-8 h-8 flex items-center justify-center ${
            theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800' : 'text-slate-700 hover:text-black hover:bg-slate-100 border-slate-200'
          } text-sm font-bold transition border-b`}
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className={`w-8 h-8 flex items-center justify-center ${
            theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800' : 'text-slate-700 hover:text-black hover:bg-slate-100 border-slate-200'
          } text-sm font-bold transition border-b`}
        >
          −
        </button>
        <button
          onClick={handleReset}
          title="Reset Map Center"
          className={`w-8 h-8 flex items-center justify-center ${
            theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 hover:text-black hover:bg-slate-100'
          } text-xs transition`}
        >
          ↺
        </button>
      </div>

      {/* Route Status Legend Overlay - Right side, Collapsible */}
      {showLegend && (
        <div className="absolute bottom-3 right-3 z-10">
          {!isLegendCollapsed ? (
            <div className={`${cardBg} backdrop-blur-md border rounded-lg p-2.5 shadow-xl text-xs min-w-[170px]`}>
              <div className={`flex items-center justify-between text-[10px] font-bold ${textMuted} uppercase tracking-wider mb-1.5`}>
                <span>ROUTE STATUS LEGEND</span>
                <button
                  onClick={() => setIsLegendCollapsed(true)}
                  title="Collapse legend"
                  className={`${textMuted} hover:${chipText} text-xs px-1`}
                >
                  −
                </button>
              </div>
              <div className={`flex flex-col gap-1 text-[11px] ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span> Open / Clear
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span> Partial Disruption
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span> Blocked / Closed
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsLegendCollapsed(false)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-lg backdrop-blur-md transition cursor-pointer ${
                theme === 'dark'
                  ? 'bg-black/90 border-[#262626] text-neutral-300 hover:text-white'
                  : 'bg-white/95 border-slate-300 text-slate-800 hover:text-black'
              }`}
              title="Show Route Status Legend"
            >
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </span>
              <span>Legend</span>
              <span className="text-[9px]">▲</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
