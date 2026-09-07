import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  ArrowLeft,
  X,
  Camera,
  MapPin,
  Crosshair,
  Send,
  CheckCircle2,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';
import { Incident, UserProfile, isPublicUser, isAuthorityUser, isLogisticsUser } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newIncident: Omit<Incident, 'id' | 'code' | 'timeAgo'>) => void;
  currentUser?: UserProfile;
  theme?: 'dark' | 'light';
}

export const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  // Field values matching Screenshot 3
  const [incidentType, setIncidentType] = useState('Landslide');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'critical'>('medium');
  const [latitude, setLatitude] = useState(25.5788);
  const [longitude, setLongitude] = useState(91.8933);
  const [landmark, setLandmark] = useState('NH-44 Bypass, Shillong Corridor');
  const [district, setDistrict] = useState('East Khasi Hills');
  const [state] = useState('Meghalaya');
  const [description, setDescription] = useState(
    'Debris and surface water causing single-lane restriction along mountain gradient.'
  );
  const [roadStatus, setRoadStatus] = useState<'PASSABLE' | 'RESTRICTED' | 'BLOCKED'>('RESTRICTED');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isAdjustingCoords, setIsAdjustingCoords] = useState(false);
  const [gpsStatusText, setGpsStatusText] = useState('Location acquired automatically.');
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize or update the interactive mini map
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [latitude, longitude],
        zoom: 11,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      const tileUrl = theme === 'dark'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';

      const refUrl = theme === 'dark'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}'
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}';

      L.tileLayer(tileUrl, { maxZoom: 16 }).addTo(map);
      L.tileLayer(refUrl, { maxZoom: 16 }).addTo(map);

      // Custom red circular star marker as shown in screenshot
      const pinIcon = L.divIcon({
        className: 'report-pin-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 34px; height: 34px; border-radius: 9999px; background-color: rgba(225, 29, 72, 0.35); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 26px; height: 26px; border-radius: 9999px; background-color: #e11d48; border: 2.5px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(225, 29, 72, 0.6);">
              <svg style="width: 13px; height: 13px; fill: white;" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const marker = L.marker([latitude, longitude], { icon: pinIcon }).addTo(map);
      markerRef.current = marker;

      // Allow clicking anywhere on the map to relocate the incident pin
      map.on('click', (e: L.LeafletMouseEvent) => {
        const newLat = parseFloat(e.latlng.lat.toFixed(4));
        const newLng = parseFloat(e.latlng.lng.toFixed(4));
        setLatitude(newLat);
        setLongitude(newLng);
        marker.setLatLng([newLat, newLng]);
        setGpsStatusText('Location manually adjusted on map.');
      });

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([latitude, longitude]);
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      }
    }

    // Leaflet needs resize tick when opening inside modal
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, latitude, longitude]);

  // Cleanup map when unmounting or closing modal
  useEffect(() => {
    if (!isOpen && mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFetchGps = () => {
    if (navigator.geolocation) {
      setGpsStatusText('Locating mobile GPS sensor...');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(4));
          const lng = parseFloat(pos.coords.longitude.toFixed(4));
          setLatitude(lat);
          setLongitude(lng);
          if (mapInstanceRef.current && markerRef.current) {
            mapInstanceRef.current.flyTo([lat, lng], 13);
            markerRef.current.setLatLng([lat, lng]);
          }
          setGpsStatusText('Location acquired automatically via device GPS.');
        },
        () => {
          // Fallback to Shillong / Khasi Hills
          setLatitude(25.5788);
          setLongitude(91.8933);
          setGpsStatusText('GPS timeout. Defaulted to Khasi Hills regional station.');
        }
      );
    } else {
      setLatitude(25.5788);
      setLongitude(91.8933);
      setGpsStatusText('GPS sensor unavailable on device.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setPhotoUrl(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDraft = () => {
    try {
      const draft = {
        incidentType,
        severity,
        latitude,
        longitude,
        landmark,
        district,
        description,
        roadStatus,
      };
      localStorage.setItem('ner_incident_draft', JSON.stringify(draft));
      setDraftSavedToast(true);
      setTimeout(() => setDraftSavedToast(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!landmark || !description) return;

    onSubmit({
      title: `${incidentType} near ${landmark}`,
      location: `${district}, ${state}`,
      district,
      state,
      landmark,
      coordinates: [latitude, longitude],
      status: roadStatus,
      severity: severity === 'critical' ? 'critical' : severity === 'medium' ? 'medium' : 'low',
      timestamp: 'Just now',
      delayText: roadStatus === 'BLOCKED' ? '> 4 Hours' : roadStatus === 'RESTRICTED' ? '45 - 90 mins' : '< 15 mins',
      hazardType: incidentType,
      description,
      photoUrl: photoUrl || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className={`${surfaceBg} border ${cardBorder} rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]`}>
        {/* Modal Header */}
        <div className={`px-5 py-3.5 border-b ${cardBorder} flex items-center justify-between ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-50'}`}>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className={`p-1 rounded-lg ${textMuted} hover:${textPrimary} ${theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-slate-200'} transition group`}
              title="Go back"
            >
              <ArrowLeft strokeWidth={2.25} className="w-4 h-4 icon-anim-shift" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-sm font-bold ${textPrimary} tracking-wide`}>
                  {(at.modalTitle || 'Report Incident').replace(/^\+\s*/, '')}
                </h2>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  isAuthorityUser(currentUser?.role)
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : isPublicUser(currentUser?.role)
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {isAuthorityUser(currentUser?.role)
                    ? 'Official Declaration'
                    : isPublicUser(currentUser?.role)
                    ? 'Public Report • Verification Required'
                    : 'Operator Report'}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1 rounded-lg ${textMuted} hover:${textPrimary} ${theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-slate-200'} transition group`}
            title="Close modal"
          >
            <X strokeWidth={2.25} className="w-4 h-4 icon-anim-spin" />
          </button>
        </div>

        {/* Role Notice Callout */}
        {isPublicUser(currentUser?.role) && (
          <div className="px-5 py-2 bg-amber-500/10 border-b border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-2">
            <span>🛡️</span>
            <span>
              <strong>Citizen Notice:</strong> Your submission will be routed to the <strong>Verification Queue</strong> for BRO and District Police review before public broadcast.
            </span>
          </div>
        )}
        {isAuthorityUser(currentUser?.role) && (
          <div className="px-5 py-2 bg-rose-500/10 border-b border-rose-500/20 text-[11px] text-rose-300 flex items-center gap-2">
            <span>🚨</span>
            <span>
              <strong>Official Publishing:</strong> This declaration will be instantly marked as <strong>VERIFIED</strong> and published to active dispatch feeds and high-risk cargo routers.
            </span>
          </div>
        )}

        {/* Modal Body: 2 Columns */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column (Map & Photo Evidence) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Region Map Box */}
              <div className={`${innerBg} border rounded-xl p-3`}>
                <div className={`text-[11px] font-bold ${textMuted} tracking-wider uppercase mb-2.5`}>
                  SHILLONG &amp; EAST KHASI HILLS SECTOR
                </div>

                {/* Leaflet Map Preview */}
                <div className={`h-44 w-full rounded-lg overflow-hidden border ${cardBorder} relative`}>
                  <div ref={mapContainerRef} className="w-full h-full" />
                </div>

                {/* Selected Location & Adjust Button */}
                <div className="flex items-center justify-between mt-2.5 pt-1">
                  <div>
                    <div className={`text-[10px] uppercase font-bold ${textMuted} tracking-wider`}>
                      SELECTED LOCATION
                    </div>
                    <div className={`text-xs font-mono font-bold ${textPrimary} tracking-tight`}>
                      {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAdjustingCoords((prev) => !prev)}
                    className={`px-2.5 py-1 rounded-lg border ${cardBorder} hover:border-slate-400 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'} text-[11px] font-semibold ${textSecondary} hover:${textPrimary} transition`}
                  >
                    {at.modalAdjust || 'Adjust Pin'}
                  </button>
                </div>

                {/* Inline Manual Coordinate Adjuster if requested */}
                {isAdjustingCoords && (
                  <div className={`mt-2.5 pt-2 border-t ${cardBorder} grid grid-cols-2 gap-2`}>
                    <div>
                      <span className={`text-[10px] ${textMuted}`}>Latitude:</span>
                      <input
                        type="number"
                        step="0.0001"
                        value={latitude}
                        onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
                        className={`w-full mt-0.5 ${innerBg} border rounded-md px-2 py-1 text-xs ${textPrimary} font-mono`}
                      />
                    </div>
                    <div>
                      <span className={`text-[10px] ${textMuted}`}>Longitude:</span>
                      <input
                        type="number"
                        step="0.0001"
                        value={longitude}
                        onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
                        className={`w-full mt-0.5 ${innerBg} border rounded-md px-2 py-1 text-xs ${textPrimary} font-mono`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Visual Evidence Box */}
              <div>
                <label className={`block text-xs font-bold ${textPrimary} mb-1.5`}>
                  {at.modalAttachPhoto}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {photoUrl ? (
                  <div className={`relative rounded-xl border ${cardBorder} overflow-hidden ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-50'} group`}>
                    <img
                      src={photoUrl}
                      alt="Incident Evidence"
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1 rounded-lg bg-[#f1f3f7] hover:bg-white text-slate-950 text-[11px] font-semibold flex items-center gap-1.5 shadow group"
                      >
                        <ImageIcon strokeWidth={2.25} className="w-3 h-3 icon-anim-pulse" />
                        <span>Change</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhotoUrl(null)}
                        className="p-1 rounded-lg bg-rose-600 text-white text-xs hover:bg-rose-500 shadow group"
                        title="Remove photo"
                      >
                        <Trash2 strokeWidth={2.25} className="w-3.5 h-3.5 icon-anim-pop" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed ${cardBorder} hover:border-slate-400 rounded-xl p-5 text-center cursor-pointer ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-100'} transition flex flex-col items-center justify-center min-h-[140px] group`}
                  >
                    <div className={`w-12 h-12 rounded-full ${innerBg} border flex items-center justify-center ${textSecondary} mb-2`}>
                      <Camera strokeWidth={2.25} className="w-5 h-5 icon-anim-pop" />
                    </div>
                    <div className={`text-xs font-semibold ${textPrimary}`}>
                      {at.modalClickUpload}
                    </div>
                    <div className={`text-[11px] ${textMuted} mt-0.5`}>
                      JPG, PNG up to 10MB
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column (Incident Details Form) */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className={`text-sm font-bold ${textPrimary}`}>
                {at.modalIncidentDetails}
              </div>

              {/* Incident Type */}
              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1`}>
                  {at.modalIncidentType}
                </label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className={`w-full ${innerBg} border rounded-xl px-3 py-2 text-xs ${textPrimary} focus:outline-none focus:border-slate-500`}
                >
                  <option value="Landslide">Landslide</option>
                  <option value="Flash Flood">Flash Flood</option>
                  <option value="Rockfall">Rockfall</option>
                  <option value="Road Subsidence">Road Subsidence</option>
                  <option value="Mudflow & Debris">Mudflow &amp; Debris</option>
                  <option value="Bridge Damage">Bridge Damage</option>
                  <option value="Severe Waterlogging">Severe Waterlogging</option>
                </select>
              </div>

              {/* Severity Level */}
              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                  {at.modalSeverityLevel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Low */}
                  <button
                    type="button"
                    onClick={() => setSeverity('low')}
                    className={`p-2 rounded-xl border text-center transition ${
                      severity === 'low'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                        : `${innerBg} border ${textMuted} hover:${textPrimary}`
                    }`}
                  >
                    <div className="text-xs font-bold">{at.modalLow}</div>
                    <div className={`text-[10px] ${textMuted} mt-0.5`}>Minor impact</div>
                  </button>

                  {/* Medium (amber highlight like in screenshot) */}
                  <button
                    type="button"
                    onClick={() => setSeverity('medium')}
                    className={`p-2 rounded-xl border text-center transition ${
                      severity === 'medium'
                        ? 'border-amber-500 bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/40 shadow-sm'
                        : `${innerBg} border ${textMuted} hover:${textPrimary}`
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-600">{at.modalMedium}</div>
                    <div className={`text-[10px] ${textMuted} mt-0.5`}>Partial disruption</div>
                  </button>

                  {/* High / Critical */}
                  <button
                    type="button"
                    onClick={() => setSeverity('critical')}
                    className={`p-2 rounded-xl border text-center transition ${
                      severity === 'critical'
                        ? 'border-rose-500 bg-rose-500/15 text-rose-600 ring-1 ring-rose-500/40 shadow-sm'
                        : `${innerBg} border ${textMuted} hover:${textPrimary}`
                    }`}
                  >
                    <div className="text-xs font-bold">{at.modalHighCritical}</div>
                    <div className={`text-[10px] ${textMuted} mt-0.5`}>Full blockage</div>
                  </button>
                </div>
              </div>

              {/* Location Coordinates & Fetch GPS Button */}
              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1`}>
                  {at.modalCoordinates}
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 group">
                    <MapPin strokeWidth={2.25} className={`w-3.5 h-3.5 ${textMuted} absolute left-3 top-1/2 -translate-y-1/2`} />
                    <input
                      type="text"
                      readOnly
                      value={`${latitude.toFixed(4)}° N,  ${longitude.toFixed(4)}° E`}
                      className={`w-full ${innerBg} border rounded-xl pl-8 pr-3 py-2 text-xs ${textPrimary} font-mono focus:outline-none`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleFetchGps}
                    className={`text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition shrink-0 group ${
                      theme === 'dark'
                        ? 'bg-[#f1f3f7] hover:bg-white text-slate-950 shadow-white/5'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                    }`}
                  >
                    <Crosshair strokeWidth={2.25} className="w-3.5 h-3.5 icon-anim-spin" />
                    <span>{at.modalFetchGps}</span>
                  </button>
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                  <span>{gpsStatusText}</span>
                </div>
              </div>

              {/* Location Landmark & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold ${textSecondary} mb-1`}>
                    {at.modalLandmark}
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. NH-44 Bypass, Shillong Corridor"
                    className={`w-full ${innerBg} border rounded-xl px-3 py-2 text-xs ${textPrimary} placeholder-slate-400 focus:outline-none focus:border-slate-500`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold ${textSecondary} mb-1`}>
                    {at.modalDistrict}
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. East Khasi Hills"
                    className={`w-full ${innerBg} border rounded-xl px-3 py-2 text-xs ${textPrimary} placeholder-slate-400 focus:outline-none focus:border-slate-500`}
                    required
                  />
                </div>
              </div>

              {/* Incident Description */}
              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1`}>
                  {at.modalDescription}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe road condition, weather, and blockage extent..."
                  rows={2}
                  className={`w-full ${innerBg} border rounded-xl p-2.5 text-xs ${textPrimary} placeholder-slate-400 focus:outline-none focus:border-slate-500`}
                  required
                />
              </div>

              {/* Impacted Road Status */}
              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                  {at.modalRoadStatus}
                </label>
                <div className="flex items-center gap-4 text-xs">
                  {/* Passable */}
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="roadStatus"
                      checked={roadStatus === 'PASSABLE'}
                      onChange={() => setRoadStatus('PASSABLE')}
                      className="accent-emerald-500"
                    />
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className={`${textSecondary} font-medium`}>{at.modalPassable}</span>
                  </label>

                  {/* Restricted */}
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="roadStatus"
                      checked={roadStatus === 'RESTRICTED'}
                      onChange={() => setRoadStatus('RESTRICTED')}
                      className="accent-amber-500"
                    />
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className={`${textPrimary} font-semibold`}>{at.modalRestricted}</span>
                  </label>

                  {/* Closed */}
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="roadStatus"
                      checked={roadStatus === 'BLOCKED'}
                      onChange={() => setRoadStatus('BLOCKED')}
                      className="accent-rose-500"
                    />
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className={`${textSecondary} font-medium`}>{at.modalClosed}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className={`pt-3 border-t ${cardBorder} flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className={`text-xs font-medium ${textMuted} hover:${textPrimary} transition px-2 py-1`}
              >
                {at.modalSaveDraft || 'Save Draft'}
              </button>
              {draftSavedToast && (
                <span className="text-[11px] text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 strokeWidth={2.25} className="w-3 h-3 icon-anim-pop" />
                  <span>Draft saved</span>
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-semibold shadow-md transition flex items-center gap-1.5 active:scale-[0.99] group ${
                theme === 'dark'
                  ? 'text-slate-950 bg-[#f1f3f7] hover:bg-white shadow-white/5'
                  : 'text-white bg-slate-900 hover:bg-slate-800 shadow-slate-900/10'
              }`}
            >
              <span>{at.modalSubmit}</span>
              <Send strokeWidth={2.25} className="w-3.5 h-3.5 icon-anim-shift" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
