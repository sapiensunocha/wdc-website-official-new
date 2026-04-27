/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        // ─── PRIMARY BRAND ────────────────────────────────────────────────
        // OCHA Blue — per UNOCHA brand guidelines.
        primary: {
          DEFAULT: '#009EDB',   // OCHA Blue — buttons, links, active states
          dark:    '#0072BC',   // Hover / pressed
          light:   '#4DC0E8',   // Tints, subtle accents
          muted:   '#E8F5FC',   // Light wash backgrounds, badges
        },

        // ─── CRISIS STATUS SYSTEM ─────────────────────────────────────────
        // Severity indicators for a humanitarian crisis platform.
        status: {
          critical: { DEFAULT: '#CC2936', bg: '#FDECEA', border: '#F4A4A8' },
          warning:  { DEFAULT: '#E87722', bg: '#FEF3E2', border: '#F7CB95' },
          stable:   { DEFAULT: '#1A7644', bg: '#E8F5EE', border: '#8FD0A9' },
          info:     { DEFAULT: '#418FDE', bg: '#EBF4FB', border: '#85BCED' },
        },

        // ─── SURFACES (light theme) ───────────────────────────────────────
        surface: {
          page:    '#FFFFFF',              // Page background
          raised:  '#F8FAFB',              // Cards, elevated panels
          subtle:  '#F1F5F9',              // Hover rows, alternating stripes
          overlay: 'rgba(13,31,45,0.85)',  // Modal / drawer backdrop
        },

        // ─── CONTENT / TEXT HIERARCHY ─────────────────────────────────────
        content: {
          primary:   '#0D1F2D',  // Headings, primary text
          secondary: '#475569',  // Body copy, descriptions
          tertiary:  '#94A3B8',  // Hints, timestamps, metadata
          disabled:  '#CBD5E1',  // Disabled states
          inverse:   '#FFFFFF',  // Text on dark surfaces
          link:      '#418FDE',  // Hyperlinks (= primary)
        },

        // ─── BORDERS ──────────────────────────────────────────────────────
        border: {
          DEFAULT: '#E2E8F0',  // Standard dividers and card edges
          strong:  '#CBD5E1',  // Emphasis borders
          focus:   '#418FDE',  // Input focus ring
        },

        // ─── DARK SURFACES ────────────────────────────────────────────────
        // Semantic aliases for the header, hero, and dark-section palette.
        // These will be retired in Phase 3 when those sections are rebuilt.
        dark: {
          DEFAULT:  '#001129',  // Deep navy page backgrounds      (≈ n-8)
          elevated: '#003D99',  // Raised cards on dark surfaces   (≈ n-7)
          border:   '#1A3A6E',  // Borders on dark surfaces
          text:     '#E6F7FF',  // Primary text on dark            (≈ n-1)
          subtext:  '#80C9FF',  // Muted text on dark              (≈ n-3)
          muted:    '#4DA6FF',  // Tertiary / icons on dark        (≈ n-4)
        },

        // ─── LEGACY (deprecated) ──────────────────────────────────────────
        // Kept for backward compatibility with the dark header/hero/homepage.
        // Do not use in new code. Will be removed in Phase 3.
        un: {
          blue:  '#418FDE',
          dark:  '#005b9f',
          light: '#85bced',
        },
        n: {
          1:  '#E6F7FF',
          2:  '#B3E0FF',
          3:  '#80C9FF',
          4:  '#4DA6FF',
          5:  '#267FFF',
          6:  '#0055FF',
          7:  '#003D99',
          8:  '#001129',
          9:  '#66B3CC',
          10: '#3385A6',
          11: '#004D66',
          12: '#002633',
          13: '#99CCFF',
        },
        // Neon accent palette — legacy template colors. Only remaining active
        // usages are in profile form borders. Will be removed in Phase 4.
        color: {
          1: '#6a92ff',
          2: '#FFC876',
          3: '#6fffc3',
          4: '#7ADB78',
          5: '#858DFF',
          6: '#98ffc6',
        },

      },

      fontFamily: {
        sans:    ["var(--font-open-sans)", ...fontFamily.sans],
        code:    "var(--font-code)",
        grotesk: "var(--font-grotesk)",
        sora:    ["var(--font-sora)", ...fontFamily.sans],
      },

      letterSpacing: {
        tagline: ".15em",
      },

      spacing: {
        0.25: "0.0625rem",
        7.5:  "1.875rem",
        15:   "3.75rem",
      },

      opacity: {
        15: ".15",
      },

      transitionDuration: {
        DEFAULT: "200ms",
      },

      transitionTimingFunction: {
        DEFAULT: "linear",
      },

      zIndex: {
        1: "1", 2: "2", 3: "3", 4: "4", 5: "5",
      },

      borderWidth: {
        DEFAULT: "0.0625rem",
      },

      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        // Used by Hero product frame. Retained for Phase 3 rebuild.
        "conic-gradient":  "conic-gradient(from 225deg,#FFC876,#79FFF7,#53a3ff,#98ffe5,#FFC876)",
        // NOTE: benefit-card-* removed. SVGs live in src/assets/benefits/ and
        // must be imported directly in JSX, not referenced via CSS url().
      },
    },
  },

  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({

        // ─── LAYOUT ───────────────────────────────────────────────────────
        ".container": {
          "@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]": {},
        },

        // ─── HEADINGS ─────────────────────────────────────────────────────
        ".h1": {
          "@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]": {},
        },
        ".h2": {
          "@apply text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight": {},
        },
        ".h3": {
          "@apply text-[2rem] leading-normal md:text-[2.5rem]": {},
        },
        ".h4": {
          "@apply text-[2rem] leading-normal": {},
        },
        ".h5": {
          "@apply text-2xl leading-normal": {},
        },
        ".h6": {
          "@apply font-semibold text-lg leading-8": {},
        },

        // ─── BODY TEXT ────────────────────────────────────────────────────
        ".body-1": {
          "@apply text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8": {},
        },
        ".body-2": {
          "@apply font-light text-[0.875rem] leading-6 md:text-base": {},
        },
        // Descriptive text below section headings and inside cards.
        ".body-3": {
          "@apply text-sm leading-relaxed md:text-base md:leading-relaxed": {},
        },
        ".caption": {
          "@apply text-sm": {},
        },

        // ─── TYPOGRAPHIC UTILITIES ────────────────────────────────────────
        ".tagline": {
          "@apply font-grotesk font-light text-xs tracking-tagline uppercase": {},
        },
        ".quote": {
          "@apply font-code text-lg leading-normal": {},
        },
        ".button": {
          "@apply font-code text-xs font-bold uppercase tracking-wider": {},
        },

      });

      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
      });
    }),
  ],
};
