import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../utils/api";
import { formatPhoneNumber, cleanPhoneNumber, handlePhoneInputChange } from "../../utils/phoneFormatter";

export default function Application() {
  const [form, setForm] = useState({ name: "", phone: "+998 ", comment: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      handlePhoneInputChange(e, (formattedValue) => {
        setForm(prev => ({ ...prev, phone: formattedValue }));
      })
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const phoneNumber = cleanPhoneNumber(form.phone);
      await axios.post(apiUrl('vakansiya-arizalar'), {
        name: form.name,
        diplomId:form.diplomId,
        phone: phoneNumber,
        comment: form.comment,
      });
      setSuccess(true);
      setForm({ name: "", phone: "+998 ", comment: "" });
    } catch (err) {
      setError("Xatolik yuz berdi. Qayta urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 py-20 flex justify-center">
      <div className="w-full max-w-md text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ariza Qoldiring
        </h2>
        <p className="text-gray-700 mb-10 text-base md:text-lg">
          Biz uni tezda ko‘rib chiqamiz va siz uchun qulay vaqtda bog‘lanamiz.
        </p>
        {success && (
          <div className="mb-4 text-green-600 font-semibold">Arizangiz yuborildi!</div>
        )}
        {error && (
          <div className="mb-4 text-red-600 font-semibold">{error}</div>
        )}
        <form className="space-y-5 px-4 md:px-0" onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name_uz"
            value={form.name}
            onChange={handleChange}
            placeholder="Ismingiz"
            className="w-full rounded-full border border-blue-400 px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white text-sm"
            required
          />
          <div className="flex items-center w-full rounded-full border border-blue-400 px-4 py-2.5 bg-white">
            <span className="flex items-center gap-1 text-gray-600 text-sm mr-2">
              <img
                src="https://flagcdn.com/w20/uz.png"
                alt="UZ"
                className="w-6 h-4 rounded-sm"
              />
              +998
            </span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="99 465 55 55"
              className="flex-1 outline-none text-gray-800 text-sm"
              required
            />
          </div>
          <textarea
            rows="4"
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Izoh Qoldiring"
            className="w-full rounded-lg border border-blue-400 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white text-sm resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded-full py-3 hover:opacity-80 transition"
            disabled={loading}
          >
            {loading ? "Yuborilmoqda..." : "Jo‘natish"}
          </button>
        </form>
      </div>
    </section>
  );
}
