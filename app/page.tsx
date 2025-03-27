// page.tsx
"use client";

import { useState } from "react";
import Chat from "@/components/Chat";
import Image from "next/image";



export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <main
        className={`min-h-screen p-6 transition-colors duration-300 ${
          darkMode ? "bg-[#121212] text-white" : "bg-gray-50 text-black"
        }`}
        style={{
          backgroundImage: "url('/grid-bg.png')",
          backgroundRepeat: "space",
          backgroundSize: "auto",
        }}
      >
        <div className="relative max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-3xl font-medium text-center font-sans">
          Merciful&apos;s CoTax Assistant
        </h1>


          <div className="absolute right-0 top-1/2 -translate-y-1/2 ml-5">
            <div className="relative w-[120px] h-[60px]">
              <input
                type="checkbox"
                id="dark-toggle"
                checked={darkMode}
                onChange={() => setDarkMode((prev) => !prev)}
                className="hidden"
              />
              <label
                htmlFor="dark-toggle"
                className="absolute top-0 left-0 w-full h-full rounded-full cursor-pointer theme-toggle-label scale-[0.5] origin-right"
              ></label>
            </div>
          </div>
        </div>

        <Chat darkMode={darkMode} />
      </main>

      <footer className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-white/70 dark:bg-[#1e1e1e]/70 backdrop-blur-md px-5 py-2 rounded-full shadow-md text-m text-black dark:text-white">
        <Image src="/ic.svg" alt="Mercy Icon" width={20} height={20} />
        <a
          href="https://mercifulbolaji.netlify.app/" // ← replace with your real URL
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <span>Made w/ ❤️ by Merciful</span>
        </a>
      </footer>

     

    </div>
  );
}
