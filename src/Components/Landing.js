import React, { useEffect, useState } from "react";
import Herosec from "./Herosec";
import Categories from "./Categories";
import Boxes from "./Boxes";
import Specials from "./Specials";
import Trust from "./Trust";
import Reviews from "./Reviews";
import x from "../Assets/x.png";
import chatbot from "../Assets/chatbot.png";
import Navbar from "./Navbar";

const Landing = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showText, setShowText] = useState(true);
  const [chatBottom, setChatBottom] = useState(16);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 10 && !isChatOpen) setShowText(false);
      else if (!isChatOpen) setShowText(true);

      const buffer = 50;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      const distanceFromBottom = fullHeight - (scrollTop + windowHeight);

      if (distanceFromBottom < buffer) {
        setChatBottom(36); // lifted by pb-5
      } else {
        setChatBottom(16);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isChatOpen]);

  return (
    <div>
    <Herosec />
      <Boxes />
      <Trust />
      <Specials />
      <Categories />
      <Reviews />

      {/* ✅ Chatbot only on Landing */}
      <div
        className="fixed right-4 z-50 flex-col items-center transition-all pb-3 pr-1 duration-200"
        style={{ bottom: `${chatBottom}px` }}
      >
        {/* Chat Text */}
        <div className="w-32 flex justify-end mr-4">
          {showText && (
            <div
              className="text-white sm:text-xs text-[10px] bg-blue-400 sm:font-bold font-semibold px-2 py-1.5 border-2 border-black select-none"
              style={{ animation: "float 6s ease-in-out infinite alternate" }}
            >
              Chat with us!
            </div>
          )}
        </div>

        {/* Chat Icon */}
        <div className="relative justify-end flex">
          <button
            onClick={() => {
              setIsChatOpen((prev) => {
                const newState = !prev;
                setShowText(!newState);
                if (window.chatbase && newState) window.chatbase("open");
                return newState;
              });
            }}
            className="w-16 h-16 hover:scale-105 transition-transform flex items-center justify-center"
          >
            {isChatOpen ? (
              <img src={x} className="h-10 w-10" alt="Close Chat" />
            ) : (
              <img
                src={chatbot}
                alt="Chat"
                className="w-16 h-16 object-contain"
              />
            )}
          </button>

          {/* Chat iframe */}
          {isChatOpen && (
            <div className="absolute bottom-20 right-0 sm:w-[400px] w-[350px] h-[450px] border rounded-lg shadow-lg">
              <iframe
                title="Chatbase"
                src="https://www.chatbase.co/chatbot-iframe/tgn8NgIH8bV4Pxc2FRsKU"
                className="w-full h-full border-none"
              />
            </div>
          )}
        </div>

        {/* Floating Animation */}
        <style>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Landing;
