"use client"
import { useState } from "react";

 const ContactMe:React.FC=()=> {
  const [focused, setFocused] = useState<{ [key: string]: boolean }>({});

  const handleFocus = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h2 className="text-3xl px-1 font-bold text-teal-400 mb-6">CONTACT ME</h2>
      <form className="w-full max-w-2xl">
        <div className="flex flex-col md:flex-row gap-4">
          {["name", "email"].map((field) => (
            <div key={field} className="relative w-full">
              <label
                className={`absolute left-0 transition-all ${
                  focused[field]
                    ? "text-teal-400 text-xs -top-2"
                    : "text-gray-400 text-base top-3"
                }`}
              >
                {field.toUpperCase()} *
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                className="w-full border-b border-gray-600 bg-transparent outline-none py-2 text-white focus:border-teal-400 pt-5"
                onFocus={() => handleFocus(field)}
                onBlur={(e) => handleBlur(field, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 relative">
          <label
            className={`absolute left-0 transition-all ${
              focused["message"]
                ? "text-teal-400 text-xs -top-2"
                : "text-gray-400 text-base top-3"
            }`}
          >
            MESSAGE *
          </label>
          <textarea
            className="w-full border-b border-gray-600 bg-transparent outline-none py-2 text-white focus:border-teal-400 pt-5"
            rows={4}
            onFocus={() => handleFocus("message")}
            onBlur={(e) => handleBlur("message", e.target.value)}
          ></textarea>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="border border-teal-400 text-teal-400 px-6 py-2 hover:bg-teal-400 hover:text-gray-900 transition-all"
          >
            SEND MESSAGE
          </button>
        </div>
      </form>
    </div>
  );
}
export default ContactMe;