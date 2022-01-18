import { CommonCardsSchemaExtender } from '../CommonAssets/schema';

const PlainCardsSchemaExtender = (schema, data, intl) => {
  const Common = CommonCardsSchemaExtender({ data, schema, intl });
  const imageCardFields = schema.properties.cards.schema.fieldsets[0].fields;

  imageCardFields.splice(imageCardFields.indexOf('copyright'), 1);

  return {
    ...schema,
    ...Common,
    properties: { ...schema.properties, ...Common.properties },
    fieldsets: [...schema.fieldsets, ...Common.fieldsets],
  };
};

export default PlainCardsSchemaExtender;
