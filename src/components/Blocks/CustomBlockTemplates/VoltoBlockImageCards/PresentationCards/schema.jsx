import { CommonCardsSchemaExtender } from '../CommonAssets/schema';

const PresentationCardsSchemaExtender = (schema, data, intl) => {
  const Common = CommonCardsSchemaExtender({ data, schema, intl });
  const imageCardFields = schema.properties.cards.schema.fieldsets[0].fields;

  schema.properties.cards.schema.properties.source = {
    widget: 'object_browser',
    mode: 'link',
    title: 'Source',
    description: 'Choose an existing content as source for this card',
  };

  imageCardFields.push('source');
  imageCardFields.splice(imageCardFields.indexOf('copyright'), 1);

  return {
    ...schema,
    ...Common,
    properties: { ...schema.properties, ...Common.properties },
    fieldsets: [...schema.fieldsets, ...Common.fieldsets],
  };
};

export default PresentationCardsSchemaExtender;
