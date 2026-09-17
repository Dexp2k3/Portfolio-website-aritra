import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { contactData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';

export function Contact({ onShowToast }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contactData.email);
    setCopiedEmail(true);
    if (onShowToast) {
      onShowToast('Email copied', 'success');
    }
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contactData.phone);
    setCopiedPhone(true);
    if (onShowToast) {
      onShowToast('Phone copied', 'success');
    }
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-28 border-t border-zinc-200 dark:border-zinc-900 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN — TITLE & INTRO */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-4 select-none">
                <span className="text-zinc-400 dark:text-zinc-600 font-semibold">{contactData.sectionNumber}</span>
                <span>/</span>
                <span>{contactData.sectionTitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white mb-4 flex items-center gap-2">
                <span>Start a Conversation</span>
                <Sparkles className="w-5 h-5 text-blue-500 hidden sm:inline" />
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed max-w-md">
                {contactData.description}
              </p>
            </div>

            {/* Handwritten Script Accent with interactive glow */}
            <div className="mt-12 pt-8 font-handwriting text-3xl sm:text-4xl text-zinc-700 dark:text-zinc-300 select-none leading-snug group cursor-default">
              <div className="transition-transform group-hover:translate-x-1 duration-200">Let's</div>
              <div className="transition-transform group-hover:translate-x-2 duration-300">Create</div>
              <div className="transition-transform group-hover:translate-x-3 duration-400">Something</div>
              <div className="text-blue-600 dark:text-blue-400 font-bold transition-transform group-hover:translate-x-4 duration-500">
                Great —
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — DIRECT CONTACT SPOTLIGHT CARDS */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Direct Email Card */}
            <a
              href={`mailto:${contactData.email}`}
              className="block group rounded-2xl overflow-hidden outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 select-none touch-manipulation cursor-pointer"
            >
              <Card
                spotlight={true}
                tilt={true}
                className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                        {contactData.emailActionText || 'Email Me'}
                      </span>
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                        Active Inbox
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mt-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all">
                      {contactData.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className={`p-3 rounded-xl border transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center outline-none focus:outline-none select-none touch-manipulation ${
                      copiedEmail
                        ? 'bg-emerald-50 dark:bg-emerald-500/20 border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 scale-105'
                        : 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700/60 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white active:scale-90 hover:scale-105 shadow-xs'
                    }`}
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 animate-bounce" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </a>

            {/* Direct Phone / WhatsApp Card */}
            <a
              href={contactData.whatsappUrl || "https://wa.me/918250256798"}
              target="_blank"
              rel="noopener noreferrer"
              className="block group rounded-2xl overflow-hidden outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 select-none touch-manipulation cursor-pointer"
            >
              <Card
                spotlight={true}
                tilt={true}
                className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                        {contactData.phoneActionText || 'Call / WhatsApp'}
                      </span>
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                        Available
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mt-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {contactData.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    aria-label="Copy phone number"
                    className={`p-3 rounded-xl border transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                      copiedPhone
                        ? 'bg-emerald-50 dark:bg-emerald-500/20 border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 scale-105'
                        : 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700/60 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white active:scale-90 hover:scale-105 shadow-xs'
                    }`}
                    title="Copy phone number to clipboard"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 animate-bounce" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
