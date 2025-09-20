import { useNavigate } from "react-router-dom";
import box2 from "../Assets/box2.png";
import box1 from "../Assets/box1.png";
import box3 from "../Assets/box3.png";
import box4 from "../Assets/box4.png";
import box6 from "../Assets/box6.png";
import box5 from "../Assets/box5.png";
import { Sparkles } from "lucide-react";


const categories = [
  { name: "Veg Pickles", image: box1 },
  { name: "Non-Veg Pickles", image: box2 },
  { name: "Podulu", image: box3 },
  { name: "Sweets", image: box4 },
  { name: "Snacks", image: box5 },
  { name: "Up Coming", image: box6 },
];

const Boxes = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    if (category === "Up Coming") return; // ❌ Do nothing
    navigate("/categories", { state: { search: category } }); // ✅ Navigate for others
  };

  return (
    <div className="bg-[#FFF7E2] py-4 pb-6">
<h2 className="text-2xl md:text-4xl font-gothic text-center mb-8 text-gray-800 flex items-center justify-center gap-2">
  <Sparkles size={24} color="#ff0000" />
  Featured Categories
  <Sparkles size={24} color="#ff0000" />
     </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto sm:px-11 px-5">
        {categories.map((cat, index) => (
          <div key={index}>
            <div
              onClick={() => handleClick(cat.name)}
              className={`relative overflow-hidden group shadow-md transition ${
                cat.name !== "Up Coming"
                  ? "cursor-pointer hover:scale-105"
                  : "cursor-not-allowed opacity-95"
              }`}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover group-hover:opacity-95"
              />

              {/* Shop Now Overlay */}
{/* Shop Now Button */}
{/* {cat.name !== "Up Coming" && (
<div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
  <button className="bg-white text-gray-900  px-2 font-gothic py-1  shadow-md  text-[10px] hover:bg-gray-100">
    SHOP NOW
  </button>
</div>)} */}
            </div>

            {/* Category Name */}
            <p className="text-center text-gray-900 py-2 text-sm md:text-sm font-gothic uppercase tracking-wide pb-4">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boxes;
