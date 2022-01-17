import { CommonCardsSchemaExtender } from '../CommonAssets/schema';

const PublicationCardsSchemaExtender = (schema, data, intl) => {
  const Common = CommonCardsSchemaExtender({ data, schema, intl });

  schema.properties.cards.schema.properties.source = {
    widget: 'object_browser',
    mode: 'link',
    title: 'Source',
    description: 'Choose an existing content as source for this card',
  };

  schema.properties.cards.schema.properties.publication_link = {
    title: 'Publication link',
  };

  schema.properties.cards.schema.fieldsets[0].fields.unshift('source');
  schema.properties.cards.schema.fieldsets[0].fields.push('publication_link');

  return {
    ...schema,
    ...Common,
    properties: { ...schema.properties, ...Common.properties },
    fieldsets: [...schema.fieldsets, ...Common.fieldsets],
  };
};

export default PublicationCardsSchemaExtender;
