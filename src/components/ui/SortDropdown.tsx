'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';

interface SortOption {
  value: string;
  label: string;
  order: 'asc' | 'desc';
}

const sortOptions: SortOption[] = [
  { value: 'newest', label: 'Newest First', order: 'desc' },
  { value: 'oldest', label: 'Oldest First', order: 'asc' },
  { value: 'popular', label: 'Most Popular', order: 'desc' },
  { value: 'rating', label: 'Highest Rated', order: 'desc' },
  { value: 'duration', label: 'Shortest First', order: 'asc' },
  { value: 'title', label: 'A-Z', order: 'asc' },
];

interface SortDropdownProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

const SortDropdown = ({ sortBy, sortOrder, onSortChange }: SortDropdownProps) => {
  const currentOption = sortOptions.find(
    option => option.value === sortBy && option.order === sortOrder
  ) || sortOptions[0];

  const handleChange = (option: SortOption) => {
    onSortChange(option.value, option.order);
  };

  return (
    <Listbox value={currentOption} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-3 pr-10 text-left border border-amber/30 focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent transition-all duration-250">
          <span className="block truncate text-charcoal">{currentOption.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-charcoal/40"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {sortOptions.map((option) => (
              <Listbox.Option
                key={`${option.value}-${option.order}`}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber/10 text-amber' : 'text-charcoal'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SortDropdown;