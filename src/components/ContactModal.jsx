import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <CheckCircle2 size={56} className="text-[#0048DE] mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
              Thank you for reaching out! <strong className="text-[#0048DE]">Pratham</strong> will get back to you within 24 hours. You can also email directly at <strong className="text-slate-900">prathameshsurvase31@gmail.com</strong>.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center font-bold text-xl text-slate-900 tracking-tight mb-1">
                <span>PRATHAM <span className="font-pixel text-[#0048DE] font-normal tracking-normal text-[1.1em]">SURVASE</span></span>
                <span className="ml-2.5 text-xs uppercase px-2 py-0.5 rounded bg-blue-50 text-[#0048DE] font-semibold border border-blue-200/50">
                  Let's Connect
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                Have a project in mind, need a UI/UX revamp, or looking for a design partner? Drop a message!
              </p>

              {/* Direct Reach Pill */}
              <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                <span>📧 <strong className="text-slate-800">prathameshsurvase31@gmail.com</strong></span>
                <span>📞 <strong className="text-slate-800">+91 9405374711</strong></span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#0048DE] focus:ring-2 focus:ring-[#0048DE]/20 outline-none text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#0048DE] focus:ring-2 focus:ring-[#0048DE]/20 outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Company or Project Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#0048DE] focus:ring-2 focus:ring-[#0048DE]/20 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Details or Inquiry
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about the website, mobile app, design system, or vibe coding project you're building..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#0048DE] focus:ring-2 focus:ring-[#0048DE]/20 outline-none text-sm transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0048DE] hover:bg-[#003dc4] text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send size={15} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
