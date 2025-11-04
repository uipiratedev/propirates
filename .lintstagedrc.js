module.exports = {
  '{apps,libs}/**/*.{ts,tsx,js,jsx}': (files) => {
    return `nx affected --target=lint --files=${files.join(',')}`;
  },
  // Prettier disabled - uncomment below to re-enable
  // '{apps,libs}/**/*.{ts,tsx,js,jsx,json,md,html,css,scss}': [
  //   'prettier --write',
  // ],
};
