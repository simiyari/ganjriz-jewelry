"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3500);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center border-b border-white/25 transition-colors duration-300 ease-out hover:border-[#b5a414] focus-within:border-[#b5a414]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="نشانی ایمیل شما"
          className="h-11 w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          aria-label="نشانی ایمیل"
        />
        <button
          type="submit"
          className="shrink-0 py-2 text-[13px] font-medium text-white transition-colors duration-300 ease-out hover:text-[#b5a414]"
        >
          عضویت
        </button>
      </div>
      <p
        className={`mt-2 text-xs text-success transition-opacity duration-300 ${
          done ? "opacity-100" : "opacity-0"
        }`}
      >
        با تشکر! عضویت شما در خبرنامه ثبت شد.
      </p>
    </form>
  );
}
