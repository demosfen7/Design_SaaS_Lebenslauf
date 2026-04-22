/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Plus, 
  Briefcase, 
  GraduationCap, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Search,
  Settings,
  MoreVertical,
  Download,
  Trash2,
  Mail,
  Phone,
  Home,
  MessageSquare
} from 'lucide-react';

// --- Types ---

interface Profile {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface ResumeData {
  profile: Profile;
  experience: Experience[];
  education: Education[];
}

type Step = 'personal' | 'experience' | 'education' | 'review';

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; 
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles = 'px-4 py-2 font-medium rounded-default flex items-center justify-center gap-2 transition-all active:scale-95 text-sm';
  const variants = {
    primary: 'bg-primary-container text-white hover:bg-opacity-90',
    secondary: 'border border-primary-container text-primary-container hover:bg-primary-container/10',
    ghost: 'text-gray-600 hover:bg-gray-100',
    danger: 'text-red-600 hover:bg-red-50'
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string; key?: React.Key }) => (
  <div id={id} className={`corporate-card p-6 ${className}`}>
    {children}
  </div>
);

const Input = ({ label, id, ...props }: { label: string; id: string; [key: string]: any }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="label-caps">{label}</label>
    <input id={id} className="corporate-input" {...props} />
  </div>
);

const Textarea = ({ label, id, ...props }: { label: string; id: string; [key: string]: any }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="label-caps">{label}</label>
    <textarea id={id} className="corporate-input min-h-[100px] py-3" {...props} />
  </div>
);

// --- Sub-Views ---

