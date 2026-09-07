import React, { useState, useEffect } from 'react';
import {
  Package,
  PlusCircle,
  Search,
  Truck,
  AlertTriangle,
  GitFork,
  Phone,
  Clock,
  ShieldAlert,
  CheckCircle,
  MapPin,
  X
} from 'lucide-react';
import { Shipment } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LogisticsViewProps {
  shipments: Shipment[];
  onAddShipment?: (shipment: Shipment) => void;
  onNavigateTab: (tab: string, context?: any) => void;
  theme?: 'dark' | 'light';
}

export const LogisticsView: React.FC<LogisticsViewProps> = ({
  shipments,
  onAddShipment,
  onNavigateTab,
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  const [localShipments, setLocalShipments] = useState<Shipment[]>(shipments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [callNotice, setCallNotice] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // 3-field modal state: Cargo Type, Destination, Truck
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cargoType, setCargoType] = useState('Emergency Medicines & Vaccines');
  const [destination, setDestination] = useState('Jowai Emergency Depot (NH-6)');
  const [truck, setTruck] = useState('ML-05-AB-2144 (Heavy Cargo 16T)');
  const [priority, setPriority] = useState<'HIGH' | 'NORMAL'>('HIGH');

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  useEffect(() => {
    setLocalShipments(shipments);
  }, [shipments]);

  const filteredShipments = localShipments.filter((shp) => {
    const matchesSearch =
      shp.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shp.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shp.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shp.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || shp.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCallDriver = (shp: Shipment) => {
    setCallNotice(`Calling ${shp.driverName} on assigned satellite/GSM trunk...`);
    setTimeout(() => {
      setCallNotice(null);
    }, 4000);
  };

  const handleCreateConsignment = (e: React.FormEvent) => {
    e.preventDefault();
    const newShipmentCode = `SHP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newShp: Shipment = {
      id: `shp-${Date.now()}`,
      code: newShipmentCode,
      commodity: cargoType.trim() || 'Emergency Relief Supplies',
      commodityDetails: `${priority === 'HIGH' ? 'High-priority' : 'Standard'} shipment dispatched to support regional relief corridors.`,
      priority,
      origin: 'Guwahati Logistics Hub',
      destination: destination.trim() || 'Jowai Emergency Depot (NH-6)',
      assignedVehicle: truck.trim() || 'ML-05-AB-2144 (Heavy Cargo 16T)',
      driverName: 'P. Marak (Dispatched)',
      eta: '~ 3.5 Hours',
      status: 'PENDING',
      riskScore: priority === 'HIGH' ? 58 : 28,
      riskLevel: priority === 'HIGH' ? 'Medium Risk' : 'Low Risk',
      delayText: 'En route to dispatch lane',
    };

    setLocalShipments((prev) => [newShp, ...prev]);
    if (onAddShipment) {
      onAddShipment(newShp);
    }

    setIsModalOpen(false);
    setSuccessNotice(`Consignment ${newShipmentCode} created and assigned to ${truck}!`);
    setTimeout(() => setSuccessNotice(null), 5000);
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className={`flex items-center gap-2 ${textPrimary} text-lg font-bold`}>
            <Package className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`} />
            <h2>{at.logisticsTitle}</h2>
          </div>
          <p className={`text-xs ${textMuted} mt-0.5`}>
            {at.logisticsSubtitle}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition shrink-0 self-start sm:self-auto cursor-pointer active:scale-95 ${
            theme === 'dark'
              ? 'bg-[#f1f3f7] hover:bg-white text-slate-950 shadow-white/5'
              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>{at.logisticsNewFreight}</span>
        </button>
      </div>

      {successNotice && (
        <div className={`p-3 rounded-xl text-xs flex items-center justify-between gap-2 shadow-lg ${
          theme === 'dark'
            ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-200'
            : 'bg-emerald-50 border border-emerald-300 text-emerald-900'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-medium">{successNotice}</span>
          </div>
          <button
            onClick={() => setSuccessNotice(null)}
            className="text-emerald-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {callNotice && (
        <div className={`p-3 rounded-xl text-xs flex items-center gap-2 shadow-lg ${
          theme === 'dark'
            ? 'bg-white/10 border border-white/20 text-slate-100'
            : 'bg-blue-50 border border-blue-200 text-blue-900'
        }`}>
          <Phone className="w-4 h-4 text-blue-500 animate-pulse" />
          <span>{callNotice}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-3.5`}>
          <div className={`text-[10px] uppercase font-bold ${textMuted}`}>
            {at.logisticsActiveLoads}
          </div>
          <div className={`text-xl font-extrabold ${textPrimary} mt-1`}>
            {localShipments.length} Trucks
          </div>
        </div>
        <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-3.5`}>
          <div className={`text-[10px] uppercase font-bold ${textMuted}`}>
            {at.logisticsCriticalCargo}
          </div>
          <div className="text-xl font-extrabold text-rose-500 mt-1">
            {localShipments.filter((s) => s.priority === 'HIGH').length} Loads
          </div>
        </div>
        <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-3.5`}>
          <div className={`text-[10px] uppercase font-bold ${textMuted}`}>
            {at.logisticsDelayedRoadblocks}
          </div>
          <div className="text-xl font-extrabold text-amber-500 mt-1">
            {localShipments.filter((s) => s.status === 'DELAYED').length}
          </div>
        </div>
        <div className={`${surfaceBg} border ${cardBorder} rounded-xl p-3.5`}>
          <div className={`text-[10px] uppercase font-bold ${textMuted}`}>
            {at.logisticsOnTimeDelivery}
          </div>
          <div className="text-xl font-extrabold text-emerald-500 mt-1">
            96%
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={`${surfaceBg} border ${cardBorder} rounded-2xl p-3 flex flex-col sm:flex-row items-center gap-3`}>
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={at.logisticsSearchPlaceholder}
            className={`w-full ${innerBg} border rounded-xl pl-9 pr-3 py-2 text-xs ${textPrimary} placeholder-slate-400 focus:outline-none focus:border-slate-500`}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`${innerBg} border rounded-xl px-3 py-2 text-xs ${textPrimary} focus:outline-none focus:border-slate-500 w-full sm:w-auto`}
        >
          <option value="all">{at.logisticsAllStatuses}</option>
          <option value="IN TRANSIT">{at.logisticsInTransit}</option>
          <option value="DELAYED">{at.logisticsDelayed}</option>
          <option value="PENDING">{at.logisticsPending}</option>
        </select>
      </div>

      {/* Shipments List */}
      <div className="space-y-3">
        {filteredShipments.map((shp) => (
          <div
            key={shp.id}
            className={`${surfaceBg} border ${cardBorder} rounded-2xl p-4.5 hover:border-slate-400 transition`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Details */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className={`font-mono font-bold text-xs ${textPrimary} ${innerBg} px-2 py-0.5 rounded border`}>
                    {shp.code}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      shp.priority === 'HIGH'
                        ? theme === 'dark'
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                        : theme === 'dark'
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-slate-100 text-slate-800 border border-slate-300'
                    }`}
                  >
                    {shp.priority === 'HIGH' ? at.cargoHighPriority : at.cargoNormalPriority}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      shp.status === 'IN TRANSIT'
                        ? theme === 'dark'
                          ? 'bg-white/10 text-slate-200 border border-white/15'
                          : 'bg-slate-100 text-slate-800 border border-slate-300'
                        : shp.status === 'DELAYED'
                        ? theme === 'dark'
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                        : theme === 'dark'
                        ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    • {shp.status === 'IN TRANSIT' ? at.cargoInTransit : shp.status === 'DELAYED' ? at.cargoDelayed : at.cargoDelivered}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-bold ${textPrimary}`}>
                    {shp.commodity}
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1 ${
                      shp.riskScore > 60
                        ? theme === 'dark'
                          ? 'bg-rose-950/70 text-rose-300 border-rose-800/60'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                        : shp.riskScore > 25
                        ? theme === 'dark'
                          ? 'bg-amber-950/70 text-amber-300 border-amber-800/60'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                        : theme === 'dark'
                        ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    <span>{shp.riskScore > 60 ? '🔴' : shp.riskScore > 25 ? '🟡' : '🟢'}</span>
                    <span>{shp.riskLevel} ({shp.riskScore}/100)</span>
                  </span>
                </div>
                <div className={`text-xs ${textMuted}`}>
                  {shp.commodityDetails}
                </div>

                <div className={`pt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs ${textSecondary}`}>
                  <span className={`flex items-center gap-1 ${textMuted}`}>
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    {shp.assignedVehicle} • {shp.driverName}
                  </span>
                  <span className={textMuted}>
                    Route: <strong className={textPrimary}>{shp.origin}</strong> → <strong className={textPrimary}>{shp.destination}</strong>
                  </span>
                </div>
              </div>

              {/* Right: Clean ETA and Context-Aware Action */}
              <div className={`flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 ${cardBorder}`}>
                <div className="text-left lg:text-right">
                  <div className={`text-[10px] font-bold ${textMuted} uppercase`}>
                    {at.logisticsEta}
                  </div>
                  <div className={`text-base font-extrabold ${shp.status === 'DELAYED' ? 'text-rose-500' : textPrimary}`}>
                    {shp.eta}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCallDriver(shp)}
                    className={`p-2 rounded-xl border transition ${
                      theme === 'dark'
                        ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-300 hover:text-white border-[#262626]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black border-slate-300'
                    }`}
                    title="Call Driver"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>

                  {/* Context-Aware Action Button */}
                  {shp.status === 'DELAYED' || shp.riskScore > 60 ? (
                    <button
                      onClick={() => onNavigateTab('routes')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md transition ${
                        theme === 'dark'
                          ? 'bg-[#f1f3f7] hover:bg-white text-slate-950 shadow-white/5'
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                      }`}
                    >
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{at.logisticsReroute}</span>
                    </button>
                  ) : shp.status === 'PENDING' ? (
                    <button
                      onClick={() => alert(`Dispatch approved for consignment ${shp.code} (${shp.commodity}). Driver ${shp.driverName} notified.`)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md transition ${
                        theme === 'dark'
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/20'
                          : 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-emerald-900/10'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{at.logisticsApprove}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigateTab('map')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                        theme === 'dark'
                          ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-200 hover:text-white border-[#262626]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-black border-slate-300'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{at.logisticsTrackMap}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3-Field Modal: New Freight Consignment */}
      {isModalOpen && (
        <div
          id="new-consignment-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            id="new-consignment-modal"
            className={`w-full max-w-lg rounded-2xl border ${cardBorder} ${surfaceBg} p-6 shadow-2xl relative animate-scale-up`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-inherit">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-slate-100 text-slate-800'}`}>
                  <Package className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className={`font-bold text-base ${textPrimary}`}>
                    {at.logisticsNewFreight || 'New Freight Consignment'}
                  </h3>
                  <p className={`text-xs ${textMuted}`}>
                    Assign emergency cargo to verified regional transport corridors
                  </p>
                </div>
              </div>
              <button
                id="close-consignment-modal"
                onClick={() => setIsModalOpen(false)}
                className={`p-1.5 rounded-lg border transition ${
                  theme === 'dark'
                    ? 'border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                    : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateConsignment} className="space-y-4 pt-4">
              {/* Field 1: Cargo Type */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${textSecondary}`}>
                  1. Cargo Type & Commodity
                </label>
                <input
                  id="cargo-type-input"
                  type="text"
                  required
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  placeholder="e.g. Emergency Medicines, Fuel Tanker, Bailey Bridge Spares"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                    theme === 'dark'
                      ? 'bg-[#0a0a0a] border-[#262626] text-white placeholder:text-neutral-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {[
                    'Emergency Medicines & Vaccines',
                    'Dry Food Rations & Relief Supplies',
                    'Fuel & Petroleum Tanker (Diesel)',
                    'Bailey Bridge Structural Steel',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCargoType(preset)}
                      className={`text-[10px] px-2 py-0.5 rounded-md border transition ${
                        cargoType === preset
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400 font-semibold'
                          : theme === 'dark'
                            ? 'bg-[#0a0a0a] border-neutral-800 text-neutral-400 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 2: Destination */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${textSecondary}`}>
                  2. Destination Depot / Facility
                </label>
                <input
                  id="destination-input"
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Jowai Emergency Depot (NH-6)"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                    theme === 'dark'
                      ? 'bg-[#0a0a0a] border-[#262626] text-white placeholder:text-neutral-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {[
                    'Jowai Emergency Depot (NH-6)',
                    'Silchar Civil Hospital (Silchar Corridor)',
                    'Nongpoh Sub-station (NH-40)',
                    'Shillong Central Warehouse',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setDestination(preset)}
                      className={`text-[10px] px-2 py-0.5 rounded-md border transition ${
                        destination === preset
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400 font-semibold'
                          : theme === 'dark'
                            ? 'bg-[#0a0a0a] border-neutral-800 text-neutral-400 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 3: Truck / Assigned Vehicle */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${textSecondary}`}>
                  3. Truck / Assigned Transport Unit
                </label>
                <select
                  id="truck-select"
                  value={truck}
                  onChange={(e) => setTruck(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                    theme === 'dark'
                      ? 'bg-[#0a0a0a] border-[#262626] text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="ML-05-AB-2144 (Heavy Cargo 16T)">ML-05-AB-2144 (Heavy Cargo 16T - High Clearance)</option>
                  <option value="AS-01-EF-8901 (Reefer 10T)">AS-01-EF-8901 (Reefer 10T - Temperature Controlled)</option>
                  <option value="ML-10-CD-4321 (4x4 Utility Truck)">ML-10-CD-4321 (4x4 Utility Truck - All Terrain)</option>
                  <option value="TR-01-GH-5566 (Emergency Flatbed)">TR-01-GH-5566 (Emergency Flatbed 20T)</option>
                  <option value="AS-25-KL-7722 (Fuel Tanker 12KL)">AS-25-KL-7722 (Fuel Tanker 12KL Hazardous Certified)</option>
                </select>
              </div>

              {/* Priority Toggle */}
              <div className="flex items-center justify-between pt-1">
                <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>
                  Clearance Priority
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPriority('NORMAL')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                      priority === 'NORMAL'
                        ? 'bg-slate-700 text-white border-slate-600'
                        : theme === 'dark'
                          ? 'border-neutral-800 text-neutral-400 hover:text-white'
                          : 'border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority('HIGH')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                      priority === 'HIGH'
                        ? 'bg-rose-600 text-white border-rose-500 shadow-sm shadow-rose-900/40'
                        : theme === 'dark'
                          ? 'border-neutral-800 text-neutral-400 hover:text-white'
                          : 'border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🚨 Critical / High
                  </button>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-inherit">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                    theme === 'dark'
                      ? 'border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-new-consignment"
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold shadow-md transition ${
                    theme === 'dark'
                      ? 'bg-white hover:bg-slate-200 text-black shadow-white/10'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Schedule & Dispatch Consignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
