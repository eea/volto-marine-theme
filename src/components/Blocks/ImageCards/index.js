import PlainCardsView from './PlainCards/PlainCardsView';
import PlainCardsSchemaExtender from './PlainCards/schema';

import ColoredCardsView from './ColoredCards/ColoredCardsView';
import ColoredCardsSchemaExtender from './ColoredCards/schema';

export default (config) => {
  config.blocks.blocksConfig.imagecards = {
    sidebarTab: 1,
    ...config.blocks.blocksConfig.imagecards,
    display_types: {
      ...config.blocks.blocksConfig.imagecards?.display_types,
    },
    blockRenderers: {
      ...config.blocks.blocksConfig.imagecards?.blockRenderers,
      plain_cards: {
        title: 'Plain cards',
        view: PlainCardsView,
        schemaExtender: PlainCardsSchemaExtender,
      },
      colored_cards: {
        title: 'Colored cards',
        view: ColoredCardsView,
        schemaExtender: ColoredCardsSchemaExtender,
      },
    },
  };

  return config;
};
