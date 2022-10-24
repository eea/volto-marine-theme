module.exports = {
  modifyWebpackConfig({
    env: { target, dev },
    webpackConfig,
    webpackObject,
    options: {
      pluginOptions,
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
      webpackOptions, // the modified options that was used to configure webpack/ webpack loaders and plugins
    },
    paths,
  }) {
    const themeConfigPath = `${__dirname}/src/theme/theme.config`;
    webpackConfig.resolve.alias['../../theme.config$'] = themeConfigPath;
    webpackConfig.resolve.alias['../../theme.config'] = themeConfigPath;

    return webpackConfig;
  },
};
