import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../Assets/bg1.png";
import bgMobile from "../Assets/bgmobile.png";
import { Sparkles } from "lucide-react";

const Specials = () => {
  const products = [
    {display:"Munagaku podi", name: "Munagaku Karam Podi", image: "https://res.cloudinary.com/dolusspah/image/upload/v1757838243/yesriajcr8f6zxoenl4p.jpg", category: "Podulu" },
    {display:"pootharekulu", name: "Pootharekulu(Dry Fruit)", image: "https://res.cloudinary.com/dolusspah/image/upload/v1757832889/izkgc2a6l8evtben4n15.webp", category: "Sweets" },
    {display:"Prawns Pickle", name: "Prawns Pickle", image: "https://res.cloudinary.com/dolusspah/image/upload/v1757835659/iwl9v2ecsfjoa239kph0.jpg", category: "nonvegpickle" },
    {display:"Gavvalu", name: "Gavvalu(Hot)", image: "https://res.cloudinary.com/dolusspah/image/upload/v1757836164/vved6tdqfky7sinvwzgu.webp", category: "Snacks" },
    {display:"Lemon Pickle", name: "Lemon Pickle", image: "https://res.cloudinary.com/dolusspah/image/upload/v1757795388/nbqb1ur1ssgybhdjuitb.jpg", category: "vegpickle" },
    {display:"Ariselu", name: "Ariselu(Ghee)", image: "https://res.cloudinary.com/dolusspah/image/upload/v1757830860/ur84fha2d4swulhenoiq.webp", category: "Sweets" },
  ];

  const loopItems = [...products, ...products];
  const navigate = useNavigate();

  // Two refs (mobile + desktop)
  const mobileScrollerRef = useRef(null);
  const desktopScrollerRef = useRef(null);

  // shared refs
  const lastInteractionRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  // config
  const speedPxPerSec = 40;
  const resumeDelayMs = 1500;

  useEffect(() => {
    const setupScroller = (scroller) => {
      if (!scroller) return;

      let raf;
      let lastTime = null;

      const step = (timestamp) => {
        if (!lastTime) lastTime = timestamp;
        const dt = timestamp - lastTime;
        lastTime = timestamp;

        const now = performance.now();
        const interactedRecently = now - lastInteractionRef.current < resumeDelayMs;
        const isPointerDown = isPointerDownRef.current;

        if (!interactedRecently && !isPointerDown && scroller.scrollWidth > scroller.clientWidth) {
          scroller.scrollLeft += (speedPxPerSec * dt) / 1000;

          const half = scroller.scrollWidth / 2;
          if (scroller.scrollLeft >= half) {
            scroller.scrollLeft -= half;
          }
        }

        raf = requestAnimationFrame(step);
      };

      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    };

    const cleanupMobile = setupScroller(mobileScrollerRef.current);
    const cleanupDesktop = setupScroller(desktopScrollerRef.current);

    return () => {
      cleanupMobile?.();
      cleanupDesktop?.();
    };
  }, []);

  // Handlers
  const onPointerDown = (e, scroller) => {
    if (!scroller) return;
    isPointerDownRef.current = true;
    startXRef.current = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    startScrollLeftRef.current = scroller.scrollLeft;
    lastInteractionRef.current = performance.now();
    try {
      e.target.setPointerCapture?.(e.pointerId);
    } catch {}
  };
  const onPointerMove = (e, scroller) => {
    if (!isPointerDownRef.current || !scroller) return;
    const clientX = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    const dx = clientX - startXRef.current;
    scroller.scrollLeft = startScrollLeftRef.current - dx;
    lastInteractionRef.current = performance.now();
  };
  const onPointerUp = (e) => {
    isPointerDownRef.current = false;
    lastInteractionRef.current = performance.now();
    try {
      e.target.releasePointerCapture?.(e.pointerId);
    } catch {}
  };
  const onWheel = () => {
    lastInteractionRef.current = performance.now();
  };

  const handleCardClick = (name) => {
    navigate(`/product/${encodeURIComponent(name)}`);
  };

  return (
    <div className="w-full py-2">
      {/* Heading */}
      <h2 className="text-2xl pt-6 md:text-4xl font-gothic text-center mb-6 flex items-center justify-center gap-2 text-gray-800">
        <Sparkles size={20} color="#ff0000" />
        Our Curated Collection
        <Sparkles size={20} color="#ff0000" />
      </h2>

      {/* Mobile Banner + Scroller */}
      <div className="md:hidden">
        {/* Banner */}
        <div
          className="relative flex flex-col items-center justify-center text-center text-white py-9 px-6 mx-2"
          style={{
            backgroundImage: `url(${bgMobile})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h2 className="text-3xl font-gothic text-center">Chef's Special ✨</h2>
          <p className="mt-3 text-base font-semibold text-md">
            Bringing you the best of our handmade sweets, pickles and snacks.
          </p>
        </div>

        {/* Scroller */}
        <div
          ref={mobileScrollerRef}
          className="flex gap-4 overflow-x-auto no-scrollbar py-6 px-3 cursor-grab mt-6"
          onPointerDown={(e) => onPointerDown(e, mobileScrollerRef.current)}
          onPointerMove={(e) => onPointerMove(e, mobileScrollerRef.current)}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
          onWheel={onWheel}
          onTouchStart={() => (lastInteractionRef.current = performance.now())}
        >
          {loopItems.map((food, idx) => (
            <div
              key={`${food.name}-${idx}`}
              onClick={() => handleCardClick(food.name)}
              className="w-[180px] h-[240px] flex-shrink-0 rounded-xl relative overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:scale-105"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-2">
                <p className="text-white font-gothic text-center text-xs truncate">
                  {food.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full mt-8">
        {/* Left Banner */}
        <div
          className="relative flex flex-col justify-center items-start p-8 text-left w-1/3 text-white z-10"
          style={{
            backgroundImage: `url(${bg1})`,
            backgroundSize: "99%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-20">
            <h2 className="text-3xl font-gothic text-white">Chef's Special ✨</h2>
            <p className="mt-3 font-semibold text-md sm:pr-5">
              Bringing you the best of our handmade sweets, pickles and snacks.
            </p>
          </div>
        </div>

        {/* Right Scroller */}
        <div className="relative w-2/3 overflow-hidden z-0">
          <div
            ref={desktopScrollerRef}
            className="flex gap-4 overflow-x-auto no-scrollbar py-6 px-3 cursor-grab"
            onPointerDown={(e) => onPointerDown(e, desktopScrollerRef.current)}
            onPointerMove={(e) => onPointerMove(e, desktopScrollerRef.current)}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            onWheel={onWheel}
            onTouchStart={() => (lastInteractionRef.current = performance.now())}
          >
            {loopItems.map((food, idx) => (
              <div
                key={`${food.name}-${idx}`}
                onClick={() => handleCardClick(food.name)}
                className="w-[220px] h-[300px] flex-shrink-0 rounded-2xl relative overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-3">
                  <p className="text-white font-gothic text-center text-sm truncate">
                    {food.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Local Styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar { -webkit-overflow-scrolling: touch; }
        .no-scrollbar:active { cursor: grabbing; }
      `}</style>
    </div>
  );
};

export default Specials;
