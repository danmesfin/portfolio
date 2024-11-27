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
    <section
      className="flex flex-col justify-center py-10 md:py-20 lg:py-32 w-full bg-base dark:bg-zinc-900"
      id="contact"
    >
      <div className="w-full flex flex-wrap md:flex-nowrap justify-center py-4">
        <motion.div
          initial={{ y: 50, opacity: 0.5 }}
          transition={{ duration: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="w-full lg:w-2/3 flex flex-wrap md:flex-nowrap px-4"
        >
          <div className="w-full md:w-1/2">
            <div className="flex flex-col text-center mb-5 text-4xl md:text-5xl lg:text-5xl font-display text-white">
              <span>Get in touch</span>
              <span>for more.</span>
            </div>
          </div>
          <form
            className="sm:mx-auto sm:px-32 md:px-12 lg:pl-0 lg:pr-0 flex flex-col w-full md:w-1/2"
            ref={form}
            onSubmit={sendEmail}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Name*"
                className="form-control bg-red-50 border-2 border-black mt-4 p-2 text-black rounded-md"
              />
              <input
                type="text"
                name="subject"
                required
                placeholder="Subject*"
                className="form-control bg-red-50 border-2 border-black mt-4 p-2 text-black rounded-md"
              />
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email*"
              className="form-control bg-red-50 border-2 border-black mt-4 p-2 text-black rounded-md"
            />
            <textarea
              name="message"
              required
              placeholder="Message*"
              className="form-control bg-red-50 border-2 border-black mt-4 p-2 text-black rounded-md"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-24 mx-auto py-2 px-4 mt-4 shadow-sm text-sm text-white border border-primary hover:bg-gray-600 cursor-pointer border-glow-green rounded-md disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
