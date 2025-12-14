import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // FableFoundry Color Palette
        parchment: "#FAF9F6", // Background / Base
        amber: "#D97742", // Primary Accent
        sienna: "#8C5A2E", // Secondary Accent
        golden: "#CFAE6B", // Highlight / Button Hover
        charcoal: "#3A3A3A", // Text / Icons
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // FableFoundry Typography
        'playfair': ['Playfair Display', 'serif'], // Headings
        'lora': ['Lora', 'serif'], // Body text
        'caveat': ['Caveat', 'cursive'], // Pull-quotes
        'inter': ['Inter', 'sans-serif'], // CTA buttons
      },
      fontSize: {
        'heading-lg': ['72px', { lineHeight: '1.1', fontWeight: '700' }],
        'heading-md': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'body': ['18px', { lineHeight: '1.5' }],
        'quote': ['30px', { lineHeight: '1.4', fontStyle: 'italic' }],
        'cta': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
      },
      animation: {
        'fade-in': 'fadeIn 250ms ease-out',
        'slide-up': 'slideUp 250ms ease-out',
        'scale-in': 'scaleIn 250ms ease-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
} satisfies Config;