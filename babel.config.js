module.exports = function (api) {
  api.cache(true);
  const presets = ['razzle/babel'];
  const plugins = [
    [
      ['@babel/plugin-proposal-nullish-coalescing-operator'],
      ['@babel/plugin-proposal-optional-chaining'],
      'react-intl', // React Intl extractor, required for the whole i18n infrastructure to work
      {
        messagesDir: './build/messages/',
      },
    ],
  ];

  return {
    plugins,
    presets,
  };
};
