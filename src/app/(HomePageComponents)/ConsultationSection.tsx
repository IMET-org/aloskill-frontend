"use client";

import { Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ConsultationSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <section className='bg-white py-16 md:py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-gray-900 font-black mb-4'>Free Consultation</h2>
          <p className='text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Streamline HR processes and empower your team with our products.
            <br />
            Effortlessly manage employee data, and more.
          </p>
        </div>

        {/* Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left Column - Action Cards */}
          <div className='space-y-6'>
            {/* Call Card */}
            <div className='bg-gradient-to-br from-[var(--color-orange)] to-[var(--color-orange-dark)] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
              <div className='flex items-center justify-center w-14 h-14 bg-black/10 rounded-full mb-6'>
                <Phone className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-white font-bold mb-4'>Speak to someone in sales</h3>
              <p className='text-white/90 text-sm mb-6 leading-relaxed'>
                To create a world where education is accessible to all, regardless of background or
                circumstance.
              </p>
              <button className='px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-300 font-semibold text-sm shadow-lg'>
                Book a Appointment
              </button>
            </div>

            {/* Email Card */}
            <div className='bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
              <div className='flex items-center justify-center w-14 h-14 bg-black/10 rounded-full mb-6'>
                <Send className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-gray-900 font-bold mb-4'>Contact to our team</h3>
              <p className='text-gray-800 text-sm mb-6 leading-relaxed'>
                To create a world where education is accessible to all, regardless of background or
                circumstance.
              </p>
              <button className='px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full hover:from-red-600 hover:to-orange-600 transition-colors duration-300 font-semibold text-sm shadow-lg'>
                Send a Mail
              </button>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className='bg-gray-50 rounded-3xl p-8 shadow-xl'>
            <h3 className='text-gray-900 font-bold mb-6'>Send us a message</h3>

            <form
              onSubmit={handleSubmit}
              className='space-y-5'
            >
              {/* Name Fields */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder='Reazuan Ahmed'
                    className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder='Enter last name'
                    className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all'
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Enter your mail'
                  className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all'
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Subject
                </label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder='Type your subject'
                  className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all'
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Messages
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder='Type your messages'
                  rows={5}
                  className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent transition-all resize-none'
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full px-6 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl'
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
