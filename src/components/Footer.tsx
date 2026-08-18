import { useState, useEffect } from "react";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  const [localTime, setLocalTime] = useState<string | null>(null); // Time state
  useEffect(() => {
    const updateTime = () => setLocalTime(new Date().toLocaleTimeString());
    updateTime(); // Set initial value after mount
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <footer className="pb-25 sm:pb-0 grid gap-x-4 gap-y-5 sm:gap-y-20 grid-cols-2 sm:grid-cols-[repeat(20,minmax(0,1fr))] md:grid md:grid-cols-14 footer-text pt-16 text-[14px] sm:text-[16px]">
      <div className="w-full col-start-1 col-span-2 sm:col-span-6 font-mono">
        <h3 className="font-bold mb-2">Information</h3>
        <div className="h-[1px] w-full color-line mt-2 mb-2"></div>
        <ul className="space-y-1">
          <li className="">{localTime} Fairfax, VA</li>

          <li className="flex items-center font-bold">
            <FaRegCopyright className="" /> &nbsp;Design & Build by Peter Cao
          </li>
          <li className="">
            Built with Next.js and Tailwind CSS, deployed with Vercel.
          </li>
        </ul>
      </div>

      {/* Socials Section */}
      <div className="w-full col-start-1 col-span-1 sm:col-start-7 sm:col-span-4 font-mono">
        <h3 className="font-bold mb-2">Socials</h3>
        <div className="h-[1px] w-full color-line mt-2 mb-2"></div>
        <ul className="space-y-1">
          <li>
            <a
              href="https://www.linkedin.com/in/petercao03"
              target="_blank"
              className="block"
              style={{ pointerEvents: "none" }} // Disables interaction on empty space
            >
              <span
                className="hover:text-[var(--footer-text-hover)] hover:scale-105 hover:translate-x-1 transition-transform duration-300 inline-block"
                style={{ pointerEvents: "auto" }} // Enables interaction on the text
              >
                Linkedin
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/fat_cao"
              target="_blank"
              className="block"
              style={{ pointerEvents: "none" }}
            >
              <span
                className="hover:text-[var(--footer-text-hover)] hover:scale-105 hover:translate-x-1 transition-transform duration-300 inline-block"
                style={{ pointerEvents: "auto" }}
              >
                Instagram
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/tadiday"
              target="_blank"
              className="block"
              style={{ pointerEvents: "none" }}
            >
              <span
                className="hover:text-[var(--footer-text-hover)] hover:scale-105 hover:translate-x-1 transition-transform duration-300 inline-block"
                style={{ pointerEvents: "auto" }}
              >
                GitHub
              </span>
            </a>
          </li>
        </ul>
      </div>

      {/* Resources Section */}
      <div className="w-full col-start-2 col-span-1 sm:col-start-11 sm:col-span-4 font-mono">
        <h3 className="font-bold mb-2">Resources</h3>
        <div className="h-[1px] w-full color-line mt-2 mb-2"></div>
        <ul className="space-y-1">
          <li>
            <a
              href="/assets/documents/resume.pdf"
              target="_blank"
              className="hover:text-[var(--footer-text-hover)] flex items-center gap-2 transition-transform duration-300 hover:scale-105 hover:translate-x-1 origin-left"
            >
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
