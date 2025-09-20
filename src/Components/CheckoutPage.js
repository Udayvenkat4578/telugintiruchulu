import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const scriptSrc = "https://checkout.razorpay.com/v1/checkout.js";
    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutPage = () => {
  const location = useLocation();
  const cartTotal = location.state?.cartTotal || 0;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [isRazorpayReady, setIsRazorpayReady] = useState(false);

  useEffect(() => {
    loadRazorpayScript().then((loaded) => {
      if (!loaded) {
        alert("Failed to load Razorpay SDK.");
      }
      setIsRazorpayReady(loaded);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (!isRazorpayReady) {
      alert("Razorpay SDK not ready. Check your internet.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.addressLine1 ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const amountInPaise = Math.round(cartTotal * 100);

    if (amountInPaise <= 0) {
      alert("Cart total amount must be greater than zero.");
      return;
    }

    const options = {
      key: "rzp_test_RJwcGGNc1ZPYAi", // Replace with your real Razorpay key
      amount: amountInPaise,
      currency: "INR",
      name: "My Store",
      description: "Order Payment",
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: `${formData.addressLine1}, ${formData.addressLine2}, ${formData.city}, ${formData.state} - ${formData.pincode}, ${formData.country}`,
      },
      theme: { color: "#3399cc" },
      handler: function (response) {
        alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
        console.log("Razorpay Response:", response);
        // TODO: Save order details to your DB here
      },
      modal: {
        ondismiss: function () {
          alert("Payment popup closed.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
      <form className="grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name *"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (Optional)"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1 *"
          value={formData.addressLine1}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2 (Optional)"
          value={formData.addressLine2}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          name="city"
          placeholder="City *"
          value={formData.city}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State *"
          value={formData.state}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode *"
          value={formData.pincode}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          name="country"
          value="India"
          disabled
          className="border p-3 rounded-lg"
        />

        <button
          type="button"
          onClick={handlePayment}
          className="bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          Proceed to Payment (₹{cartTotal})
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
