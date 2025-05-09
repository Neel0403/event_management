import React, { useEffect, useState } from 'react';
import { Sparkles, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  // console.log(user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user !== null) {
      console.log(user);
    }
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Features', href: '/features' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900">EventHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-6 mr-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-3">

              {user ? (
                <>
                  <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span className="font-medium">
                      {user ? `${user.firstName} ${` `} ${user.lastName}` : "Guest"}
                    </span>
                  </button>
                </>
              ) : (
                <a
                  href="/register"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign up
                </a>
              )}
              {user ?
                <button
                  onClick={async () => {
                    const isLoggedOut = await logout()
                    if (isLoggedOut)
                      navigate("/")
                  }}
                  className="px-3 py-2 text-white font-medium bg-red-500 hover:bg-red-600 transition-colors rounded-xl"
                >
                  Log out
                </button> : <a
                  href="/login"
                  className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
                >
                  Log in
                </a>}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="py-2 text-gray-600 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t flex flex-col space-y-3">
                <a
                  href="/login"
                  className="py-2 text-center text-gray-700 font-medium border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </a>
                <a
                  href="/register"
                  className="py-2 text-center bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;