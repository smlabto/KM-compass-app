module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Extend your theme as needed, for example:
      colors: {
        'primary': '#4338ca',
      },
    },
  },
  plugins: [
    // Uncomment the next line if using Flowbite components
    // require('flowbite/plugin'),
  ],
};
