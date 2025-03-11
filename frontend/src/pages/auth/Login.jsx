import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Sparkles, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const {login}= useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await login(formData);
      toast.success("Logged in successfully");
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to login. Please try again.');
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

          {/* Welcome Back Text */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-600">Sign in to your account to continue managing your events.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Password</label>
                <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Create one
            </a>
          </p>

          {/* Alternative Login Options */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                <img src="/api/placeholder/20/20" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                <img src="/api/placeholder/20/20" alt="GitHub" className="w-5 h-5" />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Security Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 p-12 items-center justify-center">
        <div className="max-w-md text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <Lock className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Secure Authentication</h2>
            <p className="text-white/80">Your security is our top priority. We use industry-leading encryption to protect your data.</p>
          </div>

          {/* Security Features */}
          <div className="space-y-6">
            {[
              "Two-factor authentication support",
              "End-to-end encryption",
              "Regular security audits",
              "GDPR compliant data handling"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight size={16} className="text-white" />
                </div>
                <p className="text-white/90">{feature}</p>
              </div>
            ))}
          </div>

          {/* Security Badges */}
          <div className="mt-12">
            <p className="text-white/80 mb-4">Protected by industry leaders</p>
            <div className="flex gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;