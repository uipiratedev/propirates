/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/src/**/*.{html,ts}',
    './libs/**/src/**/*.{html,ts}',
    './tailwind.config.js',
    './apps/**/src/styles.css',
    './apps/**/src/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        info: 'var(--color-info)',
        'border-badge': '#E5E5E5',
      },
    },
  },
  plugins: [],
};
