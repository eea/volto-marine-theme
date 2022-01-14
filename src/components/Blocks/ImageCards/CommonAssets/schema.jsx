export const CommonCardsSchemaExtender = ({ data, schema, intl }) => {
  return {
    fieldsets: [
      {
        id: 'style',
        title: 'Cards settings',
        fields: ['text_align', 'cards_per_row'],
      },
    ],
    properties: {
      text_align: {
        title: 'Text align',
        widget: 'text_align',
        default: 'left',
      },
      cards_per_row: {
        title: 'Cards per row',
        type: 'number',
        description:
          'A group of cards can set how many cards should exist in a row.',
      },
    },
  };
};
