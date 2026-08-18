import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const WEB3FORMS_ACCESS_KEY = "be249f55-0454-44a6-b6ab-d35527daa8db";
const formControlClassName = "p-2 sm:p-4 w-full rounded-lg contact-border focus:outline-none focus:contact-border-focus focus:ring-2 focus:ring-[#967A54] focus:ring-offset-0 text-lg";

type Web3FormsResponse = {
  success: boolean;
  message: string;
};

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json() as Web3FormsResponse;

    if (data.success) {
      setResult("I WILL GET IN TOUCH SOON!");
      form.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[var(--contact-bg)] max-w-screen to-[var(--contact-bg-2)] min-h-screen z-20 pb-[5%]"
    >
      <div className="relative z-20 w-full overflow-x-clip">
        <div className="flex flex-col w-full gap-y-space-lg md:gap-y-space-2xl">
          <div className="grid gap-x-2 grid-cols-1 md:grid md:grid-cols-20 text-color-section">
            <motion.h2
              className="col-start-1 sm:col-span-12 sm:col-start-5  text-center text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-semibold text-color-section justify-center items-center flex"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              LET&apos;S CONNECT
            </motion.h2>

            <div className="hidden h-full sm:flex col-start-1 sm:col-span-2 sm:col-start-6 w-full items-center">
              <motion.div
                className="h-[1px] bg-section w-full origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
              />
            </div>

            <motion.span
              className="flex text-[16px] sm:text-[25px] font-normal sm:font-thin text-color-section sm:col-span-6 sm:col-start-8 justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.75, delay: 0 }}
            >
              &quot;Great connections spark endless possibilities.&quot;
            </motion.span>

            <div className="hidden h-full sm:flex sm:col-span-2 sm:col-start-14 w-full items-center">
              <motion.div
                className="h-[1px] bg-section w-full origin-right"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
              />
            </div>

            <motion.span
              className="flex text-[16px] sm:text-[25px] font-normal sm:font-thin text-color-section sm:col-span-6 sm:col-start-8 justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.75, delay: 0.75 }}
            >
              &quot;Collaboration is the key to innovation.&quot;
            </motion.span>

            <div
              id="contact-container"
              className="w-full sm:col-span-18 sm:col-start-2 text-black overflow-hidden pt-16"
            >
              <div className="grid sm:gap-x-4 sm:gap-y-20 grid-cols-1 sm:grid-cols-[repeat(20,minmax(0,1fr))] px-6 pt-8 sm:px-0 sm:pt-16">
                <div className="flex flex-col col-start-1 col-span-1 sm:col-start-4 sm:col-span-14 gap-6 w-full h-full p-8 bg-section rounded-3xl text-color-section shadow-lg">
                  <span className="w-full font-bold items-center justify-center flex">
                    DROP ME A MESSAGE!
                  </span>

                  <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4 sm:gap-6"
                    action="https://api.web3forms.com/submit"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="access_key"
                      value={WEB3FORMS_ACCESS_KEY}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className={formControlClassName}
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className={formControlClassName}
                        required
                      />
                    </div>

                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className={formControlClassName}
                      required
                    />

                    <textarea
                      name="message"
                      placeholder="Your Message"
                      className={`${formControlClassName} h-40`}
                      required
                    ></textarea>

                    <button
                      type="submit"
                      className="contact-button py-4 rounded-lg font-semibold text-xl hover:bg-[var(--contact-button-hover)] transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Send Message
                    </button>
                  </form>
                  <span className="w-full font-bold items-center justify-center flex">
                    {result}
                  </span>
                </div>

                <div className="col-start-1 col-span-20">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
