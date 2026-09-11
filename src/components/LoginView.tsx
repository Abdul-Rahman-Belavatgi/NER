import React, { useState } from 'react';
import {
  Radio,
  Map,
  AlertTriangle,
  Lock,
  Mail,
  Truck,
  Building2,
  Shield,
  Phone,
  User,
  KeyRound,
  FileCheck,
  ChevronDown,
  Globe,
  Sun,
  Moon,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  PhoneCall,
  ExternalLink,
  Copy,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserRole } from '../types';
import { LANGUAGES, LanguageCode, TRANSLATIONS } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
  onViewMap?: () => void;
  onReportIssue?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  currentLang?: LanguageCode;
  onSelectLang?: (lang: LanguageCode) => void;
}

type UserCategory = 'logistics' | 'authority';
type AuthMode = 'login' | 'register';

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  onViewMap,
  onReportIssue,
  theme,
  onToggleTheme,
  currentLang: propLang,
  onSelectLang,
}) => {
  const { currentLang: contextLang, setLang } = useLanguage();
  const currentLang = propLang || contextLang;

  // Selected Authority/Sector and Auth Mode
  const [category, setCategory] = useState<UserCategory>('logistics');
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  // Language management with local fallback and sync
  const [localLang, setLocalLang] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('ner_lang') as LanguageCode;
    if (saved && TRANSLATIONS[saved]) return saved;
    return currentLang;
  });

  const activeLang: LanguageCode = (currentLang && TRANSLATIONS[currentLang]) ? currentLang : localLang;
  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.en;

  const handleSelectLanguage = (code: LanguageCode) => {
    setLocalLang(code);
    localStorage.setItem('ner_lang', code);
    setLang(code);
    if (onSelectLang) {
      onSelectLang(code);
    }
    setIsLangDropdownOpen(false);
  };

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordInput, setForgotPasswordInput] = useState('');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  // 1. Logistics Operator Form State
  const [logisticsFleetId, setLogisticsFleetId] = useState('LOG-8842');
  const [logisticsPassword, setLogisticsPassword] = useState('••••••••••••');
  const [showLogisticsPassword, setShowLogisticsPassword] = useState(false);
  const [logisticsRememberMe, setLogisticsRememberMe] = useState(true);

  // Logistics Register State
  const [logisticsRegFullName, setLogisticsRegFullName] = useState('Bikash Das');
  const [logisticsRegCompany, setLogisticsRegCompany] = useState('NER Greenways Cargo');
  const [logisticsRegEmail, setLogisticsRegEmail] = useState('bikash@nertransport.com');
  const [logisticsRegPhone, setLogisticsRegPhone] = useState('+91 98640 55120');
  const [logisticsRegLicense, setLogisticsRegLicense] = useState('AS-01-TRANS-5621');
  const [logisticsRegPassword, setLogisticsRegPassword] = useState('');
  const [logisticsRegConfirmPassword, setLogisticsRegConfirmPassword] = useState('');

  // 2. Government / Disaster Authority Form State
  const [govtOfficerId, setGovtOfficerId] = useState('arjun.das@bro.gov.in');
  const [govtPassword, setGovtPassword] = useState('••••••••••••');
  const [showGovtPassword, setShowGovtPassword] = useState(false);

  // Authority Register State
  const [govtRegFullName, setGovtRegFullName] = useState('Capt. Arjun Das');
  const [govtRegEmail, setGovtRegEmail] = useState('a.das@bro.gov.in');
  const [govtRegPhone, setGovtRegPhone] = useState('+91 94350 11200');
  const [govtRegDepartment, setGovtRegDepartment] = useState('Border Roads Organisation (BRO)');
  const [govtRegDesignation, setGovtRegDesignation] = useState('Executive Engineer (Civil) - Task Force 24');
  const [govtRegNodalToken, setGovtRegNodalToken] = useState('BRO-SEC-9921');
  const [govtRegPassword, setGovtRegPassword] = useState('');
  const [govtRegConfirmPassword, setGovtRegConfirmPassword] = useState('');

  // Authority Register Success Status State
  const [authoritySubmissionNotice, setAuthoritySubmissionNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Email domain check for govt registration (@gov.in, @nic.in, @bro.gov.in)
  const isGovDomain = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    return (
      trimmed.endsWith('@gov.in') ||
      trimmed.endsWith('@nic.in') ||
      trimmed.endsWith('@bro.gov.in') ||
      trimmed.endsWith('.gov.in')
    );
  };

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  // Logistics Log In Submit
  const handleLogisticsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!logisticsFleetId.trim() || !logisticsPassword.trim()) {
      setErrorMessage(t.errorFillLogistics);
      return;
    }
    // Launch Logistics Portal
    onLogin('dispatcher');
  };

  // Logistics Register Submit
  const handleLogisticsRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (logisticsRegPassword && logisticsRegPassword !== logisticsRegConfirmPassword) {
      setErrorMessage(t.errorPasswordMatch);
      return;
    }
    // Automatically creates account and logs in
    onLogin('dispatcher');
  };

  // Government Authority Log In Submit
  const handleGovtLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!govtOfficerId.trim() || !govtPassword.trim()) {
      setErrorMessage(t.errorFillGovt);
      return;
    }
    // Launch Command Portal
    onLogin('admin');
  };

  // Government Authority Register Submit
  const handleGovtRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!isGovDomain(govtRegEmail)) {
      setErrorMessage(t.errorGovtDomain);
      return;
    }
    if (govtRegPassword && govtRegPassword !== govtRegConfirmPassword) {
      setErrorMessage(t.errorPasswordMatch);
      return;
    }
    // Show official submission confirmation banner as requested
    setAuthoritySubmissionNotice(true);
  };

  // Color constants - PURE BLACK for dark theme (no blue hue)
  const isDark = theme === 'dark';
  const pageBg = isDark ? 'bg-black text-slate-100' : 'bg-slate-100 text-slate-900';
  const cardBg = isDark ? 'bg-[#0a0a0a] border-[#222222]' : 'bg-white border-slate-200 shadow-xl';
  const panelBg = isDark ? 'bg-black border-[#222222]' : 'bg-slate-50 border-slate-200';
  const inputBg = isDark
    ? 'bg-black border-[#262626] text-white placeholder-neutral-500 focus:border-neutral-400'
    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500';
  const textMuted = isDark ? 'text-neutral-400' : 'text-slate-600';
  const textSubtle = isDark ? 'text-neutral-500' : 'text-slate-500';

  const helplineItems = [
    {
      title: 'NHIDCL / National Highway Emergency',
      number: '1033',
      desc:
        activeLang === 'as'
          ? 'টোল-ফ্ৰী ২৪x৭ ঘাইপথ সাহায্য, ভূমিস্খলন পৰিষ্কাৰ আৰু এম্বুলেন্স'
          : activeLang === 'bn'
          ? 'টোল-ফ্রি ২৪x৭ হাইওয়ে ব্রেকডাউন, ভূমিধস ক্লিয়ারেন্স ও অ্যাম্বুলেন্স'
          : activeLang === 'hi'
          ? 'टोल-फ्री 24x7 राजमार्ग सहायता, भूस्खलन मलबा हटाना एवं एम्बुलेंस'
          : activeLang === 'kha'
          ? 'Toll-free 24x7 jingiarap ha ki surok bah bad ambulance'
          : activeLang === 'mni'
          ? '24x7 ꯇꯣꯜ-ꯐ꯭ꯔꯤ ꯂꯝꯕꯤ ꯃꯇꯦꯡ ꯑꯃꯁꯨꯡ ꯑꯦꯝꯕꯨꯂꯦꯟꯁ'
          : 'Toll-free 24x7 highway breakdown, landslide clearance & ambulance',
    },
    {
      title: 'National Emergency Response (Police/Fire/Ambulance)',
      number: '112',
      desc:
        activeLang === 'as'
          ? 'সৰ্বভাৰতীয় জৰুৰীকালীন একক নম্বৰ'
          : activeLang === 'bn'
          ? 'সর্বভারতীয় সমন্বিত জরুরি নম্বর'
          : activeLang === 'hi'
          ? 'अखिल भारतीय एकीकृत आपातकालीन नंबर'
          : activeLang === 'kha'
          ? 'All-India unified distress helpline'
          : activeLang === 'mni'
          ? 'ꯑꯣꯜ-ꯏꯟꯗꯤꯌꯥ ꯌꯨꯅꯤꯐꯥꯏꯗ ꯏꯃꯔꯖꯦꯟꯁꯤ ꯅꯝꯕꯔ'
          : 'All-India unified distress lifeline',
    },
    {
      title: 'State Disaster Management Authority (SDMA) Assam',
      number: '1070',
      desc:
        activeLang === 'as'
          ? 'জৰুৰীকালীন কাৰ্যকৰী কেন্দ্ৰ (দিশপুৰ ৰাজ্যিক নিয়ন্ত্ৰণ কক্ষ)'
          : activeLang === 'bn'
          ? 'জরুরি অপারেশন কেন্দ্র (দিসপুর রাজ্য নিয়ন্ত্রণ কক্ষ)'
          : activeLang === 'hi'
          ? 'राज्य आपातकालीन संचालन केंद्र (दिसपुर)'
          : activeLang === 'kha'
          ? 'State Disaster Control Room (Dispur)'
          : activeLang === 'mni'
          ? 'ꯁ꯭ꯇꯦꯠ ꯗꯤꯖꯥꯁ꯭ꯇꯔ ꯀꯟꯇ꯭ꯔꯣꯜ ꯔꯨꯝ (ꯗꯤꯁꯄꯨꯔ)'
          : 'Emergency Operations Centre (Dispur State Control Room)',
    },
    {
      title: 'Meghalaya State Disaster Control Room',
      number: '1077',
      desc:
        activeLang === 'as'
          ? 'জিলা দুৰ্যোগ জৰুৰীকালীন কাৰ্যকৰী কেন্দ্ৰ (শ্বিলং)'
          : activeLang === 'bn'
          ? 'জেলা দুর্যোগ জরুরি কেন্দ্র (শিলং)'
          : activeLang === 'hi'
          ? 'जिला आपदा नियंत्रण कक्ष (शिलांग)'
          : activeLang === 'kha'
          ? 'District Disaster Control Room (Shillong)'
          : activeLang === 'mni'
          ? 'ꯗꯤꯁ꯭ꯇ꯭ꯔꯤꯛ ꯗꯤꯖꯥꯁ꯭ꯇꯔ ꯀꯟꯇ꯭ꯔꯣꯜ ꯔꯨꯝ (ꯁꯤꯂꯣꯡ)'
          : 'District Disaster Emergency Operations Centre (Shillong)',
    },
    {
      title: 'Border Roads Organisation (BRO) Project Pushpak',
      number: '+91 3862-232014',
      desc:
        activeLang === 'as'
          ? 'পাহাৰ আৰু সুৰংগ পথ পৰিষ্কাৰ মুখ্য কাৰ্যালয়'
          : activeLang === 'bn'
          ? 'পাহাড় ও টানেল পথ ক্লিয়ারেন্স সদর দপ্তর'
          : activeLang === 'hi'
          ? 'पहाड़ी मार्ग एवं सुरंग क्लीयरेंस मुख्यालय'
          : activeLang === 'kha'
          ? 'BRO Hills & Tunnel clearance headquarters'
          : activeLang === 'mni'
          ? 'BRO ꯍꯤꯜꯁ ꯑꯃꯁꯨꯡ ꯇꯅꯦꯜ ꯍꯦꯗꯀ꯭ꯋꯥꯔꯇꯔ'
          : 'Hills & Tunnel clearance headquarters',
    },
    {
      title: 'Traffic & Highway Patrol (East Khasi & Sonapur)',
      number: '+91 364-2222214',
      desc:
        activeLang === 'as'
          ? 'কৰিডৰ চক পইণ্ট আৰু কনভয় নিৰীক্ষণ নিয়ন্ত্ৰণ'
          : activeLang === 'bn'
          ? 'করিডোর চোখ পয়েন্ট ও কনভয় নিয়ন্ত্রণ কেন্দ্র'
          : activeLang === 'hi'
          ? 'कॉरिडोर चोक पॉइंट एवं काफिला एस्कॉर्ट नियंत्रण'
          : activeLang === 'kha'
          ? 'Traffic & Highway Patrol Control'
          : activeLang === 'mni'
          ? 'ꯇ꯭ꯔꯥꯐꯤꯛ ꯑꯃꯁꯨꯡ ꯍꯥꯏꯋꯦ ꯄꯦꯠꯔꯣꯜ ꯀꯟꯇ꯭ꯔꯣꯜ'
          : 'Corridor choke point & convoy escort control',
    },
  ];

  return (
    <div className={`min-h-screen ${pageBg} flex flex-col justify-between items-center p-3 sm:p-6 relative select-none font-sans transition-colors duration-200`}>
      {/* Top Corner: Theme Toggle & Language Option */}
      <header className="w-full flex items-center justify-end py-1 sm:py-2 z-30">
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Option Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                isDark
                  ? 'border-[#262626] bg-[#0f0f0f] text-neutral-200 hover:border-neutral-500 hover:text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900'
              }`}
              title="Select Language"
            >
              <Globe strokeWidth={2} className="w-3.5 h-3.5 text-emerald-500" />
              <span>{LANGUAGES.find((l) => l.code === activeLang)?.nativeName || 'English'}</span>
              <ChevronDown strokeWidth={2} className="w-3 h-3 text-neutral-400" />
            </button>

            {isLangDropdownOpen && (
              <div
                className={`absolute right-0 mt-1.5 w-48 rounded-xl border py-1 shadow-2xl z-50 ${
                  isDark ? 'bg-[#0f0f0f] border-[#262626] text-neutral-200' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider ${textSubtle} border-b ${isDark ? 'border-[#222222]' : 'border-slate-100'}`}>
                  {t.languageOption}
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition ${
                      activeLang === lang.code
                        ? isDark
                          ? 'bg-neutral-800 text-white font-bold'
                          : 'bg-slate-100 text-slate-950 font-bold'
                        : isDark
                        ? 'hover:bg-neutral-900 text-neutral-300'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] font-mono text-neutral-500">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle (Pure Black vs Clean Light) */}
          <button
            onClick={onToggleTheme}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
              isDark
                ? 'border-[#262626] bg-[#0f0f0f] text-neutral-200 hover:border-neutral-500 hover:text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900'
            }`}
            title="Toggle Visual Theme"
          >
            {isDark ? (
              <Sun strokeWidth={2} className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon strokeWidth={2} className="w-3.5 h-3.5 text-slate-700" />
            )}
            <span className="hidden sm:inline">{isDark ? t.lightMode : t.blackTheme}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-5xl my-auto py-4 flex flex-col items-center">
        {/* Header - As It Is (Image 1 arrow) */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black shadow-lg shadow-white/5 mb-3">
            <Radio strokeWidth={2.25} className="w-6 h-6 icon-anim-pulse" />
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.appTitle}
          </h1>
          <p className={`text-xs sm:text-sm mt-1 font-medium ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            {t.appSubtitle}
          </p>
        </div>

        {/* LOGIN CARD SKELETON (Image 1 layout) */}
        <div className={`w-full ${cardBg} border rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden transition-colors`}>
          {/* Main 2-Column Split: (no login required) vs (official authorities and logistics only) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* LEFT SECTION: (no login required) */}
            <div className={`lg:col-span-5 ${panelBg} border rounded-xl p-4 flex flex-col justify-between h-full space-y-4`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-mono uppercase tracking-wider font-bold ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    {t.noLoginRequired}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {t.publicAccess}
                  </span>
                </div>

                <p className={`text-xs mb-4 leading-relaxed ${textMuted}`}>
                  {t.publicDescription}
                </p>

                {/* The Two Prominent Actions */}
                <div className="space-y-3">
                  {/* VIEW MAP Button */}
                  <button
                    onClick={() => (onViewMap ? onViewMap() : onLogin('field'))}
                    className={`w-full p-4 rounded-xl border text-left transition group ${
                      isDark
                        ? 'bg-neutral-900/90 hover:bg-neutral-800 border-[#2b2b2b] hover:border-neutral-500 text-white'
                        : 'bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                          <Map strokeWidth={2.25} className="w-5 h-5 icon-anim-spin" />
                        </div>
                        <div>
                          <div className="text-sm font-bold tracking-tight group-hover:text-emerald-400 transition-colors">
                            {t.viewMap}
                          </div>
                          <div className={`text-[11px] ${textMuted}`}>
                            {t.viewMapDesc}
                          </div>
                        </div>
                      </div>
                      <ArrowRight strokeWidth={2} className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>

                  {/* Report Issue Button */}
                  <button
                    onClick={() => (onReportIssue ? onReportIssue() : onLogin('field'))}
                    className={`w-full p-4 rounded-xl border text-left transition group ${
                      isDark
                        ? 'bg-neutral-900/90 hover:bg-neutral-800 border-[#2b2b2b] hover:border-neutral-500 text-white'
                        : 'bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                          <AlertTriangle strokeWidth={2.25} className="w-5 h-5 icon-anim-heart" />
                        </div>
                        <div>
                          <div className="text-sm font-bold tracking-tight group-hover:text-amber-400 transition-colors">
                            {t.reportIssue}
                          </div>
                          <div className={`text-[11px] ${textMuted}`}>
                            {t.reportIssueDesc}
                          </div>
                        </div>
                      </div>
                      <ArrowRight strokeWidth={2} className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Quick Info Callout */}
              <div className={`p-3 rounded-lg border text-[11px] leading-relaxed ${isDark ? 'bg-neutral-900/40 border-[#222222] text-neutral-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                <span className="font-semibold text-neutral-300">{t.publicProtocolTitle}</span> {t.publicProtocolDesc}
              </div>
            </div>

            {/* RIGHT SECTION: (official authorities and logistics only) */}
            <div className={`lg:col-span-7 ${panelBg} border rounded-xl p-4 sm:p-5 flex flex-col justify-between`}>
              <div>
                {/* Header label */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`text-[11px] font-mono uppercase tracking-wider font-bold ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    {t.officialOnly}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${isDark ? 'bg-neutral-900 border-[#2b2b2b] text-neutral-300' : 'bg-slate-200 border-slate-300 text-slate-700'}`}>
                    {t.securedAccess}
                  </span>
                </div>

                {/* Dropdown Selector as noted on Image 1 */}
                <div className="space-y-3 mb-4">
                  <div>
                    <label className={`block text-[11px] font-mono uppercase font-bold tracking-wider mb-1.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                      {t.selectPortalSector}
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value as UserCategory);
                          setErrorMessage(null);
                          setAuthoritySubmissionNotice(false);
                        }}
                        className={`w-full ${inputBg} border rounded-xl px-3.5 py-2.5 text-xs font-semibold appearance-none pr-9 focus:outline-none transition`}
                      >
                        <option value="logistics">{t.sectorLogistics}</option>
                        <option value="authority">{t.sectorAuthority}</option>
                      </select>
                      <ChevronDown strokeWidth={2} className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Sub-Tabs: log in vs register */}
                  <div className={`flex rounded-xl p-1 border ${isDark ? 'bg-black border-[#262626]' : 'bg-slate-200 border-slate-300'}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setErrorMessage(null);
                        setAuthoritySubmissionNotice(false);
                      }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                        authMode === 'login'
                          ? isDark
                            ? 'bg-white text-black shadow-sm'
                            : 'bg-slate-900 text-white shadow-sm'
                          : isDark
                          ? 'text-neutral-400 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.logInTab}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setErrorMessage(null);
                        setAuthoritySubmissionNotice(false);
                      }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                        authMode === 'register'
                          ? isDark
                            ? 'bg-white text-black shadow-sm'
                            : 'bg-slate-900 text-white shadow-sm'
                          : isDark
                          ? 'text-neutral-400 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.registerTab}
                    </button>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mb-4 p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle strokeWidth={2} className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Authority Registration Success Banner (Image 3 note requirement) */}
                {authoritySubmissionNotice ? (
                  <div className={`p-5 rounded-xl border text-center space-y-3 ${isDark ? 'bg-neutral-900 border-[#262626]' : 'bg-white border-slate-300 shadow-md'}`}>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 strokeWidth={2.5} className="w-6 h-6" />
                    </div>
                    <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {t.verificationSubmittedTitle}
                    </h3>
                    {/* The exact requested text */}
                    <div className={`text-xs font-medium px-2 py-3 rounded-lg border ${isDark ? 'bg-black border-[#222222] text-neutral-300' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                      {t.verificationApprovalNotice}
                    </div>
                    <p className={`text-[11px] ${textMuted}`}>
                      {t.trackingTokenLabel} <span className="font-mono text-emerald-400 font-bold">{govtRegNodalToken || 'BRO-SEC-9921'}</span> • {t.nodalOfficeLabel}
                    </p>
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => {
                          setAuthoritySubmissionNotice(false);
                          setAuthMode('login');
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                          isDark
                            ? 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                        }`}
                      >
                        {t.returnToLoginBtn}
                      </button>
                      <button
                        onClick={() => onLogin('admin')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white`}
                      >
                        {t.enterPreviewBtn}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* =========================================================
                        FORM 1: LOGISTICS OPERATOR
                        ========================================================= */}
                    {category === 'logistics' && authMode === 'login' && (
                      <form onSubmit={handleLogisticsLogin} className="space-y-3.5">
                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                            {t.fleetIdLabel}
                          </label>
                          <div className="relative">
                            <Truck strokeWidth={2} className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={logisticsFleetId}
                              onChange={(e) => setLogisticsFleetId(e.target.value)}
                              placeholder={t.fleetIdPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                            {t.passwordLabel}
                          </label>
                          <div className="relative">
                            <Lock strokeWidth={2} className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type={showLogisticsPassword ? 'text' : 'password'}
                              value={logisticsPassword}
                              onChange={(e) => setLogisticsPassword(e.target.value)}
                              placeholder={t.passwordPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl pl-9 pr-10 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowLogisticsPassword((prev) => !prev)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5 transition"
                              title={showLogisticsPassword ? 'Hide password' : 'Show password'}
                            >
                              {showLogisticsPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Remember Me Checkbox & Forgot Password Link */}
                        <div className="flex items-center justify-between text-xs pt-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={logisticsRememberMe}
                              onChange={(e) => setLogisticsRememberMe(e.target.checked)}
                              className="w-3.5 h-3.5 rounded border-neutral-700 text-emerald-500 focus:ring-emerald-500"
                            />
                            <span className={isDark ? 'text-neutral-300' : 'text-slate-700'}>{t.rememberMe}</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsForgotPasswordOpen(true)}
                            className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium"
                          >
                            {t.forgotPassword}
                          </button>
                        </div>

                        {/* Action Button: Sign In to Fleet Portal */}
                        <button
                          type="submit"
                          className={`w-full ${
                            isDark ? 'bg-white hover:bg-neutral-200 text-black' : 'bg-slate-900 hover:bg-slate-800 text-white'
                          } font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-md cursor-pointer`}
                        >
                          <Truck strokeWidth={2} className="w-4 h-4" />
                          <span>{t.signInFleetBtn}</span>
                          <ArrowRight strokeWidth={2} className="w-4 h-4 ml-1" />
                        </button>

                        {/* Quick 1-Click Role Access */}
                        <div className={`pt-3 border-t ${isDark ? 'border-neutral-800' : 'border-slate-200'} space-y-2`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${textMuted}`}>
                              Instant 1-Click Sign In
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                              Direct Access
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => onLogin('dispatcher')}
                              className={`p-2 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                                isDark
                                  ? 'bg-neutral-900/80 hover:bg-neutral-800 border-[#262626] text-white hover:border-emerald-500/50'
                                  : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-900 hover:border-emerald-500/50 shadow-sm'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                                <div>
                                  <div className="text-[11px] font-bold">Logistics Operator</div>
                                  <div className={`text-[9px] ${textSubtle}`}>Fleet &amp; Detours</div>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            </button>

                            <button
                              type="button"
                              onClick={() => onLogin('admin')}
                              className={`p-2 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                                isDark
                                  ? 'bg-neutral-900/80 hover:bg-neutral-800 border-[#262626] text-white hover:border-purple-500/50'
                                  : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-900 hover:border-purple-500/50 shadow-sm'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-purple-400 shrink-0" />
                                <div>
                                  <div className="text-[11px] font-bold">Govt Authority</div>
                                  <div className={`text-[9px] ${textSubtle}`}>BRO &amp; Police Command</div>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {category === 'logistics' && authMode === 'register' && (
                      <form onSubmit={handleLogisticsRegister} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.fullNameLabel}
                            </label>
                            <input
                              type="text"
                              value={logisticsRegFullName}
                              onChange={(e) => setLogisticsRegFullName(e.target.value)}
                              placeholder={t.fullNamePlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.companyNameLabel}
                            </label>
                            <input
                              type="text"
                              value={logisticsRegCompany}
                              onChange={(e) => setLogisticsRegCompany(e.target.value)}
                              placeholder={t.companyNamePlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.businessEmailLabel}
                            </label>
                            <input
                              type="email"
                              value={logisticsRegEmail}
                              onChange={(e) => setLogisticsRegEmail(e.target.value)}
                              placeholder={t.businessEmailPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.mobileNumberLabel}
                              <span className={`text-[10px] ml-1 font-normal ${textSubtle}`}>{t.mobileNumberNote}</span>
                            </label>
                            <input
                              type="tel"
                              value={logisticsRegPhone}
                              onChange={(e) => setLogisticsRegPhone(e.target.value)}
                              placeholder={t.mobileNumberPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                            {t.licenseNumberLabel}
                          </label>
                          <input
                            type="text"
                            value={logisticsRegLicense}
                            onChange={(e) => setLogisticsRegLicense(e.target.value)}
                            placeholder={t.licenseNumberPlaceholder}
                            className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none transition`}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.createPasswordLabel}
                            </label>
                            <input
                              type="password"
                              value={logisticsRegPassword}
                              onChange={(e) => setLogisticsRegPassword(e.target.value)}
                              placeholder={t.passwordPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.confirmPasswordLabel}
                            </label>
                            <input
                              type="password"
                              value={logisticsRegConfirmPassword}
                              onChange={(e) => setLogisticsRegConfirmPassword(e.target.value)}
                              placeholder={t.passwordPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                        </div>

                        {/* Action Button: Create Logistics Account */}
                        <button
                          type="submit"
                          className={`w-full ${
                            isDark ? 'bg-white hover:bg-neutral-200 text-black' : 'bg-slate-900 hover:bg-slate-800 text-white'
                          } font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-[0.99] mt-2`}
                        >
                          <CheckCircle2 strokeWidth={2} className="w-4 h-4 text-emerald-500" />
                          <span>{t.createLogisticsBtn}</span>
                        </button>
                      </form>
                    )}

                    {/* =========================================================
                        FORM 2: GOVERNMENT / DISASTER AUTHORITY
                        ========================================================= */}
                    {category === 'authority' && authMode === 'login' && (
                      <form onSubmit={handleGovtLogin} className="space-y-3.5">
                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                            {t.officerIdLabel}
                          </label>
                          <div className="relative">
                            <Shield strokeWidth={2} className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={govtOfficerId}
                              onChange={(e) => setGovtOfficerId(e.target.value)}
                              placeholder={t.officerIdPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                            {t.passwordLabel}
                          </label>
                          <div className="relative">
                            <Lock strokeWidth={2} className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type={showGovtPassword ? 'text' : 'password'}
                              value={govtPassword}
                              onChange={(e) => setGovtPassword(e.target.value)}
                              placeholder={t.passwordPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl pl-9 pr-10 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowGovtPassword((prev) => !prev)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5 transition"
                              title={showGovtPassword ? 'Hide password' : 'Show password'}
                            >
                              {showGovtPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end text-xs pt-1">
                          <button
                            type="button"
                            onClick={() => setIsForgotPasswordOpen(true)}
                            className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium"
                          >
                            {t.forgotPassword}
                          </button>
                        </div>

                        {/* Action Button: Access Command Portal */}
                        <button
                          type="submit"
                          className={`w-full ${
                            isDark ? 'bg-white hover:bg-neutral-200 text-black' : 'bg-slate-900 hover:bg-slate-800 text-white'
                          } font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-md cursor-pointer`}
                        >
                          <Shield strokeWidth={2} className="w-4 h-4 text-emerald-600" />
                          <span>{t.accessCommandBtn}</span>
                          <ArrowRight strokeWidth={2} className="w-4 h-4 ml-1" />
                        </button>

                        {/* Quick 1-Click Role Access */}
                        <div className={`pt-3 border-t ${isDark ? 'border-neutral-800' : 'border-slate-200'} space-y-2`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${textMuted}`}>
                              Instant 1-Click Sign In
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold">
                              Direct Access
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => onLogin('admin')}
                              className={`p-2 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                                isDark
                                  ? 'bg-neutral-900/80 hover:bg-neutral-800 border-[#262626] text-white hover:border-purple-500/50'
                                  : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-900 hover:border-purple-500/50 shadow-sm'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-purple-400 shrink-0" />
                                <div>
                                  <div className="text-[11px] font-bold">Govt Authority</div>
                                  <div className={`text-[9px] ${textSubtle}`}>BRO &amp; Police Command</div>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            </button>

                            <button
                              type="button"
                              onClick={() => onLogin('dispatcher')}
                              className={`p-2 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                                isDark
                                  ? 'bg-neutral-900/80 hover:bg-neutral-800 border-[#262626] text-white hover:border-emerald-500/50'
                                  : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-900 hover:border-emerald-500/50 shadow-sm'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                                <div>
                                  <div className="text-[11px] font-bold">Logistics Operator</div>
                                  <div className={`text-[9px] ${textSubtle}`}>Fleet &amp; Detours</div>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {category === 'authority' && authMode === 'register' && (
                      <form onSubmit={handleGovtRegister} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.officerFullNameLabel}
                            </label>
                            <input
                              type="text"
                              value={govtRegFullName}
                              onChange={(e) => setGovtRegFullName(e.target.value)}
                              placeholder={t.officerFullNamePlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.govtEmailLabel}
                            </label>
                            <input
                              type="email"
                              value={govtRegEmail}
                              onChange={(e) => setGovtRegEmail(e.target.value)}
                              placeholder={t.govtEmailPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                            {!isGovDomain(govtRegEmail) && govtRegEmail.length > 5 && (
                              <div className="text-[10px] text-amber-400 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>{t.govtEmailDomainAlert}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.govtMobileLabel}
                              <span className={`text-[10px] ml-1 font-normal ${textSubtle}`}>{t.govtMobileNote}</span>
                            </label>
                            <input
                              type="tel"
                              value={govtRegPhone}
                              onChange={(e) => setGovtRegPhone(e.target.value)}
                              placeholder={t.govtMobilePlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.departmentLabel}
                            </label>
                            <select
                              value={govtRegDepartment}
                              onChange={(e) => setGovtRegDepartment(e.target.value)}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            >
                              <option value="Border Roads Organisation (BRO)">{t.deptBRO}</option>
                              <option value="State Disaster Management Authority (SDMA)">{t.deptSDMA}</option>
                              <option value="Highway Patrol / Police">{t.deptPolice}</option>
                              <option value="Civil Administration">{t.deptCivil}</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.designationLabel}
                            </label>
                            <input
                              type="text"
                              value={govtRegDesignation}
                              onChange={(e) => setGovtRegDesignation(e.target.value)}
                              placeholder={t.designationPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.nodalCodeLabel}
                            </label>
                            <input
                              type="text"
                              value={govtRegNodalToken}
                              onChange={(e) => setGovtRegNodalToken(e.target.value)}
                              placeholder={t.nodalCodePlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none transition`}
                              required
                            />
                            <p className={`text-[10px] ${textSubtle} mt-0.5`}>
                              {t.nodalCodeNote}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.createPasswordLabel}
                            </label>
                            <input
                              type="password"
                              value={govtRegPassword}
                              onChange={(e) => setGovtRegPassword(e.target.value)}
                              placeholder={t.passwordPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                          <div>
                            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                              {t.confirmPasswordLabel}
                            </label>
                            <input
                              type="password"
                              value={govtRegConfirmPassword}
                              onChange={(e) => setGovtRegConfirmPassword(e.target.value)}
                              placeholder={t.passwordPlaceholder}
                              className={`w-full ${inputBg} border rounded-xl px-3 py-2 text-xs focus:outline-none transition`}
                              required
                            />
                          </div>
                        </div>

                        {/* Action Button: Submit for Administrative Verification */}
                        <button
                          type="submit"
                          className={`w-full ${
                            isDark ? 'bg-white hover:bg-neutral-200 text-black' : 'bg-slate-900 hover:bg-slate-800 text-white'
                          } font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-[0.99] mt-2`}
                        >
                          <Shield strokeWidth={2} className="w-4 h-4 text-emerald-600" />
                          <span>{t.submitAuthorityBtn}</span>
                        </button>

                        {/* Underneath the Authority Register Button (Helper Text) as specified in Image 3 */}
                        <p className={`text-[11px] text-center italic ${textMuted} pt-1`}>
                          &ldquo;{t.authorityRegisterNote}&rdquo;
                        </p>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM BUTTON: emergency helpline no: xxxx (Image 1 skeleton) */}
          <div className="mt-5 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setIsHelplineOpen(true)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-bold transition group ${
                isDark
                  ? 'bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border-[#2b2b2b] hover:border-neutral-500'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <PhoneCall strokeWidth={2.25} className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>{t.emergencyHelplineBtn}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${isDark ? 'bg-black text-neutral-400' : 'bg-slate-100 text-slate-600'}`}>
                {t.sosBadge}
              </span>
            </button>

            <div className={`text-[11px] ${textSubtle} text-center sm:text-right font-mono`}>
              {t.corridorSubtext}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`text-[11px] ${textSubtle} py-2 text-center`}>
        {t.footerText}
      </footer>

      {/* EMERGENCY HELPLINE MODAL */}
      {isHelplineOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-lg ${isDark ? 'bg-black border-[#262626]' : 'bg-white border-slate-300'} border rounded-2xl p-5 shadow-2xl space-y-4`}>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center">
                  <PhoneCall strokeWidth={2.25} className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {t.helplineModalTitle}
                  </h3>
                  <p className={`text-[11px] ${textMuted}`}>
                    {t.helplineModalDesc}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsHelplineOpen(false)}
                className={`p-1.5 rounded-lg border ${isDark ? 'border-[#262626] text-neutral-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-slate-900'}`}
              >
                <X strokeWidth={2} className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs max-h-[60vh] overflow-y-auto pr-1">
              {helplineItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                    isDark ? 'bg-neutral-950 border-[#222222]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <div className={`font-bold ${isDark ? 'text-neutral-100' : 'text-slate-900'}`}>{item.title}</div>
                    <div className={`text-[11px] ${textMuted}`}>{item.desc}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${item.number.replace(/\s+/g, '')}`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center gap-1.5"
                    >
                      <Phone strokeWidth={2} className="w-3 h-3" />
                      <span>{item.number}</span>
                    </a>
                    <button
                      onClick={() => handleCopyNumber(item.number)}
                      title={t.copyNumber}
                      className={`p-1.5 rounded-lg border ${
                        isDark ? 'border-neutral-800 text-neutral-400 hover:text-white' : 'border-slate-300 text-slate-600'
                      }`}
                    >
                      {copiedNumber === item.number ? (
                        <Check strokeWidth={2} className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy strokeWidth={2} className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsHelplineOpen(false)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  isDark ? 'bg-neutral-900 hover:bg-neutral-800 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
              >
                {t.closeDirectoryBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md ${isDark ? 'bg-black border-[#262626]' : 'bg-white border-slate-300'} border rounded-2xl p-5 shadow-2xl space-y-4`}>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <KeyRound strokeWidth={2} className="w-5 h-5 text-emerald-400" />
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t.forgotPasswordTitle}
                </h3>
              </div>
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className={`p-1.5 rounded-lg border ${isDark ? 'border-[#262626] text-neutral-400 hover:text-white' : 'border-slate-200 text-slate-500'}`}
              >
                <X strokeWidth={2} className="w-4 h-4" />
              </button>
            </div>

            <p className={`text-xs ${textMuted} leading-relaxed`}>
              {t.forgotPasswordDesc}
            </p>

            <input
              type="text"
              value={forgotPasswordInput}
              onChange={(e) => setForgotPasswordInput(e.target.value)}
              placeholder={t.recoveryEmailPlaceholder}
              className={`w-full ${inputBg} border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none`}
            />

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                  isDark ? 'border-neutral-800 text-neutral-300 hover:bg-neutral-900' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {t.cancelBtn}
              </button>
              <button
                onClick={() => {
                  alert(t.tokenSentAlert);
                  setIsForgotPasswordOpen(false);
                }}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                {t.sendResetTokenBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
