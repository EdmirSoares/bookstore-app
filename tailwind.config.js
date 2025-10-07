/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
    darkMode: 'class', // Enable class-based dark mode
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                // Light theme colors
                light: {
                    text: "#3B3535",
                    surfaceText: "#F3F2F2",
                    background: "#F3F2F2",
                    warning500: "#FF0000",
                    warning600: "#BD0A0A",
                    tint: "#2f95dc",
                    tabIconDefault: "#ccc",
                    tabIconSelected: "#2f95dc",
                    tabBarBackground: "#FFFFFF",
                    tabBarActiveBackgroundColor: "#E5E5E5",
                },
                // Dark theme colors
                dark: {
                    text: "#F3F2F2",
                    surfaceText: "#3B3535",
                    background: "#1F2936",
                    tabBarBackground: "#111111",
                    warning500: "#FF0000",
                    warning600: "#BD0A0A",
                    tint: "#2f95dc",
                    tabIconDefault: "#C4CCCC",
                    tabIconSelected: "#FF7832",
                    tabBarActiveBackgroundColor: "#1B1B1B",
                },
                // Legacy background color (keeping for compatibility)
                background: '#121212',
            },
        },
    },
    plugins: [],
};
