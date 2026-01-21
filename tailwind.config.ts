import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#E53935", // Red Passion
                    dark: "#B71C1C",
                    light: "#FFCDD2",
                },
                secondary: {
                    DEFAULT: "#FFD700", // Gold accents
                },
                background: "#FFFFFF",
                text: {
                    DEFAULT: "#333333", // Dark Gray
                    light: "#757575",
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)'], // Will configure Inter in layout
            },
        },
    },
    plugins: [],
};
export default config;
