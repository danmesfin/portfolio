// @ts-nocheck
import React, { useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        'service_u0y8ar8',
        'template_nl8rsyv',
        form.current,
        'j2BrhHxE89sWzCe-6'
      )
      .then(setSuccess(true), () => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    e.currentTarget.reset();
  };

  return (
    <section
      className="flex flex-col justify-center py-10 md:py-20 lg:py-32 w-full bg-base dark:bg-zinc-900"
      id="contact"
    >
      <div className="w-full flex flex-wrap md:flex-nowrap justify-center py-4 ">
        <motion.div
          initial={{ y: 50, opacity: 0.5 }}
          transition={{ duration: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="w-full  lg:w-2/3 flex flex-wrap md:flex-nowrap px-4"
        >
          <div className="w-full md:w-1/2">
            <div
              className="flex flex-col text-center mb-5 text-4xl md:text-5xl 
              lg:text-5xl font-display text-white"
            >
              <span className="">Get in touch </span>
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
            <input
              type="submit"
              value={loading ? 'Sending...' : 'Send'}
              className={`w-full md:w-24 mx-auto py-2 px-4 mt-4 shadow-sm text-sm text-white border border-primary hover:bg-gray-600 cursor-pointer ${
                success ? ' ' : ' '
              } ${
                error ? 'border-red-500 bg-red-500' : 'border-glow-green'
              } rounded-md`}
              disabled={loading}
            />
            {success && (
              <p className="text-green-500 text-center mt-2">
                I have received your message, I will get back to you soon!
              </p>
            )}
            {error && (
              <p className="text-red-500 text-center mt-2">
                Error sending message. Please try again.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
