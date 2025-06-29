import { useState } from 'react';
import axios from 'axios';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setSnackbar('✅ Our team will contact you shortly.');
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setSnackbar(''), 4000); // Hide after 4s
    } catch (error) {
      setSnackbar('❌ Failed to send message.');
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 p-5">
      {/* LEFT BOX */}
      <div className="border p-6 rounded shadow-sm">
        <div className="mb-6">
          <div className="text-red-500 text-2xl mb-2">
            <i className="fa-solid fa-phone"></i> Call To Us
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p className="font-medium mt-2">Phone: +880111122222</p>
        </div>
        <hr />
        <div className="mt-6">
          <div className="text-red-500 text-2xl ">
            <i className="fa-solid fa-envelope"></i> Write To Us
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p className="mt-2 text-sm">Emails: customer@exclusive.com</p>
          <p className="text-sm">Emails: support@exclusive.com</p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone *"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full h-40 mb-4"
        ></textarea>
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
        >
          Send Message
        </button>

        {snackbar && (
          <div className="mt-4 text-sm text-green-600 font-semibold">
            {snackbar}
          </div>
        )}
      </form>
    </div>
  );
}
