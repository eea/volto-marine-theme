import ColoredTabsView from './ColoredTabsView';

export { ColoredTabsView };

export default (config) => {
  config.blocks.blocksConfig.tabs_block = {
    ...(config.blocks.blocksConfig.tabs_block || {}),
    templates: {
      ...(config.blocks.blocksConfig.tabs_block?.templates || {}),
      colored_tabs: {
        ...config.blocks.blocksConfig.tabs_block.templates.default,
        title: 'Colored tabs',
        view: ColoredTabsView,
      },
    },
  };
  return config;
};
