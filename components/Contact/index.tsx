import React, { useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const EMAIL_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
const EMAIL_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget; // Store form reference
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
      // console.error('Email send error:', error);
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
            Let's work together to bring
            <br />
            your ideas to life
          </h2>
          <p className="text-lg md:text-xl text-paper-white/80 mb-8 max-w-2xl mx-auto">
            Ready to start your next project? Get in touch and let's create something amazing together.
          </p>
          
          <div className="btn-secondary inline-block">
            <div className="btn-secondary-shadow"></div>
            <button 
              onClick={() => {
                const formSection = document.getElementById('contact-form');
                formSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary-content bg-accent-yellow text-paper-text hover:bg-accent-yellow/90 border-accent-yellow px-8 py-4 text-lg font-semibold"
            >
              Get started for free →
            </button>
          </div>
          
          <p className="text-paper-white/60 text-sm mt-4">
            No commitment required. Free consultation.
          </p>
        </motion.div>
        
        {/* Contact Form Section */}
        <div id="contact-form" className="mt-16 pt-16 border-t border-paper-white/20">
          <form
            className="max-w-2xl mx-auto"
            ref={form}
            onSubmit={sendEmail}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name*"
                className="w-full px-4 py-3 bg-paper-white/10 border border-paper-white/20 rounded-xl text-paper-white placeholder-paper-white/60 focus:outline-none focus:border-accent-yellow focus:bg-paper-white/20 transition-all duration-200"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email*"
                className="w-full px-4 py-3 bg-paper-white/10 border border-paper-white/20 rounded-xl text-paper-white placeholder-paper-white/60 focus:outline-none focus:border-accent-yellow focus:bg-paper-white/20 transition-all duration-200"
              />
            </div>
            <input
              type="text"
              name="subject"
              required
              placeholder="Project Subject*"
              className="w-full px-4 py-3 mb-6 bg-paper-white/10 border border-paper-white/20 rounded-xl text-paper-white placeholder-paper-white/60 focus:outline-none focus:border-accent-yellow focus:bg-paper-white/20 transition-all duration-200"
            />
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Tell me about your project...*"
              className="w-full px-4 py-3 mb-6 bg-paper-white/10 border border-paper-white/20 rounded-xl text-paper-white placeholder-paper-white/60 focus:outline-none focus:border-accent-yellow focus:bg-paper-white/20 transition-all duration-200 resize-none"
            />
            <div className="btn-primary inline-block">
              <div className="btn-primary-bg"></div>
              <div className="btn-primary-shadow"></div>
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
