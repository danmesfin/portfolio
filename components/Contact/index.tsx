// @ts-nocheck

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { GoMailRead } from 'react-icons/go';
import { BsMailbox } from 'react-icons/bs';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        'service_u0y8ar8',
        'template_nl8rsyv',
        form.current,
        'j2BrhHxE89sWzCe-6'
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
        },
        (error) => {
          console.log(error.text);
          setError(true);
        }
      )
      .finally(() => {
        setLoading(false);
      });

    e.target.reset();
  };

  return (
    <section
      className="flex flex-col justify-center py-10 md:py-20 w-full bg-base"
      id="contact"
    >
      <div className="flex flex-wrap md:flex-nowrap py-10 md:mx-20">
        <div className="relative w-full md:w-1/3 flex items-center justify-center">
          <div className="flex mx-auto">
            <GoMailRead
              className="top-1/2 shadow-allSide shadow-gray-700 rounded-xl fill-green-500 text-5xl"
              size={100}
            />
          </div>
          <div className="absolute right-5 md:-right-10 ml-auto transform rotate-45">
            <BsMailbox className="" size={100} />
          </div>
        </div>
        <motion.div
          initial={{ x: 50, opacity: 0.5 }}
          transition={{
            duration: 1,
          }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col w-full md:w-2/3 py-4 md:pb-4"
        >
          <div className="flex border border-gray-500 bg-opacity-30 hover:bg-opacity-30 shadow-lg shadow-gray-600 rounded-lg pb-4 px-2">
            <div className="mx-auto">
              <div className="flex flex-col text-center mb-5 py-5 text-xl md:text-5xl font-bold">
                <span className="text-green-500">Get in touch </span>
                <span>for more.</span>
              </div>
            </div>
            <form
              className="mx-auto flex flex-col"
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
                type="text"
                name="message"
                required
                placeholder="Message*"
                className="form-control bg-red-50 border-2 border-black mt-4 p-2 text-black rounded-md"
              />
              <input
                type="submit"
                value={loading ? 'Sending...' : 'Send'}
                className={`w-24 mx-auto py-2 px-4 mt-4 shadow-sm text-sm text-white border ${
                  success
                    ? 'glow-green bg-green-500'
                    : 'glow-green hover:shadow-allSide hover:shadow-green-500'
                } ${
                  error ? 'border-red-500 bg-red-500' : 'border-glow-green'
                } rounded-md`}
                disabled={loading}
              />
              {success && (
                <p className="text-green-500 text-center mt-2">
                  Message sent successfully!
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center mt-2">
                  Error sending message. Please try again.
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
