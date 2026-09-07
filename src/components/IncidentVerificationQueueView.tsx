import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Camera,
  AlertTriangle,
  FileCheck,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Send,
  Eye,
  Check,
  Ban
} from 'lucide-react';
import { Incident } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface IncidentVerificationQueueViewProps {
  incidents: Incident[];
  onVerifyIncident: (id: string, updates: { status: 'PASSABLE' | 'RESTRICTED' | 'BLOCKED'; clearanceEta: string; officialNotes: string }) => void;
  onRejectIncident: (id: string, reason: string) => void;
  onNavigateTab: (tab: string, context?: any) => void;
  theme?: 'dark' | 'light';
}

export const IncidentVerificationQueueView: React.FC<IncidentVerificationQueueViewProps> = ({
  incidents,
  onVerifyIncident,
  onRejectIncident,
  onNavigateTab,
  theme = 'dark',
}) => {
  const { at } = useLanguage();
  const [activeTab, setActiveTab] = useState<'pending' | 'verified' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);

  // Form states for verifying the selected incident
  const [editStatus, setEditStatus] = useState<'PASSABLE' | 'RESTRICTED' | 'BLOCKED'>('BLOCKED');
  const [editClearanceEta, setEditClearanceEta] = useState('2 - 4 Hours');
  const [editOfficialNotes, setEditOfficialNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState<string | null>(null);

  const cardBorder = theme === 'dark' ? 'border-[#262626]' : 'border-slate-200';
  const surfaceBg = theme === 'dark' ? 'bg-black' : 'bg-white shadow-sm';
  const consoleBg = theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-50';
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-neutral-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-neutral-400' : 'text-slate-600';
  const innerBg = theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-50 border-slate-200';

  const pendingIncidents = incidents.filter((i) => i.verificationStatus === 'PENDING');
  const verifiedIncidents = incidents.filter((i) => i.verificationStatus === 'VERIFIED' || !i.verificationStatus);
  const rejectedIncidents = incidents.filter((i) => i.verificationStatus === 'REJECTED');

  const currentList = activeTab === 'pending' 
    ? pendingIncidents 
    : activeTab === 'verified' 
    ? verifiedIncidents 
    : rejectedIncidents;

  const filteredList = currentList.filter((inc) => {
    return (
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.landmark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const activeIncident = selectedIncidentId 
    ? incidents.find(i => i.id === selectedIncidentId) || filteredList[0] 
    : filteredList[0];

  const handleSelectToVerify = (inc: Incident) => {
    setSelectedIncidentId(inc.id);
    setEditStatus(inc.status);
    setEditClearanceEta(inc.clearanceEta || '2 - 4 Hours');
    setEditOfficialNotes(inc.officialNotes || `Verified by BRO / SDMA Command Room. Dispatched ground team to ${inc.district}.`);
  };

  const handleConfirmVerify = () => {
    if (!activeIncident) return;
    onVerifyIncident(activeIncident.id, {
      status: editStatus,
      clearanceEta: editClearanceEta,
      officialNotes: editOfficialNotes,
    });
  };

  const handleConfirmReject = (id: string) => {
    onRejectIncident(id, rejectReason || 'Duplicate or unverified submission.');
    setShowRejectDialog(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-4 pb-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className={`p-4 rounded-xl border ${cardBorder} ${surfaceBg} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-xl ${
            theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626] text-amber-400' : 'bg-amber-50 border-amber-300 text-amber-700'
          } border flex items-center justify-center font-bold text-sm shrink-0`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className={`text-lg font-bold tracking-tight ${textPrimary}`}>
                {at.verificationQueueTitle}
              </h1>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border uppercase tracking-wider ${
                theme === 'dark' ? 'bg-amber-950/60 border-amber-800 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
              }`}>
                Authority Control Room
              </span>
            </div>
            <p className={`text-xs ${textMuted} mt-0.5`}>
              {at.verificationQueueSubtitle}
            </p>
          </div>
        </div>

        {/* Status Metrics */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          <div className={`px-3 py-1.5 rounded-lg border text-center ${
            theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-100 border-slate-300'
          }`}>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-bold">Pending Review</div>
            <div className={`text-base font-extrabold ${textPrimary}`}>{pendingIncidents.length}</div>
          </div>
          <div className={`px-3 py-1.5 rounded-lg border text-center ${
            theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-100 border-slate-300'
          }`}>
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-bold">Verified Active</div>
            <div className={`text-base font-extrabold ${textPrimary}`}>{verifiedIncidents.length}</div>
          </div>
          <div className={`px-3 py-1.5 rounded-lg border text-center ${
            theme === 'dark' ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-slate-100 border-slate-300'
          }`}>
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">Review Latency</div>
            <div className={`text-base font-extrabold ${textPrimary}`}>&lt; 8 mins</div>
          </div>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Navigation Tabs */}
        <div className={`inline-flex p-1 rounded-xl border ${cardBorder} ${
          theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-100'
        }`}>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'pending'
                ? theme === 'dark'
                  ? 'bg-white text-black shadow'
                  : 'bg-white text-slate-950 shadow border border-slate-300'
                : theme === 'dark'
                ? 'text-neutral-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{at.verificationQueuePending} ({pendingIncidents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('verified')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'verified'
                ? theme === 'dark'
                  ? 'bg-white text-black shadow'
                  : 'bg-white text-slate-950 shadow border border-slate-300'
                : theme === 'dark'
                ? 'text-neutral-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{at.verificationQueueVerified} ({verifiedIncidents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rejected')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'rejected'
                ? theme === 'dark'
                  ? 'bg-white text-black shadow'
                  : 'bg-white text-slate-950 shadow border border-slate-300'
                : theme === 'dark'
                ? 'text-neutral-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Ban className="w-3.5 h-3.5 text-rose-500" />
            <span>{at.verificationQueueDismissed} ({rejectedIncidents.length})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search report by corridor or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${
              theme === 'dark'
                ? 'bg-[#0a0a0a] border-[#262626] text-white placeholder-neutral-500'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
            } focus:outline-none focus:ring-1 focus:ring-neutral-400`}
          />
        </div>
      </div>

      {/* Main Grid: Queue List (Left) + Verification Detail & Action Station (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Report Cards */}
        <div className="lg:col-span-6 space-y-3">
          {filteredList.length === 0 ? (
            <div className={`p-8 rounded-xl border ${cardBorder} ${surfaceBg} text-center space-y-2`}>
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <div className={`text-sm font-bold ${textPrimary}`}>Queue Clear</div>
              <p className={`text-xs ${textMuted}`}>
                No submissions matching this filter. All citizen and field reports have been processed.
              </p>
            </div>
          ) : (
            filteredList.map((inc) => {
              const isSelected = activeIncident?.id === inc.id;
              const isPending = inc.verificationStatus === 'PENDING';

              return (
                <div
                  key={inc.id}
                  onClick={() => handleSelectToVerify(inc)}
                  className={`p-4 rounded-xl border transition cursor-pointer relative ${
                    isSelected
                      ? theme === 'dark'
                        ? 'border-white bg-[#141414] shadow-lg ring-1 ring-white/30'
                        : 'border-slate-800 bg-slate-50 shadow-md ring-1 ring-slate-800/20'
                      : `${cardBorder} ${surfaceBg} hover:border-neutral-500`
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold border border-neutral-700 bg-[#0a0a0a] text-neutral-300">
                        {inc.code}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          inc.status === 'BLOCKED'
                            ? theme === 'dark' ? 'bg-rose-950/80 text-rose-300 border-rose-800' : 'bg-rose-100 text-rose-800 border-rose-300'
                            : inc.status === 'RESTRICTED'
                            ? theme === 'dark' ? 'bg-amber-950/80 text-amber-300 border-amber-800' : 'bg-amber-100 text-amber-800 border-amber-300'
                            : theme === 'dark' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        {inc.status}
                      </span>
                      {isPending && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          Pending Authority Review
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{inc.timeAgo}</span>
                    </div>
                  </div>

                  <h3 className={`text-sm font-bold tracking-tight mb-1 ${textPrimary}`}>
                    {inc.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="line-clamp-1">{inc.landmark} — {inc.district}</span>
                  </div>

                  <p className={`text-xs ${textSecondary} line-clamp-2 mb-3 leading-relaxed`}>
                    {inc.description}
                  </p>

                  <div className="flex items-center justify-between pt-2.5 border-t border-neutral-800/60 text-[11px]">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <span className="font-semibold text-neutral-300">Reported By:</span>
                      <span className="truncate max-w-[200px]">{inc.reportedBy || 'Public Commuter'}</span>
                    </div>

                    {inc.photoUrl && (
                      <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                        <Camera className="w-3 h-3" />
                        <span>Photo Attached</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Verification & Official Publishing Panel */}
        <div className="lg:col-span-6">
          {activeIncident ? (
            <div className={`p-5 rounded-xl border ${cardBorder} ${surfaceBg} space-y-4 sticky top-20`}>
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold border border-neutral-700 bg-[#0a0a0a] text-neutral-300">
                      {activeIncident.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      activeIncident.severity === 'critical' ? 'bg-rose-950 text-rose-400 border-rose-800' : 'bg-amber-950 text-amber-400 border-amber-800'
                    }`}>
                      Severity: {activeIncident.severity.toUpperCase()}
                    </span>
                  </div>
                  <h2 className={`text-base font-bold ${textPrimary}`}>
                    {activeIncident.title}
                  </h2>
                </div>

                <button
                  onClick={() => onNavigateTab('map', { focusIncidentId: activeIncident.id })}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border font-medium transition ${
                    theme === 'dark' ? 'border-[#262626] bg-[#0a0a0a] text-neutral-300 hover:text-white' : 'border-slate-300 bg-slate-100 text-slate-700'
                  }`}
                  title="View on Map"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Locate GIS</span>
                </button>
              </div>

              {/* Submitter Info & Attached Photographic Evidence */}
              <div className="space-y-3">
                <div className={`p-3 rounded-lg border ${innerBg} text-xs space-y-1.5`}>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="font-semibold text-neutral-200">Reporting Attribution:</span>
                    <span className="font-mono text-[10px]">{activeIncident.timestamp}</span>
                  </div>
                  <div className={`font-medium ${textPrimary}`}>
                    {activeIncident.reportedBy || 'Citizen Traveler'}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Location: {activeIncident.landmark}, {activeIncident.district} ({activeIncident.state})
                  </div>
                </div>

                {/* Evidence Photo */}
                {activeIncident.photoUrl && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-neutral-300">
                      <span className="flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Submitted Field Photo</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">EXIF Geotagged</span>
                    </div>
                    <div className="relative rounded-lg overflow-hidden border border-neutral-700 aspect-video max-h-56 bg-black">
                      <img
                        src={activeIncident.photoUrl}
                        alt="Hazard evidence"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className={`p-3 rounded-lg border ${innerBg} text-xs leading-relaxed ${textSecondary}`}>
                  <div className="font-bold text-neutral-300 mb-1">Citizen Ground Observation:</div>
                  {activeIncident.description}
                </div>
              </div>

              {/* Authority Decision Station */}
              <div className="pt-2 border-t border-neutral-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4" />
                  <span>{at.verificationQueueAuthorityAction}</span>
                </div>

                {/* Road Passage Status Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    {at.verificationQueueOfficialStatus}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['BLOCKED', 'RESTRICTED', 'PASSABLE'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setEditStatus(status)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition text-center ${
                          editStatus === status
                            ? status === 'BLOCKED'
                              ? 'bg-rose-950 text-rose-200 border-rose-700 ring-1 ring-rose-500'
                              : status === 'RESTRICTED'
                              ? 'bg-amber-950 text-amber-200 border-amber-700 ring-1 ring-amber-500'
                              : 'bg-emerald-950 text-emerald-200 border-emerald-700 ring-1 ring-emerald-500'
                            : theme === 'dark'
                            ? 'bg-[#0a0a0a] border-[#262626] text-neutral-400 hover:text-white'
                            : 'bg-slate-100 border-slate-300 text-slate-700'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clearance ETA Input */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    {at.verificationQueueClearanceEta}
                  </label>
                  <input
                    type="text"
                    value={editClearanceEta}
                    onChange={(e) => setEditClearanceEta(e.target.value)}
                    placeholder="e.g., 2 - 4 Hours, or Estimated 16:30"
                    className={`w-full px-3 py-2 text-xs rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-[#0a0a0a] border-[#262626] text-white placeholder-neutral-500'
                        : 'bg-white border-slate-300 text-slate-900'
                    } focus:outline-none focus:ring-1 focus:ring-neutral-400`}
                  />
                </div>

                {/* Official Authority Declaration Note */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    {at.verificationQueueOfficialNote}
                  </label>
                  <textarea
                    rows={2}
                    value={editOfficialNotes}
                    onChange={(e) => setEditOfficialNotes(e.target.value)}
                    placeholder="Enter official command note, equipment deployed, or lane instructions..."
                    className={`w-full px-3 py-2 text-xs rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-[#0a0a0a] border-[#262626] text-white placeholder-neutral-500'
                        : 'bg-white border-slate-300 text-slate-900'
                    } focus:outline-none focus:ring-1 focus:ring-neutral-400`}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleConfirmVerify}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition active:scale-98"
                  >
                    <Check className="w-4 h-4" />
                    <span>{at.verificationQueueVerifyBroadcast}</span>
                  </button>

                  <button
                    onClick={() => setShowRejectDialog(activeIncident.id)}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 transition"
                    title="Dismiss as duplicate or false alarm"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Reject Confirmation Modal / Inline input */}
              {showRejectDialog === activeIncident.id && (
                <div className="p-3 rounded-lg border border-rose-800/80 bg-rose-950/40 text-xs space-y-2 mt-3">
                  <div className="font-bold text-rose-300">{at.verificationQueueDismiss}</div>
                  <input
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Reason (e.g. Duplicate report, roadway cleared, invalid photo)..."
                    className="w-full px-3 py-1.5 text-xs rounded border border-rose-700 bg-black text-white"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setShowRejectDialog(null)}
                      className="px-3 py-1 rounded text-neutral-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleConfirmReject(activeIncident.id)}
                      className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold"
                    >
                      Confirm Dismissal
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`p-8 rounded-xl border ${cardBorder} ${surfaceBg} text-center text-neutral-400 text-xs`}>
              {at.verificationQueueSelectReport}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
