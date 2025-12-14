'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  BookmarkIcon,
  ShareIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  AdjustmentsHorizontalIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface ReaderControlsProps {
  fontSize: 'small' | 'medium' | 'large';
  onFontSizeChange: (size: 'small' | 'medium' | 'large') => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
  onShare: () => void;
}

const ReaderControls = ({
  fontSize,
  onFontSizeChange,
  isAudioPlaying,
  onToggleAudio,
  onBookmark,
  isBookmarked,
  onShare
}: ReaderControlsProps) => {
  const fontSizeOptions = [
    { value: 'small', label: 'Small', class: 'text-sm' },
    { value: 'medium', label: 'Medium', class: 'text-base' },
    { value: 'large', label: 'Large', class: 'text-lg' },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      {/* Audio Control */}
      <button
        onClick={onToggleAudio}
        className={`p-2 rounded-lg transition-all duration-250 ${
          isAudioPlaying
            ? 'bg-amber text-white'
            : 'text-charcoal/60 hover:text-amber hover:bg-amber/10'
        }`}
        title={isAudioPlaying ? 'Pause Audio' : 'Play Audio'}
      >
        {isAudioPlaying ? (
          <SpeakerWaveIcon className="w-5 h-5" />
        ) : (
          <SpeakerXMarkIcon className="w-5 h-5" />
        )}
      </button>

      {/* Bookmark */}
      <button
        onClick={onBookmark}
        className={`p-2 rounded-lg transition-all duration-250 ${
          isBookmarked
            ? 'bg-amber text-white'
            : 'text-charcoal/60 hover:text-amber hover:bg-amber/10'
        }`}
        title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      >
        {isBookmarked ? (
          <HeartSolidIcon className="w-5 h-5" />
        ) : (
          <BookmarkIcon className="w-5 h-5" />
        )}
      </button>

      {/* Share */}
      <button
        onClick={onShare}
        className="p-2 rounded-lg text-charcoal/60 hover:text-amber hover:bg-amber/10 transition-all duration-250"
        title="Share Story"
      >
        <ShareIcon className="w-5 h-5" />
      </button>

      {/* Settings Menu */}
      <Menu as="div" className="relative">
        <Menu.Button className="p-2 rounded-lg text-charcoal/60 hover:text-amber hover:bg-amber/10 transition-all duration-250">
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
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
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Font Size
                </label>
                <div className="space-y-2">
                  {fontSizeOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => onFontSizeChange(option.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        fontSize === option.value
                          ? 'bg-amber text-white'
                          : 'text-charcoal hover:bg-amber/10'
                      }`}
                    >
                      <span className={option.class}>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-amber/20 pt-4">
                <button
                  onClick={onShare}
                  className="w-full text-left px-3 py-2 text-charcoal hover:bg-amber/10 rounded-lg transition-colors"
                >
                  Share Story
                </button>
                <button
                  onClick={onBookmark}
                  className="w-full text-left px-3 py-2 text-charcoal hover:bg-amber/10 rounded-lg transition-colors"
                >
                  {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                </button>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Mobile Menu */}
      <Menu as="div" className="relative md:hidden">
        <Menu.Button className="p-2 rounded-lg text-charcoal/60 hover:text-amber hover:bg-amber/10 transition-all duration-250">
          <EllipsisVerticalIcon className="w-5 h-5" />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="p-4 space-y-2">
              <Menu.Item>
                <button
                  onClick={onToggleAudio}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-charcoal hover:bg-amber/10 rounded-lg transition-colors"
                >
                  {isAudioPlaying ? (
                    <SpeakerWaveIcon className="w-5 h-5" />
                  ) : (
                    <SpeakerXMarkIcon className="w-5 h-5" />
                  )}
                  {isAudioPlaying ? 'Pause Audio' : 'Play Audio'}
                </button>
              </Menu.Item>

              <Menu.Item>
                <button
                  onClick={onBookmark}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-charcoal hover:bg-amber/10 rounded-lg transition-colors"
                >
                  <BookmarkIcon className="w-5 h-5" />
                  {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                </button>
              </Menu.Item>

              <Menu.Item>
                <button
                  onClick={onShare}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-charcoal hover:bg-amber/10 rounded-lg transition-colors"
                >
                  <ShareIcon className="w-5 h-5" />
                  Share Story
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ReaderControls;