import { useEffect, useState, type ReactNode } from "react";
import { FaRegCopyright } from "react-icons/fa";

const socialLinks = [
  { label: "Linkedin", href: "https://www.linkedin.com/in/petercao03" },
  { label: "Instagram", href: "https://www.instagram.com/fat_cao" },
  { label: "GitHub", href: "https://github.com/tadiday" },
] as const;

const socialLinkClassName =
  "inline-block transition-transform duration-300 hover:translate-x-1 hover:scale-105 hover:text-[var(--footer-text-hover)]";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <>
      <h3 className="mb-2 font-bold">{children}</h3>
      <div className="color-line mb-2 mt-2 h-px w-full" />
    </>
  );
}

function useLocalTime() {
  const [localTime, setLocalTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => setLocalTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return localTime;
}

export default function Footer() {
  const localTime = useLocalTime();

  return (
    <footer className="footer-text grid grid-cols-2 gap-x-4 gap-y-5 pb-25 pt-16 text-[14px] sm:grid-cols-[repeat(20,minmax(0,1fr))] sm:gap-y-20 sm:pb-0 sm:text-[16px] md:grid md:grid-cols-14">
      <div className="col-span-2 col-start-1 w-full font-mono sm:col-span-6">
        <FooterHeading>Information</FooterHeading>
        <ul className="space-y-1">
          <li>{localTime} Fairfax, VA</li>
          <li className="flex items-center font-bold"><FaRegCopyright /> &nbsp;2025 Peter Cao. All rights reserved.</li>
          <li>Built with Next.js and Tailwind CSS, deployed with Vercel.</li>
        </ul>
      </div>

      <div className="col-span-1 col-start-1 w-full font-mono sm:col-span-4 sm:col-start-7">
        <FooterHeading>Socials</FooterHeading>
        <ul className="space-y-1">
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className="block pointer-events-none">
                <span className={`${socialLinkClassName} pointer-events-auto`}>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-1 col-start-2 w-full font-mono sm:col-span-4 sm:col-start-11">
        <FooterHeading>Resources</FooterHeading>
        <ul className="space-y-1">
          <li>
            <a href="/assets/documents/resume.pdf" target="_blank" rel="noreferrer" className="flex origin-left items-center gap-2 transition-transform duration-300 hover:translate-x-1 hover:scale-105 hover:text-[var(--footer-text-hover)]">
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
