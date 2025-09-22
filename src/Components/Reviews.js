import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    title: "Authentic & Tasty!",
    text: "The Munagaku Podi here is just like how my mom makes it at home. Strong flavor and goes perfectly with hot rice and ghee.",
    author: "Ravi Kumar",
    rating: 5,
  },
  {
    id: 2,
    title: "Best Traditional Sweets ",
    text: "I tried their Pootharekulu and Ariselu – absolutely authentic. Reminded me of festivals back home in Marteru.",
    author: "Divya Sri",
    rating: 5,
  },
  {
    id: 3,
    title: "Spicy & Addictive Pickles!",
    text: "The Prawns Pickle is finger-licking good. Perfect balance of spice and tang. A must-try if you’re from coastal Andhra.",
    author: "Praveen Reddy",
    rating: 5,
  },
  {
    id: 4,
    title: "Crispy Snacks ",
    text: "Their Gavvalu is so crunchy and tasty, you can’t stop at one handful. Took some packs to Hyderabad and my friends finished them.",
    author: "Sneha L",
    rating: 5,
  },
  {
    id: 5,
    title: "Feels Like Home ",
    text: "From the sweets to the pickles, everything tastes homemade and fresh. The quality is top-notch.",
    author: "Anusha V",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <div className="bg-gray-50 py-4">
      {/* Section Heading */}
      <div className="mb-8 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-gothic text-gray-800 mb-1">
          Real Stories, Happy Voices ✨
        </h2>
        <p className="text-gray-500 sm:text-md text-sm font-gothic text-center mb-6">
          Why people choose us and stay with us
        </p>
      </div>

      {/* Auto-scrolling container */}
      <div className="overflow-hidden relative group">
        <div className="flex animate-marquee space-x-6 px-4 pb-4 group-hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="min-w-[300px] max-w-sm bg-white shadow-md border rounded-md border-gray-300 p-6 flex flex-col"
            >
              <h3 className="font-gothic text-md text-gray-700 mb-2">
                {review.title}
              </h3>
              <p className="text-gray-600 flex-grow">{review.text}</p>
              <div className="flex mt-3 text-yellow-500">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="mt-3 font-bold text-gray-700">- {review.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind animation styles */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 45s linear infinite; /* ⏱ slower speed */
          }
        `}
      </style>
    </div>
  );
};

export default Reviews;
