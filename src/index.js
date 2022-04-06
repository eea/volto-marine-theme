import React from 'react';
import { HeroSectionView, FullwidthView } from './components';
import installAppExtras from './components/theme/AppExtras';
import installMsfdDataExplorerBlock from './components/Blocks/MsfdDataExplorerBlock';
import { breadcrumb, localnavigation } from './reducers';
import customBlockTemplates from '@eeacms/volto-marine-theme/components/Blocks/CustomBlockTemplates/customBlockTemplates';
import TextAlignWidget from './components/Widgets/TextAlign';
import './slate-styles.less';

const available_colors = [
  '#ffffff',
  '#f7f3ef',
  '#e3edf7',
  '#002d54',
  '#59d3ff',
  '#2dd2b7',
  '#1271e1',
  '#826A6A',
  '#FAD0C3',
  '#F3E2AB',
  '#C1E1C5',
  '#BEDADC',
  '#BED3F3',
  '#000000',
];

const applyConfig = (config) => {
  // config.views.contentTypesViews = {
  //   ...config.views.contentTypesViews,
  // };

  config.views.layoutViews = {
    ...config.views.layoutViews,
    document_view: HeroSectionView,
    herosection_view: HeroSectionView,
    fullwidth_view: FullwidthView,
  };

  config.addonReducers = {
    ...(config.addonReducers || {}),
    breadcrumb,
    localnavigation,
  };

  config.widgets.widget.text_align = TextAlignWidget;

  config.blocks.groupBlocksOrder = [
    ...config.blocks.groupBlocksOrder,
    { id: 'marine_addons', title: 'Marine' },
  ];

  config.blocks = {
    ...config.blocks,
    blocksConfig: { ...customBlockTemplates(config) },
  };

  // on home contextNavigation should return false
  config.blocks.blocksConfig.contextNavigation = {
    ...config.blocks.blocksConfig.contextNavigation,
    blockHasValue: (data) => {
      return data.pathname !== '/';
    },
  };

  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '/marine',
      GET_CONTENT: ['object_provides'],
    },
    {
      match: '/marine-new',
      GET_CONTENT: ['object_provides'],
    },
  ];

  config.settings.navDepth = 3;

  config.settings.available_colors = available_colors;

  config.settings.externalRoutes = [
    ...(config.settings.externalRoutes || []),
    ...(config.settings.prefixPath
      ? [
          {
            match: {
              path: /\/$/,
              exact: true,
              strict: true,
            },

            url(payload) {
              return payload.location.pathname;
            },
          },
        ]
      : []),
  ];

  config.settings.externalRoutes.push(
    {
      match: {
        path: '/(.*)marine(-new)?/assessment-module(.*)',
        exact: false,
        strict: false,
      },
      url(payload) {
        return payload.location.pathname;
      },
    },
    {
      match: {
        path:
          '/(.*)marine(-new)?/countries-and-regional-seas/country-profiles(.*)',
        exact: false,
        strict: false,
      },
      url(payload) {
        return payload.location.pathname;
      },
    },
  );

  config.settings.pluggableStyles = [
    ...(config.settings.pluggableStyles || []),
    {
      id: 'uiContainer',
      title: 'Container',
      viewComponent: (props) => {
        return <div className="ui container">{props.children}</div>;
      },
    },
  ];

  config.settings.slate.styleMenu = config.settings.slate.styleMenu || {};
  config.settings.slate.styleMenu.inlineStyles = [
    ...(config.settings.slate.styleMenu?.inlineStyles || []),
    { cssClass: 'h1', label: 'H1 36px' },
    { cssClass: 'h2', label: 'H2 30px' },
    { cssClass: 'h3', label: 'H3 24px' },
    { cssClass: 'h4', label: 'H4 18px' },
    { cssClass: 'h5', label: 'H5 14px' },
    { cssClass: 'p-text', label: 'Paragraph 18px' },
    { cssClass: 'poppins-regular', label: 'Poppins Regular' },
    { cssClass: 'poppins-light', label: 'Poppins Light' },
    { cssClass: 'poppins-bold', label: 'Poppins Bold' },
  ];

  const final = [installAppExtras, installMsfdDataExplorerBlock].reduce(
    (acc, apply) => apply(acc),
    config,
  );

  return final;
};

export default applyConfig;
