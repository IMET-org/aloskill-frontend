"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    country: "",
    regionState: "",
    city: "",
    zipCode: "",
    email: "",
    phoneNumber: "",
    shipToDifferent: false,
    paymentMethod: "debit-credit",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    orderNotes: "",
  });

  const orderItems = [
    {
      id: 1,
      name: "Canon EOS 1500D DSLR Camera Body+ 18-...",
      quantity: 1,
      price: 579,
      image: "https://images.unsplash.com/photo-1606980707315-f84c086787cf?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Wired Over-Ear Gaming Headphones with U...",
      quantity: 3,
      price: 220,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop",
    },
  ];

  const subTotal = 320;
  const shipping = 0;
  const discount = 24;
  const tax = 61.99;
  const total = 357.99;

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log("Order submitted:", formData);
    alert("Order placed successfully!");
  };

  const paymentMethods = [
    { id: "cash", icon: "💵", label: "Cash on Delivery" },
    { id: "venmo", icon: "V", label: "Venmo", bgColor: "bg-blue-100" },
    { id: "paypal", icon: "P", label: "Paypal", bgColor: "bg-blue-200" },
    { id: "amazon", icon: "a", label: "Amazon Pay", bgColor: "bg-gray-800 text-white" },
    { id: "debit-credit", icon: "💳", label: "Debit/Credit Card" },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50'>
      {/* Header */}
      <header className='bg-white shadow-sm animate-slide-down'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-[#074079]'>CheckOut</h1>
            <p className='text-sm text-gray-500 mt-1'>Home / Checkout</p>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Section - Billing & Payment */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Billing Information */}
            <div className='bg-white rounded-xl shadow-md p-6 sm:p-8 animate-fade-in'>
              <h2 className='text-xl font-bold text-[#074079] mb-6'>Billing Information</h2>

              <div className='space-y-4'>
                {/* Name Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      User name
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      placeholder='First name'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                    />
                  </div>
                  <div className='flex items-end'>
                    <input
                      type='text'
                      name='lastName'
                      placeholder='Last name'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Company Name <span className='text-gray-400'>(Optional)</span>
                  </label>
                  <input
                    type='text'
                    name='companyName'
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                  />
                </div>

                {/* Address */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
                  <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                  />
                </div>

                {/* Location Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Country</label>
                    <select
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200 bg-white'
                    >
                      <option value=''>Select...</option>
                      <option value='us'>United States</option>
                      <option value='uk'>United Kingdom</option>
                      <option value='bd'>Bangladesh</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Region/State
                    </label>
                    <select
                      name='regionState'
                      value={formData.regionState}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200 bg-white'
                    >
                      <option value=''>Select...</option>
                      <option value='dhaka'>Dhaka</option>
                      <option value='ny'>New York</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>City</label>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Zip Code</label>
                    <input
                      type='text'
                      name='zipCode'
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      name='phoneNumber'
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                    />
                  </div>
                </div>

                {/* Checkbox */}
                <div className='flex items-center gap-2 pt-2'>
                  <input
                    type='checkbox'
                    id='shipDifferent'
                    name='shipToDifferent'
                    checked={formData.shipToDifferent}
                    onChange={handleInputChange}
                    className='w-4 h-4 text-[#DA7C36] border-gray-300 rounded focus:ring-[#DA7C36]'
                  />
                  <label
                    htmlFor='shipDifferent'
                    className='text-sm text-gray-700'
                  >
                    Ship into different address
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Option */}
            <div
              className='bg-white rounded-xl shadow-md p-6 sm:p-8 animate-fade-in'
              style={{ animationDelay: "100ms" }}
            >
              <h2 className='text-xl font-bold text-[#074079] mb-6'>Payment Option</h2>

              {/* Payment Methods */}
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6'>
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    type='button'
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-2 hover:scale-105 ${
                      formData.paymentMethod === method.id
                        ? "border-[#DA7C36] bg-orange-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`text-2xl ${formData.paymentMethod === method.id ? "scale-110" : ""} transition-transform duration-300 ${method.bgColor || ""} rounded-full p-2`}
                    >
                      {method.icon}
                    </div>
                    <span className='text-xs text-center font-medium text-gray-700'>
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Card Details */}
              {formData.paymentMethod === "debit-credit" && (
                <div className='space-y-4 animate-fade-in-up'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Name on Card
                    </label>
                    <input
                      type='text'
                      name='cardName'
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Card Number
                    </label>
                    <input
                      type='text'
                      name='cardNumber'
                      placeholder='xxxx xxxx xxxx xxxx'
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={19}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Expire Date
                      </label>
                      <input
                        type='text'
                        name='expiryDate'
                        placeholder='DD/YY'
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        maxLength={5}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>CVC</label>
                      <input
                        type='text'
                        name='cvc'
                        placeholder='xxx'
                        value={formData.cvc}
                        onChange={handleInputChange}
                        maxLength={3}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div
              className='bg-white rounded-xl shadow-md p-6 sm:p-8 animate-fade-in'
              style={{ animationDelay: "200ms" }}
            >
              <h2 className='text-xl font-bold text-[#074079] mb-6'>Additional Information</h2>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Order Notes <span className='text-gray-400'>(Optional)</span>
                </label>
                <textarea
                  name='orderNotes'
                  rows={5}
                  placeholder='Notes about your order, e.g. special notes for delivery'
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200 resize-none'
                />
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className='lg:col-span-1'>
            <div
              className='bg-white rounded-xl shadow-lg p-6 sticky top-8 animate-fade-in'
              style={{ animationDelay: "300ms" }}
            >
              <h2 className='text-xl font-bold text-[#074079] mb-6'>Order Summary</h2>

              {/* Order Items */}
              <div className='space-y-4 mb-6'>
                {orderItems.map(item => (
                  <div
                    key={item.id}
                    className='flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200'
                  >
                    <Image
                      width={100}
                      height={100}
                      src={item.image}
                      alt={item.name}
                      className='w-16 h-16 object-cover rounded-lg'
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm text-gray-800 line-clamp-2 mb-1'>{item.name}</p>
                      <p className='text-sm text-gray-600'>
                        {item.quantity} x{" "}
                        <span className='text-[#DA7C36] font-semibold'>${item.price}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className='space-y-3 border-t border-gray-200 pt-4'>
                <div className='flex justify-between text-gray-700'>
                  <span>Sub-total</span>
                  <span className='font-semibold'>${subTotal}</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Shipping</span>
                  <span className='font-semibold text-green-600'>Free</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Discount</span>
                  <span className='font-semibold'>${discount}</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Tax</span>
                  <span className='font-semibold'>${tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-lg font-bold text-[#074079] pt-3 border-t border-gray-200'>
                  <span>Total</span>
                  <span className='text-[#DA7C36]'>${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleSubmit}
                className='w-full mt-6 py-4 bg-gradient-to-r from-[#DA7C36] to-[#d15100] text-white rounded-lg font-bold text-base hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2'
              >
                PLACE ORDER
                <ArrowRight className='w-5 h-5' />
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
