import { CommonCardsSchemaExtender } from '../CommonAssets/schema';
import config from '@plone/volto/registry';

const ColoredCardsSchemaExtender = (schema, data, intl) => {
  const Common = CommonCardsSchemaExtender({ data, schema, intl });
  const imageCardFields = schema.properties.cards.schema.fieldsets[0].fields;

  schema.properties.cards.schema.properties.sub_title = {
    title: 'Subtitle',
  };

  Common.properties.slider = {
    title: 'Activate slider',
    type: 'boolean',
    default: false,
  };

  Common.properties.slides_to_show = {
    title: 'Cards to show',
    type: 'number',
    description: 'Number of cards to show in a slide at a time.',
    default: '3',
  };

  Common.properties.bg_color = {
    widget: 'style_simple_color',
    title: 'Cards background color',
    type: 'color',
    default: '#59d3ff',
    available_colors: config.settings.available_colors,
  };

  Common.fieldsets[0].fields.push('bg_color');
  Common.fieldsets[1].fields.push('slider', 'slides_to_show');
  imageCardFields.splice(imageCardFields.indexOf('copyright'), 1);
  imageCardFields.push('sub_title');

  return {
    ...schema,
    ...Common,
    properties: { ...schema.properties, ...Common.properties },
    fieldsets: [...schema.fieldsets, ...Common.fieldsets],
  };
};

export default ColoredCardsSchemaExtender;
