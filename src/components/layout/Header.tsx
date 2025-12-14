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
    <header className="bg-parchment/95 backdrop-blur-sm border-b border-amber/20 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-heading text-xl font-bold">FableFoundry</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-body hover:text-amber transition-colors duration-250 focus-ring rounded-md px-2 py-1"
              >
                {item.name}
              </Link>
            ))}
            {loading ? (
              <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
            ) : user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-2 p-2 rounded-lg hover:bg-amber/10 transition-colors">
                  <div className="w-8 h-8 bg-amber rounded-full flex items-center justify-center">
                    {userProfile?.communityProfile.avatar ? (
                      <img
                        src={userProfile.communityProfile.avatar}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-charcoal">
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
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="p-2">
                      <Menu.Item>
                        <Link
                          href="/dashboard"
                          className="block px-3 py-2 text-sm text-charcoal hover:bg-amber/10 rounded-lg transition-colors"
                        >
                          Dashboard
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          href="/bookmarks"
                          className="block px-3 py-2 text-sm text-charcoal hover:bg-amber/10 rounded-lg transition-colors"
                        >
                          Bookmarks
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          href="/settings"
                          className="block px-3 py-2 text-sm text-charcoal hover:bg-amber/10 rounded-lg transition-colors"
                        >
                          Settings
                        </Link>
                      </Menu.Item>
                      <div className="border-t border-amber/20 my-2" />
                      <Menu.Item>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-3 py-2 text-sm text-charcoal hover:bg-amber/10 rounded-lg transition-colors"
                        >
                          Sign Out
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => openAuthModal('signin')}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openAuthModal('signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-charcoal hover:text-amber focus-ring p-2 rounded-md"
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