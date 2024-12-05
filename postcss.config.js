const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./public/**/*.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.css'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss, // Add PurgeCSS to the PostCSS plugins
  ],
};

