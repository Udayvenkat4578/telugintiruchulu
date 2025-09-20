import React, { useState, useEffect } from "react";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // Check if script already exists
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const CheckoutPage = ({ cartTotal }) => {
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
      setIsRazorpayReady(loaded);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (!isRazorpayReady) {
      alert("Razorpay SDK failed to load. Please check your connection.");
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

    const options = {
      key: "rzp_test_1234567890", // Replace with your Razorpay Key ID
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
      theme: {
        color: "#3399cc",
      },
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // TODO: Save order details in your DB
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
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
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
          placeholder="Email Address"
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
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          disabled
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
