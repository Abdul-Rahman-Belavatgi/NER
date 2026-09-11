import React, { useState, useEffect } from 'react';
import {
  FileText,
  MapPin,
  Camera,
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  Compass,
  Send,
  ShieldCheck,
  RadioTower,
  CloudCheck,
  CloudOff
} from 'lucide-react';
import { Incident } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useSync } from '../context/SyncContext';
import { AlternativeCommModal } from './AlternativeCommModal';

interface FieldReportingViewProps {
  onSubmitReport: (newIncident: Omit<Incident, 'id' | 'code' | 'timeAgo'>) => void;
  onNavigateTab: (tab: string) => void;
  theme?: 'dark' | 'light';
}

export const FieldReportingView: React.FC<FieldReportingViewProps> = ({
  onSubmitReport,
  onNavigateTab,
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  const { enqueueRecord, isOnline } = useSync();
  const [state, setState] = useState('Meghalaya');
  const [district, setDistrict] = useState('East Jaintia Hills');
  const [landmark, setLandmark] = useState('');
  const [hazardType, setHazardType] = useState('Landslide');
  const [status, setStatus] = useState<'BLOCKED' | 'RESTRICTED' | 'PASSABLE'>('BLOCKED');
  const [severity, setSeverity] = useState<'critical' | 'high' | 'medium' | 'low'>('critical');
  const [delayText, setDelayText] = useState('> 4 Hours');
  const [latitude, setLatitude] = useState('25.1320');
  const [longitude, setLongitude] = useState('92.3550');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80');
  const [broadcastAlert, setBroadcastAlert] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAltCommOpen, setIsAltCommOpen] = useState(false);

  // Restore draft from local storage if available
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('ner_hazard_draft');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.landmark) setLandmark(parsed.landmark);
        if (parsed.description) setDescription(parsed.description);
        if (parsed.district) setDistrict(parsed.district);
        if (parsed.hazardType) setHazardType(parsed.hazardType);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save changes to local draft
  useEffect(() => {
    try {
      localStorage.setItem('ner_hazard_draft', JSON.stringify({
        landmark,
        description,
        district,
        hazardType,
      }));
    } catch {
      // ignore
    }
  }, [landmark, description, district, hazardType]);

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  const handleAcquireLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(4));
          setLongitude(pos.coords.longitude.toFixed(4));
        },
        (err) => {
          // Fallback location near Shillong / Sonapur
          setLatitude('25.5780');
          setLongitude('91.8930');
        }
      );
    } else {
      setLatitude('25.5780');
      setLongitude('91.8930');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!landmark || !description) return;

    const payload = {
      title: `${hazardType} near ${landmark}`,
      location: `${district}, ${state}`,
      district,
      state,
      landmark,
      coordinates: [parseFloat(latitude) || 25.578, parseFloat(longitude) || 91.893] as [number, number],
      status,
      severity,
      timestamp: 'Just now',
      delayText,
      hazardType,
      description,
      photoUrl: photoUrl || undefined,
    };

    // 1. Submit to view callback
    onSubmitReport(payload);

    // 2. Add to persistent sync queue
    enqueueRecord({
      entityType: 'hazard',
      action: 'CREATE',
      data: payload,
    });

    try {
      localStorage.removeItem('ner_hazard_draft');
    } catch {
      // ignore
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onNavigateTab('incidents');
    }, 1500);
  };

  return (
    <div className="space-y-4 pb-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className={`flex items-center gap-2 ${textPrimary} text-lg font-bold`}>
            <FileText className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`} />
            <h2>{at.fieldReportingTitle}</h2>
          </div>
          <p className={`text-xs ${textMuted} mt-0.5`}>
            {at.fieldReportingSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono select-none">
            {isOnline ? (
              <span className="text-emerald-500 flex items-center gap-1.5">
                <CloudCheck className="w-3.5 h-3.5" />
                <span>Live Sync Active</span>
              </span>
            ) : (
              <span className="text-amber-500 flex items-center gap-1.5">
                <CloudOff className="w-3.5 h-3.5" />
                <span>Offline Form Queuing</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsAltCommOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
              theme === 'dark'
                ? 'bg-[#0a0a0a] text-sky-400 border-[#262626] hover:text-white'
                : 'bg-white text-sky-700 border-slate-300 hover:text-black shadow-sm'
            }`}
            title="Open Off-Grid Transmission Modes (SMS, HAM/VHF Radio, Satellite)"
          >
            <RadioTower className="w-4 h-4" />
            <span>Off-Grid Dispatch</span>
          </button>

          <button
            type="button"
            onClick={handleAcquireLocation}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition self-start sm:self-auto ${
              theme === 'dark'
                ? 'bg-[#0a0a0a] hover:bg-neutral-900 text-neutral-200 hover:text-white border-[#262626]'
                : 'bg-white hover:bg-slate-100 text-slate-800 hover:text-black border-slate-300 shadow-sm'
            }`}
          >
            <Compass className={`w-4 h-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`} />
            <span>{at.fieldReportingUseLocation}</span>
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className={`${surfaceBg} border ${cardBorder} rounded-2xl p-6 shadow-xl`}>
        {isSuccess ? (
          <div className="py-12 text-center space-y-3">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${
              theme === 'dark'
                ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-400'
                : 'bg-emerald-100 border border-emerald-300 text-emerald-700'
            }`}>
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className={`text-base font-bold ${textPrimary}`}>
              {at.fieldReportingTransmitted}
            </h3>
            <p className={`text-xs ${textMuted} max-w-md mx-auto leading-relaxed`}>
              Hazard telemetry has been cataloged into the Central Regional Database. Live map pins and detour engines have been synchronized.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                  {at.fieldReportingState}
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} focus:outline-none focus:border-slate-500`}
                >
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Assam">Assam</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Sikkim">Sikkim</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                  {at.fieldReportingDistrict}
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. East Khasi Hills, Ri-Bhoi"
                  className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} placeholder-slate-400 focus:outline-none focus:border-slate-500`}
                  required
                />
              </div>
            </div>

            {/* Row 2: Landmark & Hazard Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                  {at.fieldReportingLandmark}
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. NH-6 KM 48 near Sonapur Pass"
                  className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} placeholder-slate-400 focus:outline-none focus:border-slate-500`}
                  required
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                  {at.fieldReportingHazardCategory}
                </label>
                <select
                  value={hazardType}
                  onChange={(e) => setHazardType(e.target.value)}
                  className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} focus:outline-none focus:border-slate-500`}
                >
                  <option value="Landslide">Landslide</option>
                  <option value="Flash Flood">Flash Flood / Inundation</option>
                  <option value="Rockfall">Unstable Slopes / Rockfall</option>
                  <option value="Bridge/Culvert Damage">Bridge / Culvert Structural Damage</option>
                  <option value="Heavy Mudflow">Heavy Mudflow</option>
                  <option value="Commercial Congestion">Commercial Freight Congestion</option>
                </select>
              </div>
            </div>

            {/* Row 3: Passage Status & Estimated Delay */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                  {at.fieldReportingRoadPassage}
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} focus:outline-none focus:border-slate-500`}
                >
                  <option value="BLOCKED">BLOCKED - Total Freight Halt</option>
                  <option value="RESTRICTED">RESTRICTED - Single Lane / Speed Limited</option>
                  <option value="PASSABLE">PASSABLE - Minor Slowdown</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                  {at.fieldReportingDelay}
                </label>
                <input
                  type="text"
                  value={delayText}
                  onChange={(e) => setDelayText(e.target.value)}
                  placeholder="e.g. > 4 Hours, 2-3 Hours"
                  className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} placeholder-slate-400 focus:outline-none focus:border-slate-500`}
                />
              </div>
            </div>

            {/* Row 4: GPS Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                  Latitude (°N)
                </label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="25.1320"
                  className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} font-mono focus:outline-none focus:border-slate-500`}
                  required
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                  Longitude (°E)
                </label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="92.3550"
                  className={`w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} font-mono focus:outline-none focus:border-slate-500`}
                  required
                />
              </div>
            </div>

            {/* Row 5: Detailed Description */}
            <div>
              <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                {at.fieldReportingObservations}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe road condition, width of debris flow, vehicles backed up, and emergency services active on site..."
                rows={3}
                className={`w-full ${innerBg} border rounded-xl p-3 text-xs ${textPrimary} placeholder-slate-400 focus:outline-none focus:border-slate-500`}
                required
              />
            </div>

            {/* Row 6: Photographic Upload Preview */}
            <div>
              <label className={`block text-xs font-semibold ${textSecondary} mb-1.5`}>
                {at.fieldReportingImageProof}
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Image URL or upload proof"
                  className={`flex-1 w-full ${innerBg} border rounded-xl px-3.5 py-2 text-xs ${textPrimary} focus:outline-none focus:border-slate-500`}
                />
                {photoUrl && (
                  <img
                    src={photoUrl}
                    alt="Proof Preview"
                    className={`w-16 h-12 rounded-lg object-cover border ${cardBorder}`}
                  />
                )}
              </div>
            </div>

            {/* Row 7: Severity & Broadcast Toggle */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t ${cardBorder}`}>
              <div className="flex items-center gap-4">
                <label className={`flex items-center gap-2 text-xs ${textSecondary} cursor-pointer`}>
                  <input
                    type="checkbox"
                    checked={broadcastAlert}
                    onChange={(e) => setBroadcastAlert(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Broadcast Immediate Operational Alert to Dispatchers</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs ${textMuted}`}>Severity:</span>
                {(['critical', 'high', 'medium', 'low'] as const).map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverity(sev)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                      severity === sev
                        ? sev === 'critical'
                          ? 'bg-rose-600 text-white'
                          : sev === 'high'
                          ? 'bg-amber-600 text-white'
                          : sev === 'medium'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-700 text-white'
                        : theme === 'dark'
                        ? 'bg-[#0a0a0a] text-neutral-400 hover:text-white border border-[#262626]'
                        : 'bg-slate-100 text-slate-600 hover:text-black border border-slate-300'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className={`w-full font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-[0.99] ${
                  theme === 'dark'
                    ? 'bg-[#f1f3f7] hover:bg-white text-slate-950 shadow-white/5'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{at.fieldReportingSubmit}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      <AlternativeCommModal
        isOpen={isAltCommOpen}
        onClose={() => setIsAltCommOpen(false)}
        theme={theme}
        draftData={{
          type: hazardType,
          landmark,
          location: `${district}, ${state}`,
          status,
          coordinates: `${latitude}, ${longitude}`,
        }}
      />
    </div>
  );
};
