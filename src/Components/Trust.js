import React from "react";
import { Users, Leaf, Award, ShieldCheck } from "lucide-react";
import { Sparkles } from "lucide-react";

const Trust = () => {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "300+ Happy Customers",
      desc: "We are trusted by hundreds of customers who love our quality ",
    },
    {
      icon: <Leaf className="h-10 w-10 text-green-600" />,
      title: "Pure Promise",
      desc: "No preservatives, artificial flavorings, only natural taste",
    },
    {
      icon: <Award className="h-10 w-10 text-yellow-600" />,
      title: "Premium Ingredients",
      desc: "Only the finest ingredients and oils go into making our products.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-purple-600" />,
      title: "Hygienically Prepared",
      desc: "High safety and quality standards maintained at every step.",
    },
  ];

  return (
    <section className="sm:py-9 py-0 sm:pt-9 pt-9 px-6 bg-gray-50 ">
      <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-gothic text-center mb-1 text-gray-800">
<h2 className="text-2xl md:text-4xl font-gothic text-center mb-1 text-gray-800 flex items-center justify-center gap-2">
  <Sparkles size={24} color="#ff0000" />
Built On trust  <Sparkles size={24} color="#ff0000" />
</h2>      </h2>
        <p className="text-gray-500 text-md text-center font-gothic mb-8">
          Why people choose us and stay with us
        </p>

        {/* Grid for Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ">
          {features.map((f, idx) => (
            <div
              key={idx}
className="p-6 shadow-md hover:shadow-lg transition flex flex-col items-center text-center 
           bg-gradient-to-l from-gray-200 to-gray-100 border border-gray-300 "
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-sm font-gothic text-gray-800 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
