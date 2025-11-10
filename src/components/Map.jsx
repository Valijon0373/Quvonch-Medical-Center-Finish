"use client"
import React from "react"

export default function Map() {
  return (
    <div className="w-full min-h-screen md:min-h-screen min-h-[400px]
     bg-gray-50 flex items-center justify-center p-4
     md:p-6 p-4">
      <div className="w-full max-w-7xl h-[500px] 
                    bg-white rounded-[1rem] shadow-lg 
                    overflow-hidden border
                    border-gray-200">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.240939257932!2d69.1651007!3d41.2875512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a923fdf43ad%3A0x21f1eaf2bfc3c6b6!2sTashkent!5e0!3m2!1sen!2suz!4v1697456789012!5m2!1sen!2suz"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}
