// src/Components/AboutUs.jsx
import React, { useState } from "react";
import axios from "axios";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import contactImage from "../Assets/Contact-Us.png"; // replace with your image path

const policiesData = [
  {
    title: "Payment & Shipping",
    content: `● Payment Methods
We accept various payment methods, including credit/debit cards and digital wallets, ensuring a secure and convenient checkout experience.

● Order Processing
Orders are processed promptly upon receipt of payment. Please allow 1-3 working days for your order to be dispatched. Orders placed before 2 PM on a business day are typically shipped the same day, subject to stock availability and payment verification. Orders placed after 2 PM or on weekends will be dispatched on the next business day.

● Shipping Times
Delivery times vary based on your location. Typically, orders are delivered within 5-7 business days. However, during peak seasons or due to unforeseen circumstances, there may be slight delays.

● Shipping Charges
Shipping fees are calculated at checkout based on your delivery address and the size/weight of your order. We strive to offer competitive rates and transparent pricing.`
  },
  {
    title: "Return & Refund",
    content: `● Return Eligibility
Due to the nature of our products, we do not accept returns. However, if you receive a damaged or incorrect item, please contact us within 7 days of delivery for assistance.

● Refund Process
Refunds are processed to the original payment method. Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within 7-10 business days.

● Exchange Policy
We do not offer exchanges. If you wish to exchange an item, please initiate a return and place a new order for the desired product.

● Non-Refundable Items
Gift cards and downloadable products are non-refundable.`
  },
  {
    title: "Privacy Policy",
    content: `● Information Collection
We collect personal information necessary to process your orders, such as your name, address, email, and payment details. This information is used solely for order fulfillment and customer service.

● Data Protection
Your personal data is stored securely and is not shared with third parties without your consent, except as required by law.

● Cookies
Our website uses cookies to enhance your shopping experience. Cookies help us remember your preferences and provide personalized content. You can control cookie settings through your browser.

● Third-Party Services
We may use third-party services for payment processing and shipping. These services have their own privacy policies, and we encourage you to review them.`
  },
  {
    title: "Terms and Conditions",
    content: `● Product Descriptions
We strive to provide accurate descriptions and images of our products. However, due to the handmade nature of our items, slight variations may occur.

● Order Acceptance
Your order constitutes an offer to purchase. We reserve the right to accept or decline orders at our discretion.

● Limitation of Liability
Our liability is limited to the purchase price of the product(s) in question. We are not responsible for indirect, incidental, or consequential damages.

●Governing Law
These terms are governed by the laws of India. Any disputes will be resolved in the appropriate courts in Hyderabad, Telangana.`
  }
];

