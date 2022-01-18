import { CommonCardsSchemaExtender } from '../CommonAssets/schema';

const ColoredCardsSchemaExtender = (schema, data, intl) => {
  const Common = CommonCardsSchemaExtender({ data, schema, intl });
  const imageCardFields = schema.properties.cards.schema.fieldsets[0].fields;

  Common.properties.slider = {
    title: 'Activate slider',
    type: 'boolean',
    default: false,
  };

  Common.properties.slides_to_show = {
    title: 'Cards to show',
    type: 'number',
    description: 'Number of cards to show at a time.',
    default: '3',
  };

  Common.fieldsets[0].fields.push('slider');
  Common.fieldsets[0].fields.push('slides_to_show');
  imageCardFields.splice(imageCardFields.indexOf('copyright'), 1);

  return {
    ...schema,
    ...Common,
    properties: { ...schema.properties, ...Common.properties },
    fieldsets: [...schema.fieldsets, ...Common.fieldsets],
  };
};

export default ColoredCardsSchemaExtender;
