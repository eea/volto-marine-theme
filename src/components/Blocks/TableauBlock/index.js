import TableauView from './View';

export default (config) => {
  config.blocks.blocksConfig.tableau_block = {
    ...config.blocks.blocksConfig.tableau_block,
    view: TableauView,
  };
  return config;
};