const StepIndicator = ({ currentStep }: { currentStep: Step }) => {
  const steps: { key: Step; label: string }[] = [
    { key: 'personal', label: 'Persönliche Infos' },
    { key: 'experience', label: 'Berufserfahrung' },
    { key: 'education', label: 'Ausbildung' },
    { key: 'review', label: 'Vorschau' }
  ];

  const currentIdx = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="flex items-center justify-between w-full mb-8 border-b border-border-standard pb-4 px-4 overflow-x-auto no-scrollbar gap-6">
      {steps.map((step, idx) => (
        <div key={step.key} className="flex items-center gap-3">
          <div className="flex items-center gap-2 min-w-max">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              idx === currentIdx 
                ? 'bg-primary-container text-white' 
                : idx < currentIdx 
                  ? 'border border-primary-container text-primary-container opacity-80' 
                  : 'border border-outline text-outline opacity-60'
            }`}>
              {idx + 1}
            </div>
            <span className={`text-sm font-semibold transition-opacity ${
              idx === currentIdx ? 'text-primary-container opacity-100' : 'text-on-surface opacity-60'
            }`}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className="h-[1px] w-8 bg-border-standard"></div>
          )}
        </div>
      ))}
    </div>
  );
};

const CVPreview = ({ data }: { data: ResumeData }) => {
  return (
    <div className="sticky top-24 pt-4">
      <div className="a4-preview shadow-geometric transition-all duration-300 scale-95 md:scale-100 origin-top p-8 text-black bg-white">
        {/* Miniature CV Header - Geometric Theme Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-primary-container"></div>
        
        <header className="pb-4 mb-6 mt-2">
          <h1 className="text-2xl font-bold text-primary-container uppercase tracking-tight">
            {data.profile.firstName || 'Vorname'} {data.profile.lastName || 'Nachname'}
          </h1>
          <p className="text-md text-gray-600 font-medium">{data.profile.title || 'Angestrebte Position'}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-500 uppercase tracking-tight">
            {data.profile.location && <span className="flex items-center gap-1"><Home size={10} /> {data.profile.location}</span>}
            {data.profile.email && <span className="flex items-center gap-1"><Mail size={10} /> {data.profile.email}</span>}
            {data.profile.phone && <span className="flex items-center gap-1"><Phone size={10} /> {data.profile.phone}</span>}
          </div>
        </header>

        {data.profile.summary && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary-container mb-2 border-b border-gray-100 pb-1">Über mich</h2>
            <p className="text-[11px] leading-relaxed text-gray-700">{data.profile.summary}</p>
          </section>
        )}

        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary-container mb-3 border-b border-gray-100 pb-1">Berufserfahrung</h2>
          <div className="space-y-4">
            {data.experience.length === 0 ? (
              <div className="h-4 bg-gray-50 rounded w-full mb-2 animate-pulse"></div>
            ) : (
              data.experience.map(exp => (
                <div key={exp.id} className="relative pl-3 border-l border-primary-container/20">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[12px] font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-[9px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-primary-container/80 mb-1">{exp.company}</p>
                  <p className="text-[10px] text-gray-600 leading-snug whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary-container mb-3 border-b border-gray-100 pb-1">Ausbildung</h2>
          <div className="space-y-3">
            {data.education.length === 0 ? (
              <div className="h-4 bg-gray-50 rounded w-2/3 animate-pulse"></div>
            ) : (
              data.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[12px] font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-[9px] font-medium text-gray-500">{edu.year}</span>
                  </div>
                  <p className="text-[11px] text-primary-container/80">{edu.institution}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <div className="absolute inset-0 pointer-events-none border border-black/5"></div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [view, setView] = useState<'dashboard' | 'wizard'>('dashboard');
  const [step, setStep] = useState<Step>('personal');
  const [resumeData, setResumeData] = useState<ResumeData>({
    profile: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: []
  });

  const nextStep = () => {
    if (step === 'personal') setStep('experience');
    else if (step === 'experience') setStep('education');
    else if (step === 'education') setStep('review');
  };

  const prevStep = () => {
    if (step === 'experience') setStep('personal');
    else if (step === 'education') setStep('experience');
    else if (step === 'review') setStep('education');
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResumeData({ ...resumeData, experience: [...resumeData.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    const updated = resumeData.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp);
    setResumeData({ ...resumeData, experience: updated });
  };

  const removeExperience = (id: string) => {
    setResumeData({ ...resumeData, experience: resumeData.experience.filter(e => e.id !== id) });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      year: ''
    };
    setResumeData({ ...resumeData, education: [...resumeData.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = resumeData.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
    setResumeData({ ...resumeData, education: updated });
  };

  const removeEducation = (id: string) => {
    setResumeData({ ...resumeData, education: resumeData.education.filter(e => e.id !== id) });
  };

  return (
    <div className="min-h-screen bg-background-canvas flex flex-col">
      {/* Top Navigation */}
      <nav className="h-16 bg-primary-container text-white px-8 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-primary-container font-bold text-primary-container text-[10px] flex items-center justify-center">CE</div>
          </div>
          <span className="font-bold tracking-tight text-lg uppercase">German Career Excellence</span>
        </div>
        <div className="flex items-center gap-4">
          {view === 'wizard' ? (
            <Button variant="secondary" className="border-white/40 text-white hover:bg-white/10" onClick={() => setView('dashboard')}>
              Speichern & Schließen
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-white hover:bg-white/10"><Search size={18} /></Button>
              <Button variant="ghost" className="text-white hover:bg-white/10"><Settings size={18} /></Button>
              <div className="w-8 h-8 bg-on-primary-container rounded-full border border-white/20 flex items-center justify-center text-xs font-bold">KE</div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 max-w-[1440px] mx-auto w-full p-8">
        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Dashboard Welcome */}
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold text-primary">Willkommen, Kim</h1>
                  <p className="text-gray-500 mt-1">Hier ist der Überblick über deine berufliche Excellence.</p>
                </div>
                <Button onClick={() => setView('wizard')}>
                  <Plus size={18} /> Neuen Lebenslauf erstellen
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Bewerbungen", val: "12", icon: Briefcase, color: "text-blue-600" },
                  { label: "Einladungen", val: "3", icon: Calendar, color: "text-emerald-600" },
                  { label: "Optimierung", val: "84%", icon: TrendingUp, color: "text-orange-600" },
                  { label: "Profilstärke", val: "A+", icon: CheckCircle2, color: "text-purple-600" },
                ].map((stat, i) => (
                  <Card key={i} className="flex items-center gap-4 hover:border-primary-container/20 hover:shadow-sm">
                    <div className={`p-3 rounded-md bg-gray-50 ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="label-caps opacity-60">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.val}</p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Lists Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Documents */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                      <FileText size={20} className="text-primary-container" />
                      Aktuelle Dokumente
                    </h2>
                    <Button variant="ghost" className="text-xs">Alle anzeigen</Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Lebenslauf_2024_SoftwareDev.pdf", edited: "Vor 2 Stunden", status: "Referenz" },
                      { name: "Anschreiben_Google_DE.pdf", edited: "Gestern", status: "In Arbeit" },
                      { name: "Lebenslauf_Senior_Product_Manager.pdf", edited: "Vor 4 Tagen", status: "Abgeschlossen" },
                    ].map((doc, i) => (
                      <Card key={i} className="py-4 px-6 flex items-center justify-between group hover:border-primary-container/30">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-12 bg-surface-container rounded flex items-center justify-center text-primary-container">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-primary">{doc.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Clock size={12} /> {doc.edited}
                              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                              <span className={`font-medium ${doc.status === 'In Arbeit' ? 'text-orange-600' : 'text-blue-600'}`}>
                                {doc.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" className="p-2"><Download size={16} /></Button>
                          <Button variant="ghost" className="p-2 text-red-500"><Trash2 size={16} /></Button>
                          <Button variant="ghost" className="p-2 text-gray-400"><MoreVertical size={16} /></Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Sidebar: Next steps */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-primary px-2">Nächste Schritte</h2>
                  <div className="space-y-3">
                    <Card className="bg-primary-container text-white border-none p-6">
                      <div className="flex justify-between items-start mb-4">
                        <MessageSquare className="text-on-primary-container" />
                        <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold uppercase tracking-wider">Tipp</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 leading-snug">Lebenslauf-Check durch KI</h3>
                      <p className="text-sm text-on-primary-container mb-6 opacity-90 leading-relaxed">Lass deinen Lebenslauf auf deutsche DIN-Normen und ATS-Kompatibilität prüfen.</p>
                      <Button className="w-full bg-white text-primary-container hover:bg-white/90">Analyse starten</Button>
                    </Card>
                    <Card className="p-6">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-600" /> Profil vervollständigen
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-primary-container flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-primary-container rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Profilbild hochladen</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200"></div>
                          <span className="text-sm text-gray-500 line-through">Berufserfahrung hinzufügen</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col lg:flex-row gap-6"
            >
              {/* Form Content (2/3) */}
              <div className="flex-[1.8] bg-white rounded-default border border-border-standard shadow-sm flex flex-col p-8 mb-20 lg:mb-0">
                <StepIndicator currentStep={step} />
                
                <AnimatePresence mode="wait">
                  {step === 'personal' && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <Input 
                          label="Vorname" 
                          id="firstName" 
                          value={resumeData.profile.firstName} 
                          onChange={(e: any) => setResumeData({...resumeData, profile: {...resumeData.profile, firstName: e.target.value}})}
                        />
                        <Input 
                          label="Nachname" 
                          id="lastName" 
                          value={resumeData.profile.lastName} 
                          onChange={(e: any) => setResumeData({...resumeData, profile: {...resumeData.profile, lastName: e.target.value}})}
                        />
                      </div>
                      <Input 
                        label="Berufliche Bezeichnung" 
                        id="title" 
                        placeholder="z.B. Software Ingenieur" 
                        value={resumeData.profile.title} 
                        onChange={(e: any) => setResumeData({...resumeData, profile: {...resumeData.profile, title: e.target.value}})}
                      />
                      <div className="grid grid-cols-2 gap-6">
                        <Input label="E-Mail" id="email" type="email" value={resumeData.profile.email} onChange={(e: any) => setResumeData({...resumeData, profile: {...resumeData.profile, email: e.target.value}})} />
                        <Input label="Telefon" id="phone" value={resumeData.profile.phone} onChange={(e: any) => setResumeData({...resumeData, profile: {...resumeData.profile, phone: e.target.value}})} />
                      </div>
                      <Input label="Standort" id="location" placeholder="Stadt, Land" value={resumeData.profile.location} onChange={(e: any) => setResumeData({...resumeData, profile: {...resumeData.profile, location: e.target.value}})} />
                      <Textarea label="Zusammenfassung" id="summary" placeholder="Stelle dich kurz vor..." value={resumeData.profile.summary} onChange={(e: any) => setResumeData({...resumeData, profile: {...resumeData.profile, summary: e.target.value}})} />
                    </motion.div>
                  )}

                  {step === 'experience' && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-8"
                    >
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-primary">Berufliche Stationen</h2>
                        <Button variant="secondary" onClick={addExperience}>
                           <Plus size={16} /> Stelle hinzufügen
                        </Button>
                      </div>
                      
                      <div className="space-y-6">
                        {resumeData.experience.map((exp) => (
                          <Card key={exp.id} className="relative group">
                            <button 
                              onClick={() => removeExperience(exp.id)}
                              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <Input label="Unternehmen" id={`co-${exp.id}`} value={exp.company} onChange={(e: any) => updateExperience(exp.id, 'company', e.target.value)} />
                              <Input label="Position" id={`pos-${exp.id}`} value={exp.position} onChange={(e: any) => updateExperience(exp.id, 'position', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <Input label="Von" id={`start-${exp.id}`} placeholder="MM/JJJJ" value={exp.startDate} onChange={(e: any) => updateExperience(exp.id, 'startDate', e.target.value)} />
                              <Input label="Bis" id={`end-${exp.id}`} placeholder="Heute" value={exp.endDate} onChange={(e: any) => updateExperience(exp.id, 'endDate', e.target.value)} />
                            </div>
                            <Textarea label="Beschreibung" id={`desc-${exp.id}`} value={exp.description} onChange={(e: any) => updateExperience(exp.id, 'description', e.target.value)} />
                          </Card>
                        ))}
                        {resumeData.experience.length === 0 && (
                          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-default opacity-50">
                            <Briefcase className="mx-auto mb-2 text-gray-400" size={32} />
                            <p className="text-gray-500">Noch keine Berufserfahrung hinzugefügt.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === 'education' && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-8"
                    >
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-primary">Ausbildung</h2>
                        <Button variant="secondary" onClick={addEducation}>
                           <Plus size={16} /> Abschluss hinzufügen
                        </Button>
                      </div>
                      <div className="space-y-6">
                        {resumeData.education.map((edu) => (
                          <Card key={edu.id} className="relative group">
                            <button 
                              onClick={() => removeEducation(edu.id)}
                              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={18} />
                            </button>
                            <Input label="Institution" id={`inst-${edu.id}`} value={edu.institution} onChange={(e: any) => updateEducation(edu.id, 'institution', e.target.value)} />
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <Input label="Abschluss" id={`deg-${edu.id}`} value={edu.degree} onChange={(e: any) => updateEducation(edu.id, 'degree', e.target.value)} />
                              <Input label="Jahr" id={`year-${edu.id}`} placeholder="z.B. 2020" value={edu.year} onChange={(e: any) => updateEducation(edu.id, 'year', e.target.value)} />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 'review' && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-12"
                    >
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm border border-emerald-100">
                          <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-primary">Dein Lebenslauf ist bereit!</h2>
                        <p className="text-gray-500 max-w-md mx-auto">Alle Angaben wurden nach deutschen Karrierestandards formatiert. Du kannst ihn jetzt herunterladen oder verfeinern.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border border-border-standard rounded-default bg-white space-y-4 flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary-container mb-2">
                             <Download size={24} />
                          </div>
                          <h3 className="font-bold">PDF Export</h3>
                          <p className="text-xs text-gray-500">Professionelles A4 Layout, optimiert für E-Mail Bewerbungen.</p>
                          <Button variant="primary" className="w-full mt-2">Jetzt herunterladen</Button>
                        </div>
                        <div className="p-6 border border-border-standard rounded-default bg-white space-y-4 flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
                             <ArrowRight size={24} />
                          </div>
                          <h3 className="font-bold">Direkt Bewerben</h3>
                          <p className="text-xs text-gray-500">Dokument direkt an Portale von SAP, Siemens oder BMW senden.</p>
                          <Button variant="secondary" className="w-full mt-2">Firmen auswählen</Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Wizard Footer Controls */}
                <div className="mt-auto flex items-center justify-between border-t border-border-standard pt-6 pb-6 px-6 -mx-8 -mb-8 bg-surface rounded-b-default">
                  <Button variant="ghost" className="font-bold uppercase tracking-wider" onClick={prevStep} disabled={step === 'personal'}>
                    Zurück
                  </Button>
                  <div className="flex gap-4">
                    <Button variant="secondary" className="hidden md:flex font-bold uppercase tracking-wider border-primary-container">
                      Entwurf speichern
                    </Button>
                    <Button className="px-8 font-bold uppercase tracking-wider" onClick={step === 'review' ? () => setView('dashboard') : nextStep}>
                      {step === 'review' ? 'Fertigstellen' : 'Weiter'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Preview Sidebar (1/3) */}
              <aside className="flex-1 flex flex-col gap-4">
                <div className="text-[12px] font-bold uppercase tracking-widest text-[#74777f] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div> LIVE VORSCHAU
                </div>
                <CVPreview data={resumeData} />
                
                {/* Scale Indicator */}
                <div className="text-[10px] text-[#9b9fa1] font-mono text-right mt-2">
                  DIN A4 | 75% ZOOM
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistence Footer */}
      {view === 'wizard' && (
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
           <Button className="shadow-lg rounded-full w-14 h-14 p-0">
             <Save size={24} />
           </Button>
        </div>
      )}
    </div>
  );
}
