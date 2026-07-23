import React, { useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const EMAIL_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
const EMAIL_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

const fieldClass =
  'w-full px-4 py-3 bg-paper-white/10 border border-paper-white/20 rounded-xl text-paper-white placeholder-paper-white/50 focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow focus:bg-paper-white/20 transition-all duration-200';

const labelClass =
  'block text-left text-sm font-medium text-paper-white/80 mb-2';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    setLoading(true);

    try {
      if (
        !form.current ||
        !EMAIL_SERVICE_ID ||
        !EMAIL_TEMPLATE_ID ||
        !EMAIL_PUBLIC_KEY
      ) {
        throw new Error('Missing configuration');
      }

      await emailjs.sendForm(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        form.current,
        EMAIL_PUBLIC_KEY
      );

      toast.success('Message sent successfully! I will get back to you soon.');
      formElement.reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-2 md:px-4">
      <section
        className="max-w-7xl mx-auto py-12 md:py-20 bg-paper-text rounded-3xl my-8"
        id="contact"
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0.5 }}
            transition={{ duration: 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-paper-white mb-6 font-display leading-tight">
              Let&apos;s work together to bring
              <br />
              your ideas to life
            </h2>
            <p className="text-lg md:text-xl text-paper-white/80 max-w-2xl mx-auto">
              Have a project in mind, or just want to say hello? Send me a
              message and I&apos;ll get back to you within a couple of days.
            </p>
          </motion.div>

          {/* Contact Form Section */}
          <div
            id="contact-form"
            className="mt-16 pt-16 border-t border-paper-white/20"
          >
            <form className="max-w-2xl mx-auto" ref={form} onSubmit={sendEmail}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <label htmlFor="contact-name" className="block">
                  <span className={labelClass}>Your name</span>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={fieldClass}
                  />
                </label>
                <label htmlFor="contact-email" className="block">
                  <span className={labelClass}>Your email</span>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="jane@example.com"
                    className={fieldClass}
                  />
                </label>
              </div>

              <label htmlFor="contact-subject" className="block mb-6">
                <span className={labelClass}>Subject</span>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  required
                  placeholder="What is this about?"
                  className={fieldClass}
                />
              </label>

              <label htmlFor="contact-message" className="block mb-6">
                <span className={labelClass}>Message</span>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className={`${fieldClass} resize-none`}
                />
              </label>

              <div className="btn-primary inline-block">
                <div className="btn-primary-bg" />
                <div className="btn-primary-shadow" />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-content px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
