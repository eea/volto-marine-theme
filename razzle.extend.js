module.exports = {
  modifyWebpackConfig({ webpackConfig }) {
    const themeConfigPath = `${__dirname}/src/theme/theme.config`;
    webpackConfig.resolve.alias['../../theme.config$'] = themeConfigPath;
    webpackConfig.resolve.alias['../../theme.config'] = themeConfigPath;

    return webpackConfig;
  },
};
