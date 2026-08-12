import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";

const Contact = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const estTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);
      setCurrentTime(estTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="contact"
      className="bg-black text-white min-h-screen w-full flex flex-col font-sans"
    >
      {/* Header with Contact Title and Social Links */}
      <div className="w-full px-8 pt-8">
        <div className="w-full flex justify-between items-center pb-8 border-b border-gray-800">
          {/* Left side - Contact Title */}
          <div className="flex flex-col">
            <h1 className="text-sm font-mono font-space-grotesk font-bold leading-none tracking-wider">
              <span>{"< CONTACT >"}</span>
            </h1>
          </div>

          {/* Center - Social Links */}
          <div className="hidden md:flex space-x-8 text-sm font-mono">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-300"
            >
              <span>INSTAGRAM</span>
              <FaArrowRight className="transform -rotate-45 text-xs" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-300"
            >
              <span>GITHUB</span>
              <FaArrowRight className="transform -rotate-45 text-xs" />
            </a>
            <a
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-300"
            >
              <span>LINKEDIN</span>
              <FaArrowRight className="transform -rotate-45 text-xs" />
            </a>
          </div>

          {/* Right side - Back to Top */}
          <button
            onClick={scrollToTop}
            className="text-sm font-mono flex items-center space-x-2 hover:text-gray-400 transition-colors duration-300"
          >
            <span>{"< BACK TO TOP >"}</span>
            <FaArrowUp className="text-xs" />
          </button>
        </div>
        
        {/* Mobile Social Links */}
        <div className="md:hidden flex justify-center space-x-6 text-sm font-mono pt-4 pb-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-300"
          >
            <span>INSTAGRAM</span>
            <FaArrowRight className="transform -rotate-45 text-xs" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-300"
          >
            <span>GITHUB</span>
            <FaArrowRight className="transform -rotate-45 text-xs" />
          </a>
          <a
            href="https://linkedin.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-300"
          >
            <span>LINKEDIN</span>
            <FaArrowRight className="transform -rotate-45 text-xs" />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center w-full py-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-16">



          {/* Left Side: AI Agent Chat Panel */}
          <div className="flex items-center justify-center">
            <motion.div
              className="w-full max-w-lg border border-gray-600 rounded-lg bg-gray-900 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3),0_0_100px_rgba(59,130,246,0.1)]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Chat Header */}
                <div className="bg-gray-800 px-4 py-3 border-b border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white font-space-grotesk font-semibold">TAD Agent</span>
                  <span className="text-xs text-gray-400 font-mono">Online</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 h-64 overflow-y-auto">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
                    <p className="text-gray-200 text-sm font-space-grotesk">
                      Hello! I&apos;m here to help with your projects and answer any questions you might have.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
                    <p className="text-gray-200 text-sm font-space-grotesk">
                      Feel free to reach out using the contact information on the right!
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-600 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    disabled
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50" disabled>
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Contact Info */}
          <div className="flex flex-col space-y-8">
            {/* Current Location */}
            <motion.div
              className="flex items-center justify-between border-t border-gray-700 pt-6 px-4 h-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="font-mono text-xs text-gray-500 tracking-widest">LOCATION</p>
              <div className="text-right">
                <p className="text-2xl md:text-3xl lg:text-4xl font-space-grotesk font-light text-white">
                  Washington, DC
                </p>
                <p className="text-xs font-mono text-gray-400">
                 
                </p>
              </div>
            </motion.div>

            {/* <motion.div
              className="flex items-center justify-between border-t border-gray-700 pt-6 px-4 h-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="font-mono text-xs text-gray-500 tracking-widest">SOCIAL</p>

            </motion.div> */}


            <motion.div
              className="flex items-center justify-between border-t border-gray-700 pt-6 px-4 h-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-mono text-xs text-gray-500 tracking-widest">EMAIL</p>
              <a
                href="mailto:petercao49@gmail.com"
                className="text-2xl md:text-3xl lg:text-4xl font-space-grotesk font-light hover:text-gray-300 transition-colors"
              >
                petercao49@gmail.com
              </a>
            </motion.div>

            <motion.div
              className="flex items-center justify-between border-t border-gray-700 pt-6 px-4 h-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-mono text-xs text-gray-500 tracking-widest">PHONE</p>
              <a
                href="tel:5715947597"
                className="text-2xl md:text-3xl lg:text-4xl font-space-grotesk font-light hover:text-gray-300 transition-colors"
              >
               +1 5715947597
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full p-8">
        <div className="border-t border-gray-800 pt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
          <div className="text-center lg:text-left">
            <p className="font-mono text-xs text-gray-500">
              © Design & Build by Peter Cao
            </p>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-mono text-sm text-white">
              {currentTime} EST
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <p className="font-mono text-lg">©2025</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
