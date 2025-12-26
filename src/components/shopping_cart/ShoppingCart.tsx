"use client";
import { ArrowLeft, Minus, Plus, ShoppingCart, Tag, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Python Mega Course: Build 10 Real World Applications",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
      price: 37.99,
      originalPrice: 49.99,
      quantity: 1,
    },
    {
      id: 2,
      title: "The Python Mega Course: Build 10 Real World Applications",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop",
      price: 37.99,
      originalPrice: 49.99,
      quantity: 1,
    },
    {
      id: 3,
      title: "The Python Mega Course: Build 10 Real World Applications",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
      price: 37.99,
      originalPrice: 49.99,
      quantity: 1,
    },
  ]);

  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50'>
      {/* Header */}
      <header className='bg-white shadow-sm sticky top-0 z-50 animate-fade-in'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center gap-3'>
            <ShoppingCart className='w-6 h-6 text-[#DA7C36]' />
            <div>
              <h1 className='text-2xl font-bold text-[#074079]'>Shopping Cart</h1>
              <p className='text-sm text-gray-500'>Home / Shopping Cart</p>
            </div>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-6 animate-slide-down'>
          <h2 className='text-xl font-semibold text-[#074079] mb-2'>
            Shopping Cart ({cartItems.length})
          </h2>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items Section */}
          <div className='lg:col-span-2 space-y-4'>
            {/* Table Header - Desktop Only */}
            <div className='hidden md:grid md:grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-600'>
              <div className='col-span-6'>PRODUCTS</div>
              <div className='col-span-2 text-center'>PRICE</div>
              <div className='col-span-2 text-center'>QUANTITY</div>
              <div className='col-span-2 text-center'>SUBTOTAL</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 animate-fade-in-up'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className='grid grid-cols-1 md:grid-cols-12 gap-4 items-center'>
                  {/* Product Info */}
                  <div className='col-span-1 md:col-span-6 flex gap-4'>
                    <button
                      onClick={() => removeItem(item.id)}
                      className='text-gray-400 hover:text-red-500 transition-colors duration-200 self-start'
                      aria-label='Remove item'
                    >
                      <X className='w-5 h-5' />
                    </button>
                    <Image
                      width={80}
                      height={80}
                      src={item.image}
                      alt={item.title}
                      className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg'
                    />
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-sm font-medium text-[#074079] line-clamp-2'>
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className='col-span-1 md:col-span-2 flex md:justify-center items-center gap-2'>
                    <span className='md:hidden text-sm text-gray-600 font-medium'>Price:</span>
                    <div className='flex flex-col items-start md:items-center'>
                      <span className='text-[#DA7C36] font-bold text-base sm:text-lg'>
                        ${item.price.toFixed(2)}
                      </span>
                      <span className='text-gray-400 line-through text-xs sm:text-sm'>
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className='col-span-1 md:col-span-2 flex md:justify-center items-center gap-2'>
                    <span className='md:hidden text-sm text-gray-600 font-medium'>Quantity:</span>
                    <div className='flex items-center gap-2 bg-gray-100 rounded-lg p-1'>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className='w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors duration-200'
                        aria-label='Decrease quantity'
                      >
                        <Minus className='w-4 h-4 text-gray-600' />
                      </button>
                      <span className='w-8 text-center font-medium text-[#074079]'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className='w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors duration-200'
                        aria-label='Increase quantity'
                      >
                        <Plus className='w-4 h-4 text-gray-600' />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className='col-span-1 md:col-span-2 flex md:justify-center items-center gap-2'>
                    <span className='md:hidden text-sm text-gray-600 font-medium'>Subtotal:</span>
                    <span className='text-[#074079] font-bold text-base sm:text-lg'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in'>
              <button className='flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#DA7C36] text-[#DA7C36] rounded-lg hover:bg-[#DA7C36] hover:text-white transition-all duration-300 font-medium'>
                <ArrowLeft className='w-5 h-5' />
                RETURN TO SHOP
              </button>
              <button className='flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium'>
                UPDATE CART
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div
            className='lg:col-span-1 animate-fade-in-up'
            style={{ animationDelay: "300ms" }}
          >
            <div className='bg-white rounded-xl shadow-lg p-6 sticky top-24 space-y-6'>
              {/* Coupon Code */}
              <div className='space-y-3'>
                <label className='text-sm font-medium text-[#074079] flex items-center gap-2'>
                  <Tag className='w-4 h-4' />
                  Apply coupon code
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder='Coupon code'
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA7C36] focus:border-transparent transition-all duration-200'
                  />
                  <button className='px-6 py-2 bg-[#074079] text-white rounded-lg hover:bg-[#053055] transition-colors duration-300 font-medium'>
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className='space-y-4 border-t border-gray-200 pt-4'>
                <div className='flex justify-between text-gray-700'>
                  <span>Subtotal</span>
                  <span className='font-semibold'>${subtotal.toFixed(2)} USD</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Coupon Discount</span>
                  <span className='font-semibold text-green-600'>5%</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Tax</span>
                  <span className='font-semibold'>${tax.toFixed(2)} USD</span>
                </div>
                <div className='flex justify-between text-lg font-bold text-[#074079] pt-4 border-t border-gray-200'>
                  <span>Total</span>
                  <span className='text-[#DA7C36]'>${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className='w-full py-4 bg-gradient-to-r from-[#DA7C36] to-[#d15100] text-white rounded-lg font-bold text-base hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2'>
                Proceed to Checkout
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}
