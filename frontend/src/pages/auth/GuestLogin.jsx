import React, { useState } from 'react';
import { ArrowRight, Sparkles, UserPlus } from 'lucide-react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

const GuestLogin = () => {
  const navigate = useNavigate();
  const { guestLogin } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await guestLogin(formData);
      toast.success("Logged in as guest");
      navigate('/');
    } catch (error) {
      toast.error('Failed to login as guest. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold">EventHub</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Continue as Guest</h1>
            <p className="text-gray-600">Access EventHub features without creating an account.</p>
          </div>

          {/* Guest Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                className="w-1/2 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <input
                type="text"
                className="w-1/2 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Email (Optional)</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="abcd@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">We'll only use this to save your event preferences</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 group"
            >
              Continue as Guest
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Login & Register Links */}
          <div className="mt-6 space-y-4">
            <p className="text-center text-gray-600">
              Want full access?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </p>
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Create an account
              </a>
            </p>
          </div>

          {/* Limitations Notice */}
          <div className="mt-8 p-4 bg-gray-100 rounded-xl">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <UserPlus size={16} className="text-blue-600" />
              Guest access limitations
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>View and attend public events</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Limited interaction with event hosts</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>No ability to create or manage events</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Section - Image & Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 p-12 items-center justify-center">
        <div className="max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6">Quick access to great events</h2>

          {/* Feature List */}
          <div className="space-y-6">
            {[
              "Browse upcoming events in your area",
              "No account setup required",
              "Access event details and information",
              "Join events as a guest attendee"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight size={16} className="text-white" />
                </div>
                <p className="text-white/90">{feature}</p>
              </div>
            ))}
          </div>

          {/* Upgrade CTA */}
          <div className="mt-12 p-6 bg-white/10 rounded-xl">
            <h3 className="text-lg font-medium mb-2">Want the full experience?</h3>
            <p className="text-white/80 mb-4">Create an account to unlock all features and create your own events.</p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 text-white bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              Create an account
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestLogin;