module.exports = {
  '{apps,libs}/**/*.{ts,tsx,js,jsx}': (files) => {
    return `nx affected --target=lint --files=${files.join(',')}`;
  },
  '{apps,libs}/**/*.{ts,tsx,js,jsx,json,md,html,css,scss}': [
    'prettier --write',
  ],
};

