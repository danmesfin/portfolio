import React, { useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import SectionHeading from '../SectionHeading';
import { siteConfig } from '../../utils/siteConfig';

const EMAIL_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
const EMAIL_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

const fieldClass =
  'w-full bg-transparent border-b border-paper-border dark:border-white/20 py-3 font-mono text-sm text-paper-text dark:text-paper-white placeholder-paper-muted/60 dark:placeholder-gray-600 focus:outline-none focus:border-paper-text dark:focus:border-paper-white transition-colors duration-200';

const labelClass = 'eyebrow block mb-2';

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
    <section className="px-5 sm:px-8 lg:px-12 py-16 sm:py-24" id="contact">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something."
          intro="Have a project in mind, or just want to say hello? Send a message and I’ll reply within a couple of days."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
          {/* Direct line */}
          <div className="font-mono text-sm space-y-6">
            <div>
              <p className="eyebrow mb-2">Email</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-paper-text dark:text-paper-white underline decoration-1 underline-offset-4 decoration-paper-muted hover:decoration-paper-text dark:hover:decoration-paper-white transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Based in</p>
              <p className="text-paper-muted dark:text-gray-400">
                {siteConfig.location}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-2">Availability</p>
              <p className="text-paper-muted dark:text-gray-400">
                {siteConfig.availability}
              </p>
            </div>
          </div>

          {/* Form */}
          <form id="contact-form" ref={form} onSubmit={sendEmail}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

            <label htmlFor="contact-subject" className="block mb-8">
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

            <label htmlFor="contact-message" className="block mb-8">
              <span className={labelClass}>Message</span>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project…"
                className={`${fieldClass} resize-none`}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-ink disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
