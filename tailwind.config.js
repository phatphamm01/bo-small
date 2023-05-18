//THIRD PARTY MODULES
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#57C5B6",
      },
      fontSize: {
        11: "calc(11rem / 16)",
        12: ["calc(12rem / 16)", { lineHeight: "calc(18rem / 16)" }],
        "12lig": ["calc(12rem / 16)", { lineHeight: "1.5", fontWeight: 300 }],
        14: ["calc(14rem / 16)", { lineHeight: "calc(22rem / 16)" }],
        "14lig": [
          "calc(14rem / 16)",
          { lineHeight: "calc(22rem / 16)", fontWeight: 300 },
        ],
        16: ["calc(16rem / 16)", { lineHeight: "calc(24rem / 16)" }],
        "16lig": [
          "calc(16rem / 16)",
          { lineHeight: "calc(24rem / 16)", fontWeight: 300 },
        ],
        "16ita": [
          "calc(16rem / 16)",
          { lineHeight: "calc(22rem / 16)", fontWeight: 400 },
        ],
        18: ["calc(18rem / 16)", { lineHeight: "calc(28rem / 16)" }],
        20: ["calc(20rem / 16)", { lineHeight: "calc(30rem / 16)" }],
        "20lig": [
          "calc(20rem / 16)",
          { lineHeight: "calc(30rem / 16)", fontWeight: 300 },
        ],
        "20ita": [
          "calc(20rem / 16)",
          { lineHeight: "calc(30rem / 16)", fontWeight: 400 },
        ],
        21: ["calc(21rem / 16)", { lineHeight: "calc(32rem / 16)" }],
        22: ["calc(22rem / 16)", { lineHeight: "1.5" }],
        24: ["calc(24rem / 16)", { lineHeight: "calc(36rem / 16)" }],
        28: ["calc(28rem / 16)", { lineHeight: "calc(36rem / 16)" }],
        30: ["calc(30rem / 16)", { lineHeight: "calc(38rem / 16)" }],
        32: ["calc(32rem / 16)", { lineHeight: "calc(40rem / 16)" }],
        36: ["calc(36rem / 16)", { lineHeight: "calc(42rem / 16)" }],
        38: ["calc(38rem / 16)", { lineHeight: "calc(44rem / 16)" }],
        48: ["calc(48rem / 16)", { lineHeight: "calc(60rem / 16)" }],
        60: ["calc(60rem / 16)", { lineHeight: "calc(80rem / 16)" }],
        64: ["calc(64rem / 16)", { lineHeight: "calc(80rem / 16)" }],
        72: ["calc(72rem / 16)", { lineHeight: "calc(92rem / 16)" }],
        80: ["calc(80rem / 16)", { lineHeight: "calc(100rem / 16)" }],
        82: ["calc(82rem / 16)", { lineHeight: "calc(100rem / 16)" }],
        96: ["calc(96rem / 16)", { lineHeight: "calc(104rem / 16)" }],
      },
      animation: {
        //radix
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        "slide-down": "slide-down 200ms ease-out",
        "slide-up": "slide-up 200ms ease-out",
        //effect increase width
        "increase-width": "increase-width var(--time) ease-out",
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        //effect increase width
        "increase-width": {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "var(--width)",
          },
        },
        //radix
        "slide-down": {
          "0%": {
            height: "0",
          },
          "100%": {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
          },
          "100%": {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addVariant, matchComponents, e }) {
      addUtilities({
        ".full-fledge": {
          "grid-column": "1 / -1 !important",
        },
      });
      addVariant("ow", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`ow${separator}${className}`)}`;
        });
      });

      matchComponents({
        "set-data": (data) => {
          const [key, value] = data.split("/");
          return [
            {
              [`--${key}`]: value,
            },
          ];
        },
      });
    }),
  ],
};

