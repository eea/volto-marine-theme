import {
  PlainCardsView,
  PlainCardsSchemaExtender,
  ColoredCardsView,
  ColoredCardsSchemaExtender,
  PublicationCardsView,
  PublicationCardsSchemaExtender,
  PresentationCardsView,
  PresentationCardsSchemaExtender,
} from '@eeacms/volto-marine-theme/components/Blocks/CustomBlockTemplates/VoltoBlockImageCards';
import { TableauView } from '@eeacms/volto-marine-theme/components/Blocks/CustomBlockTemplates/VoltoTableauBlock';
import { ColoredTabsView } from '@eeacms/volto-marine-theme/components/Blocks/CustomBlockTemplates/VoltoTabsBlock';

const customBlockTemplates = (config) => ({
  ...config.blocks.blocksConfig,
  imagecards: {
    sidebarTab: 1,
    ...config.blocks.blocksConfig.imagecards,
    display_types: {
      ...config.blocks.blocksConfig.imagecards?.display_types,
    },
    blockRenderers: {
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
      publication_cards: {
        title: 'Publication cards',
        view: PublicationCardsView,
        schemaExtender: PublicationCardsSchemaExtender,
      },
      presentation_cards: {
        title: 'Pesentation cards',
        view: PresentationCardsView,
        schemaExtender: PresentationCardsSchemaExtender,
      },
      ...config.blocks.blocksConfig.imagecards?.blockRenderers,
    },
  },

  tableau_block: {
    ...config.blocks.blocksConfig.tableau_block,
    view: TableauView,
  },

  tabs_block: {
    ...(config.blocks.blocksConfig.tabs_block || {}),
    templates: {
      ...(config.blocks.blocksConfig.tabs_block?.templates || {}),
      colored_tabs: {
        ...config.blocks.blocksConfig.tabs_block.templates.default,
        title: 'Colored tabs',
        view: ColoredTabsView,
      },
    },
  },
});
export default customBlockTemplates;
