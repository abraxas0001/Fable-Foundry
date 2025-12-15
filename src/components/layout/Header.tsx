'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from '../ui/Button';
import AuthModal from '../auth/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  const { user, userProfile, signOut, loading } = useAuth();

  const navigation = [
    { name: 'Library', href: '/library' },
    { name: 'Narrators', href: '/narrators' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 sticky top-0 z-50 shadow-modern-sm">
      <nav className="container-modern">
        <div className="flex justify-between items-center h-16">
          {/* Modern Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-modern-primary rounded-2xl flex items-center justify-center shadow-modern group-hover:shadow-modern-md transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-['Space_Grotesk'] text-xl font-bold text-neutral-900 group-hover:text-gradient-modern transition-all duration-300">
              FableFoundry
            </span>
          </Link>

          {/* Modern Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-600 hover:text-neutral-900 font-medium px-4 py-2 rounded-xl hover:bg-neutral-100 transition-all duration-200 focus-modern relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-modern-primary group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </Link>
            ))}
            {loading ? (
              <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
            ) : user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 transition-all duration-200 group">
                  <div className="w-9 h-9 bg-gradient-modern-primary rounded-xl flex items-center justify-center shadow-modern group-hover:shadow-modern-md transition-all duration-200">
                    {userProfile?.communityProfile.avatar ? (
                      <img
                        src={userProfile.communityProfile.avatar}
                        alt="Profile"
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <UserIcon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {userProfile?.communityProfile.displayName || 'User'}
                  </span>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-modern-lg border border-neutral-200/50 focus:outline-none z-10 overflow-hidden">
                    <div className="p-2">
                      <Menu.Item>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 rounded-xl transition-all duration-200"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs">📊</span>
                          </div>
                          Dashboard
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          href="/bookmarks"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 rounded-xl transition-all duration-200"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-accent-pink to-primary-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs">❤️</span>
                          </div>
                          Bookmarks
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          href="/settings"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 rounded-xl transition-all duration-200"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-accent-green to-accent-blue rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs">⚙️</span>
                          </div>
                          Settings
                        </Link>
                      </Menu.Item>
                      <div className="border-t border-neutral-200 my-2" />
                      <Menu.Item>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs">👋</span>
                          </div>
                          Sign Out
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="text-neutral-600 hover:text-neutral-900 font-medium px-4 py-2 rounded-xl hover:bg-neutral-100 transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="btn-modern-primary text-sm px-6 py-2.5"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Modern Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 p-2.5 rounded-xl transition-all duration-200 focus-modern"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber/20">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-body hover:text-amber transition-colors duration-250 focus-ring rounded-md px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 space-y-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block text-body hover:text-amber transition-colors duration-250 focus-ring rounded-md px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-body hover:text-amber transition-colors duration-250 focus-ring rounded-md px-2 py-1"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        openAuthModal('signin');
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        openAuthModal('signup');
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </header>
  );
};

export default Header;