import React, { useState, useEffect } from 'react';
import { HeartHandshake, Mail, Phone, MessageSquare, Send, CheckCircle, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { VolunteerSubmission, TranslationSet } from '../types';

interface VolunteerFormProps {
  t: TranslationSet;
}

export default function VolunteerForm({ t }: VolunteerFormProps) {
  const [submissions, setSubmissions] = useState<VolunteerSubmission[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Initial seeding of recent volunteers to populate list elegantly
  const initialVolunteers: VolunteerSubmission[] = [
    {
      id: 'seed-1',
      name: 'Mariana Silva Santos',
      email: 'mariana.silva@outlook.com',
      phone: '(11) 98765-4321',
      role: 'Ação em Campo',
      message: 'Olá! Sou psicopedagoga infantil e adoraria auxiliar recreativamente nas ações presenciais.',
      date: '06/06/2026'
    },
    {
      id: 'seed-2',
      name: 'Carlos Schmidt Kaufmann',
      email: 'carlos.schm@gmail.com',
      phone: '+49 176 123456',
      role: 'Logística',
      message: 'Volunteer from Germany. Ready to help sort donor logistics during the European shipments.',
      date: '05/06/2026'
    }
  ];

  useEffect(() => {
    const rawData = localStorage.getItem('facavocetambem_volunteers');
    if (rawData) {
      try {
        setSubmissions(JSON.parse(rawData));
      } catch (e) {
        setSubmissions(initialVolunteers);
      }
    } else {
      setSubmissions(initialVolunteers);
      localStorage.setItem('facavocetambem_volunteers', JSON.stringify(initialVolunteers));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !role) return;

    const newSub: VolunteerSubmission = {
      id: `vol-${Date.now()}`,
      name,
      email,
      phone,
      role,
      message,
      date: new Date().toLocaleDateString()
    };

    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('facavocetambem_volunteers', JSON.stringify(updated));

    // Clear state
    setName('');
    setEmail('');
    setPhone('');
    setRole('');
    setMessage('');
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <section id="volunteer" className="bg-amber-50/40 py-24 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100 rounded-full px-4 py-1.5 shadow-sm">
            Engajamento e Missão
          </span>
          <h2 className="mt-4 font-sans text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {t.volunteerTitle}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-sans leading-relaxed">
            {t.volunteerSubtitle}
          </p>
        </div>

        {/* Dual Column Layout: Form vs Records persistence */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          
          {/* Enrollment Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-orange-100 p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <h3 className="font-sans text-lg font-bold text-gray-900 flex items-center gap-2 mb-6 border-b border-orange-50 pb-4">
              <HeartHandshake className="h-5 w-5 text-amber-500" />
              Preencha sua Ficha Solidária
            </h3>

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 flex gap-3 text-emerald-900 text-sm font-sans"
              >
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Inscrição Efetuada!</h4>
                  <p className="text-xs text-emerald-700 font-sans mt-0.5">{t.volunteerSuccess}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">{t.volunteerName}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="mt-1.5 block w-full rounded-xl border border-orange-200 bg-amber-50/10 px-4 py-3 text-xs focus:ring-1 focus:ring-amber-500 font-sans"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">{t.volunteerEmail}</label>
                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      className="block w-full rounded-xl border border-orange-200 bg-amber-50/10 py-3 pl-10 pr-4 text-xs focus:ring-1 focus:ring-amber-500 font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">{t.volunteerPhone}</label>
                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: (11) 99999-9999"
                      className="block w-full rounded-xl border border-orange-200 bg-amber-50/10 py-3 pl-10 pr-4 text-xs focus:ring-1 focus:ring-amber-500 font-sans"
                    />
                  </div>
                </div>

                {/* Role select */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">{t.volunteerRole}</label>
                  <select
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-orange-200 bg-white px-3 py-3 text-xs focus:ring-1 focus:ring-amber-500 font-sans"
                  >
                    <option value="">{t.volunteerRoleSelect}</option>
                    <option value="Ação em Campo">{t.volunteerRoleField}</option>
                    <option value="Logística & Triagem">{t.volunteerRoleDonation}</option>
                    <option value="Marketing & Comunicação">{t.volunteerRolePromotion}</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">{t.volunteerMessage}</label>
                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute top-3 left-3">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                  </div>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Conta pra gente! Tem veículo próprio? Algum talento artístico (música, pintura etc)?"
                    className="block w-full rounded-xl border border-orange-200 bg-amber-50/10 py-3 pl-10 pr-4 text-xs focus:ring-1 focus:ring-amber-500 font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-white font-bold py-3 text-sm shadow-md transition-all duration-300"
              >
                <Send className="h-4 w-4" />
                <span>{t.volunteerSubmit}</span>
              </button>

            </form>
          </div>

          {/* Recently registered local display panel */}
          <div className="lg:col-span-5 bg-amber-50/70 rounded-3xl border border-orange-100 p-6 shadow-inner space-y-4">
            <h3 className="font-sans text-xs font-bold text-amber-900 uppercase tracking-widest flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-600" />
              {t.volunteerRecentTitle}
            </h3>

            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1" id="volunteer-registry-list">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm space-y-2 hover:border-amber-200 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-black text-gray-900">{sub.name}</h4>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase bg-amber-100 text-amber-800 rounded-full px-2.5 py-0.5">
                        {sub.role}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-gray-400">{sub.date}</span>
                  </div>
                  {sub.message && (
                    <p className="text-xs italic text-gray-500 leading-normal border-l-2 border-orange-100 pl-2">
                      "{sub.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
