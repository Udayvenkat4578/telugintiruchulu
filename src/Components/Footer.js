import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bell from "../Assets/bell.png";
import { FaCheck } from "react-icons/fa";
import logo from "../Assets/logo.png"; // replace with your logo path

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // ✅ Feedback message

  const navigate = useNavigate();

  // Firebase Realtime DB URL
  const DB_URL =
    "https://telugintiruchulu-d5c0f-default-rtdb.firebaseio.com/Subscribe.json";

  // ✅ Email validation regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = async () => {
    if (!email || !isValidEmail(email)) {
      setMessage("Please enter a valid email");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(DB_URL, {
        method: "POST",
        body: JSON.stringify({ email, date: new Date().toISOString() }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail("");
        setMessage("Wohoo! Subscribed 🎉");
        setTimeout(() => setSubscribed(false), 2500); // reset after animation
      } else {
        setMessage("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { label: "Non-veg Pickles", type: "Non-Veg Pickles" },
    { label: "Veg Pickles", type: "Veg Pickles" },
    { label: "Sweets", type: "Sweets" },
    { label: "Snacks", type: "Snacks" },
    { label: "Gift Packs", type: "Gift Packs" },
  ];

  const handleCategoryClick = (type) => {
    navigate("/categories", { state: { search: type } });
  };

  return (
    <footer className="overflow-x-hidden bg-gray-900 text-white pt-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* About */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <Link
              to="/"
              className="flex items-center justify-center md:justify-start space-x-2"
            >
              {/* Logo */}
              <img src={logo} className="sm:h-12  h-24" alt="Logo" />

              {/* Text (hidden on mobile, visible on md and above) */}
              <div className="hidden md:block">
                <h2 className="text-2xl font-bold text-red-500">
                  SPTelugintiruchulu
                </h2>
                <p className="text-xs text-gray-200">
                  Flavours that tell a Story
                </p>
              </div>
            </Link>

            {/* Large paragraph below logo */}
            <p className="text-sm text-gray-300 mt-4 max-w-md text-center md:text-left">
              Each Flavour has its own Unique Story.
              <br />
              Snacks that crunch, sweets that melt, pickles that spark. Godavari
              flavors straight from the heart.
              <br />
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-gothic mb-4">Our Products</h3>
            <ul className="space-y-2 text-white font-medium">
              {categories.map((cat) => (
                <li key={cat.type}>
                  <button
                    onClick={() => handleCategoryClick(cat.type)}
                    className="hover:text-white transition text-left"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-gothic mb-4">Contact Us</h3>
            <p className="text-sm">📍 2/162 Shop no:3, Koderu Road,</p>
            <p className="text-sm">
              Near Chinchinada Canal Bridge, Neggipudi
            </p>
            <p className="text-sm">Maruteru, W.G. Dist, A.P – 534122</p>
            <p className="text-sm mt-2">
              📞{" "}
              <a
                href="tel:9553717887"
                className="hover:text-white transition font-medium"
              >
                9553717887
              </a>
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-gothic mb-4">Join Our Newsletter</h3>
            <p className="text-white text-sm mb-4">
              Get updates on new flavors and special offers!
            </p>
            <div className="flex sm:flex-row flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-3 py-2 rounded-md text-gray-800 w-full sm:w-auto focus:outline-none"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-red-500 hover:scale-105 flex justify-center items-center transition px-3 py-1 rounded-md font-semibold"
              >
                {subscribed ? (
                  <FaCheck className="h-5 w-5 text-white animate-bounce" />
                ) : loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {/* Desktop: Bell icon */}
                    <img
                      src={bell}
                      className="h-5 w-5 hidden sm:block"
                      alt="Subscribe"
                    />

                    {/* Mobile: Subscribe text */}
                    <span className="block sm:hidden">Subscribe</span>
                  </>
                )}
              </button>
            </div>
            {/* ✅ Message below input */}
            {message && (
              <p
                className={`mt-2 text-sm ${
                  subscribed ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white mt-10"></div>

        {/* Bottom Row */}
        <div className="flex text-gray-400 flex-col justify-center py-2 sm:pb-2 pb-5">
          <p className="text-sm font-medium text-center">
            © {new Date().getFullYear()} Sp_Telugintiruchulu. All rights
            reserved.
          </p>

          <p className="text-sm text-gray-400 px-3 text-center">
            <span className="font-semibold">Crafted by</span>{" "}
            <span className="font-sarina text-[#ff9966] z-50 ">
              <a href="https://www.udayvenkat.in">Uday Venkat</a>
            </span>
            <span className="px-2"> || </span>
            <span className="font-sarina text-[#00B7E6] z-50 ">
              <a href="https://designwithriddle.online/"> Riddle</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
