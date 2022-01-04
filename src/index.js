import React from 'react';
import installAppExtras from './components/theme/AppExtras';

const applyConfig = (config) => {
  config.settings.navDepth = 3;

  // config.blocks.groupBlocksOrder = [
  //   ...config.blocks.groupBlocksOrder,
  //   { id: 'marine_addons', title: 'Marine' },
  // ];

  // on home contextNavigation should return false
  config.blocks.blocksConfig.contextNavigation = {
    ...config.blocks.blocksConfig.contextNavigation,
    blockHasValue: (data) => {
      return data.pathname !== '/';
    },
  };

  config.settings.externalRoutes = [
    ...(config.settings.externalRoutes || []),
    ...(config.settings.prefixPath
      ? [
          {
            match: {
              path: /\/$/,
              exact: true,
              strict: true,
            },

            url(payload) {
              return payload.location.pathname;
            },
          },
        ]
      : []),
  ];

  // Custom block styles
  config.settings.pluggableStyles = [
    ...(config.settings.pluggableStyles || []),
    {
      id: 'uiContainer',
      title: 'Container',
      viewComponent: (props) => {
        return <div className="ui container">{props.children}</div>;
      },
    },
  ];

  const final = [installAppExtras].reduce((acc, apply) => apply(acc), config);

  return final;
};

export default applyConfig;
