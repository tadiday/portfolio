"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, ExternalLink, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { CornerMarks, DashboardLabel, DashboardPanel } from "@/components/ui/DashboardPrimitives";

const WEB3FORMS_ACCESS_KEY = "be249f55-0454-44a6-b6ab-d35527daa8db";

const contactLinks = [
  { label: "Email", value: "petercao49@gmail.com", href: "mailto:petercao49@gmail.com", Icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/petercao03", href: "https://www.linkedin.com/in/petercao03", Icon: Linkedin },
  { label: "GitHub", value: "github.com/tadiday", href: "https://github.com/tadiday", Icon: Github },
] as const;

const availability = [
  { label: "Full-time roles", note: "Open to new opportunities" },
  { label: "Internships", note: "Spring & Summer 2027" },
  { label: "Freelance projects", note: "Open to contributions" },
  { label: "Collaborations", note: "Open to ideas" },
] as const;

const inputClassName = "w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 font-mono text-[13px] text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]";

function ContactIntro() {
  return (
    <div className="relative min-w-0 overflow-hidden px-3 py-5 sm:px-7 sm:py-8">
      <CornerMarks />
      <h2 className="hero-name section-title">CONTACT</h2>
      <p className="mt-5 font-mono text-sm font-bold uppercase tracking-[0.14em] text-[var(--home-accent)]">
        {"// Let's build something great together"}
      </p>
      <p className="mt-5 max-w-[52ch] font-mono text-[13px] font-medium leading-6 text-[#d0d3d6]">
        I&apos;m always open to discussing new opportunities, collaborations, or ideas involving software and technology.
      </p>
    </div>
  );
}

function ContactDirectory() {
  return (
    <DashboardPanel className="p-4 sm:p-5">
      <DashboardLabel className="mb-3 text-[11px] font-bold">Get in touch</DashboardLabel>
      <div>
        {contactLinks.map(({ label, value, href, Icon }) => (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="group grid grid-cols-[36px_70px_minmax(0,1fr)_20px] items-center gap-3 border-t border-white/10 py-2.5 first:border-t-0">
            <span className="grid h-8 w-8 place-items-center border border-[#4b5055] text-[#d9dcdf] group-hover:border-[var(--home-accent)] group-hover:text-[var(--home-accent)]">
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <span className="font-mono text-[10px] font-black uppercase text-white">{label}</span>
            <span className="truncate font-mono text-[10px] text-[#b4b8bd]">{value}</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#858b91] group-hover:text-[var(--home-accent)]" />
          </a>
        ))}
        <div className="grid grid-cols-[36px_70px_minmax(0,1fr)] items-center gap-3 border-t border-white/10 py-2.5">
          <span className="grid h-8 w-8 place-items-center border border-[#4b5055] text-[#d9dcdf]"><MapPin className="h-4 w-4" strokeWidth={1.5} /></span>
          <span className="font-mono text-[10px] font-black uppercase text-white">Location</span>
          <span className="font-mono text-[10px] leading-4 text-[#b4b8bd]">Washington, DC<br />United States</span>
        </div>
      </div>
    </DashboardPanel>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json() as { success: boolean; message?: string };
      if (!data.success) throw new Error(data.message || "Unable to send message.");
      form.reset();
      setStatus("Message received. I'll be in touch soon.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <DashboardPanel className="h-full p-5 sm:p-7">
      <DashboardLabel className="mb-7 text-[11px] font-bold">Send a message</DashboardLabel>
      <form onSubmit={submitForm} className="grid gap-5">
        <label className="grid gap-2 font-mono text-[10px] font-black uppercase text-[#d8dade]">
          Name
          <input name="name" required autoComplete="name" placeholder="Your name" className={inputClassName} />
        </label>
        <label className="grid gap-2 font-mono text-[10px] font-black uppercase text-[#d8dade]">
          Email
          <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={inputClassName} />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 font-mono text-[10px] font-black uppercase text-[#d8dade]">
            Subject
            <select name="subject" required defaultValue="" className={inputClassName}>
              <option value="" disabled>Select a subject</option>
              <option>Job opportunity</option>
              <option>Collaboration</option>
              <option>Project feedback</option>
              <option>General inquiry</option>
            </select>
          </label>
          <label className="grid gap-2 font-mono text-[10px] font-black uppercase text-[#d8dade]">
            Location (optional)
            <input name="location" placeholder="Your location" className={inputClassName} />
          </label>
        </div>
        <label className="grid gap-2 font-mono text-[10px] font-black uppercase text-[#d8dade]">
          Message
          <textarea name="message" required rows={5} placeholder="Write your message here..." className={`${inputClassName} resize-y`} />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={sending} className="inline-flex min-w-[175px] items-center justify-between gap-6 border border-white bg-white px-4 py-3 font-mono text-[11px] font-black uppercase text-[#08090a] transition-colors hover:border-[var(--home-accent)] hover:bg-[var(--home-accent)] disabled:cursor-wait disabled:opacity-60">
            {sending ? "Transmitting..." : "Send message"}<ArrowRight className="h-4 w-4" />
          </button>
          <p aria-live="polite" className="font-mono text-[12px] text-[var(--home-accent)]">{status}</p>
        </div>
      </form>
    </DashboardPanel>
  );
}

function AvailabilityPanel() {
  return (
    <DashboardPanel className="mt-3 p-5">
      <DashboardLabel className="mb-5 text-[11px] font-bold">Currently available for</DashboardLabel>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))_180px]">
        {availability.map((item) => (
          <div key={item.label} className="grid grid-cols-[8px_1fr] gap-3 border-white/10 xl:border-r xl:pr-4">
            <span className="mt-1 h-2 w-2 bg-[#35d07f] shadow-[0_0_8px_rgba(53,208,127,.45)]" />
            <div>
              <p className="font-mono text-[10px] font-black uppercase text-white">{item.label}</p>
              <p className="mt-2 font-mono text-[10px] text-[#9da2a7]">{item.note}</p>
            </div>
          </div>
        ))}
        <div className="pl-1 font-mono text-[10px] uppercase xl:pl-4">
          <p className="font-black text-[var(--home-accent)]">Response time</p>
          <p className="mt-2 text-white">Usually within 24–48 hours</p>
        </div>
      </div>
    </DashboardPanel>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative z-30 overflow-hidden bg-[var(--background)] px-4 pb-8 pt-[calc(var(--home-header-height)+32px)] text-[var(--text)] sm:px-6 lg:px-8">
      <motion.div className="mx-auto w-full max-w-[1440px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.06 }} transition={{ duration: 0.55 }}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <div className="grid min-w-0 content-start gap-3"><ContactIntro /><ContactDirectory /></div>
          <ContactForm />
        </div>
        <AvailabilityPanel />
        <div className="mt-3 flex items-center justify-between border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
          <p>Design &amp; build by Peter Cao / 2026</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-3 text-white hover:text-[var(--home-accent)]">Back to top <ArrowUp className="h-3.5 w-3.5" /></button>
        </div>
      </motion.div>
    </section>
  );
}