const AboutUs = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("submit"); // submit, submitting, submitted

  const togglePolicy = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      return false;
    }
    if (form.phone && !/^\d{10}$/.test(form.phone.trim())) return false;
    if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email.trim())) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all required fields correctly.");
      return;
    }
    setFormStatus("submitting");
    try {
      await axios.post("https://telugintiruchulu-d5c0f-default-rtdb.firebaseio.com/contact.json", form);
      setFormStatus("submitted");
      setForm({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setFormStatus("submit"), 8000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Try again.");
      setFormStatus("submit");
    }
  };

  return (
    <div className="container mx-auto p-6 mt-4 max-w-6xl">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-gothic text-center flex items-center justify-center gap-2 mb-2">
        <Sparkles color="#ff0000" size={28} /> About Us <Sparkles color="#ff0000" size={28} />
      </h1>
<section className="py-4 px-6 md:px-16">
  {/* About Us Text */}
  <div className="max-w-4xl mx-auto text-center space-y-4">
    <p className="text-gray-700 leading-relaxed">
      We come from the heart of the Godavari region, where food is more than
      just taste — it’s a way of life. At{" "}
      <span className="font-semibold">Telugintiruchulu</span>, we carry
      forward the rich legacy of traditional cooking passed down through
      generations.
    </p>
    <p className="text-gray-700 leading-relaxed">
      Our pickles, sweets, podulu, and snacks are made with the same love
      and authenticity that every home in our land cherishes. We believe in
      purity, so you will never find preservatives, artificial colors, or
      shortcuts in our kitchen. Every recipe is prepared with premium oils,
      fresh ingredients, and time-honored methods that preserve the true
      essence of our culture.
    </p>
    <p className="text-gray-700 leading-relaxed">
      People choose to stay with us not just for the flavors, but for the
      trust, honesty, and heritage that every bite carries.
    </p>
  </div>

  {/* 4 Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-9 mb-10">
    <div className="border border-purple-300 bg-purple-50 rounded-lg p-5 text-center shadow-sm">
      <h3 className="font-gothic text-sm text-purple-500  mb-2">Traditional Methods</h3>
      <p className="text-gray-600 text-sm">
        Every recipe follows age-old cooking techniques, keeping our flavors
        truly authentic.
      </p>
    </div>

    <div className="border border-orange-200 bg-orange-50  rounded-lg p-5 text-center shadow-sm">
      <h3 className="font-gothic text-sm text-orange-500  mb-2">No Preservatives</h3>
      <p className="text-gray-600 text-sm">
        100% natural goodness with no artificial colors or harmful
        preservatives.
      </p>
    </div>

    <div className="border  border-green-200 bg-green-50 rounded-lg p-5 text-center shadow-sm">
      <h3 className="font-gothic text-sm text-green-500  mb-2">Premium Oils</h3>
      <p className="text-gray-600 text-sm">
        Only high-quality oils are used to keep our pickles and snacks fresh
        and flavorful.
      </p>
    </div>

    <div className="border border-blue-200 bg-blue-50 rounded-lg p-5 text-center shadow-sm">
      <h3 className="font-gothic text-sm text-blue-500  mb-2">Fresh Ingredients</h3>
      <p className="text-gray-600 text-sm">
        Sourced directly from farms and local markets for unmatched taste
        and quality.
      </p>
    </div>
  </div>      <h1 className="text-3xl sm:pt-11 pt-3 md:text-4xl font-gothic text-center flex items-center justify-center gap-2 mb-2">
        <Sparkles color="#ff0000" size={28} /> Contact Us <Sparkles color="#ff0000" size={28} />
      </h1>

</section>

<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
  {/* Left Image */}
  <div className="flex justify-center">
    <img
      src={contactImage}
      alt="Contact"
      className="sm:w-96 w-72 sm:h-72 h-60 object-cover "
    />
  </div>

  {/* Right Form */}
  <div className="w-full max-w-md mx-auto">
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
          className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md px-3 py-2 text-sm shadow-sm"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          maxLength={10}
          pattern="[0-9]{10}"
          placeholder="Enter 10-digit phone number"
          className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md px-3 py-2 text-sm shadow-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md px-3 py-2 text-sm shadow-sm"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          placeholder="Type your message here..."
          className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md px-3 py-2 text-sm h-28 shadow-sm resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-2.5 text-sm font-medium rounded-md transition-colors duration-200 shadow-md ${
          formStatus === "submit"
            ? "bg-green-600 hover:bg-green-700 text-white"
            : formStatus === "submitting"
            ? "bg-yellow-500 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        {formStatus === "submit"
          ? "Submit"
          : formStatus === "submitting"
          ? "Submitting..."
          : "Submitted"}
      </button>
    </form>
  </div>
</div>
      {/* Policies */}
      <div className="mb-12">
      <h1 className="text-3xl md:text-4xl font-gothic text-center flex items-center justify-center gap-2 sm:mb-3 mb-6 pb-6">
        <Sparkles color="#ff0000" size={28} /> Policies <Sparkles color="#ff0000" size={28} />
      </h1>
        {policiesData.map((policy, index) => (
          <div key={index} className="border rounded mb-3">
            <button
              onClick={() => togglePolicy(index)}
              className="w-full flex justify-between items-center px-4 py-2 text-left font-medium bg-gray-100 hover:bg-gray-200"
            >
              {policy.title}
              {expandedIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedIndex === index && (
              <div className="p-4 text-gray-700 whitespace-pre-line bg-white">
                {policy.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Form Grid */}
      </div>
  );
};

export default AboutUs;
