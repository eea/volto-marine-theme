import PlainCardsView from './PlainCards/PlainCardsView';
import PlainCardsSchemaExtender from './PlainCards/schema';
import ColoredCardsView from './ColoredCards/ColoredCardsView';
import ColoredCardsSchemaExtender from './ColoredCards/schema';
import PublicationCardsView from './PublicationCards/PublicationCardsView';
import PublicationCardsSchemaExtender from './PublicationCards/schema';

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
      presentation_cards: {
        title: 'Publication cards',
        view: PublicationCardsView,
        schemaExtender: PublicationCardsSchemaExtender,
      },
    },
  };

  return config;
};
