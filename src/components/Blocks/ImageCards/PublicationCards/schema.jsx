import { CommonCardsSchemaExtender } from '../CommonAssets/schema';

const PublicationCardsSchemaExtender = (schema, data, intl) => {
  const Common = CommonCardsSchemaExtender({ data, schema, intl });
  const imageCardFields = schema.properties.cards.schema.fieldsets[0].fields;

  schema.properties.cards.schema.properties.source = {
    widget: 'object_browser',
    mode: 'link',
    title: 'Source',
    description: 'Choose an existing content as source for this card',
  };

  schema.properties.cards.schema.properties.publication_link = {
    title: 'Publication link',
  };

  imageCardFields.push('publication_link', 'source');
  imageCardFields.splice(imageCardFields.indexOf('copyright'), 1);

  return {
    ...schema,
    ...Common,
    properties: { ...schema.properties, ...Common.properties },
    fieldsets: [...schema.fieldsets, ...Common.fieldsets],
  };
};

export default PublicationCardsSchemaExtender;
