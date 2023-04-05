import React from 'react';
import {
  HeroSectionView,
  FullwidthView,
  DatabaseItemView,
  MetadataListingView,
  SimpleListingView,
} from './components';
// import installAppExtras from './components/theme/AppExtras';
import HomePageView from '@eeacms/volto-eea-website-theme/components/theme/Homepage/HomePageView';
import HomePageInverseView from '@eeacms/volto-eea-website-theme/components/theme/Homepage/HomePageInverseView';

import installMsfdDataExplorerBlock from './components/Blocks/MsfdDataExplorerBlock';
import { breadcrumb, localnavigation } from './reducers';
import customBlockTemplates from '@eeacms/volto-marine-theme/components/Blocks/CustomBlockTemplates/customBlockTemplates';
import TextAlignWidget from './components/Widgets/TextAlign';
import './slate-styles.less';

import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';
import linkSVG from '@plone/volto/icons/link.svg';
import { makeInlineElementPlugin } from '@plone/volto-slate/elementEditor';
import { LINK } from '@plone/volto-slate/constants';
import { LinkElement } from '@plone/volto-slate/editor/plugins/AdvancedLink/render';
import { withLink } from '@plone/volto-slate/editor/plugins/AdvancedLink/extensions';
import { linkDeserializer } from '@plone/volto-slate/editor/plugins/AdvancedLink/deserialize';
import LinkEditSchema from '@plone/volto-slate/editor/plugins/AdvancedLink/schema';

import { defineMessages } from 'react-intl'; // , defineMessages

import marineLogo from '@eeacms/volto-marine-theme/static/marine_logo.svg';
import marineLogoWhite from '@eeacms/volto-marine-theme/static/marine_logo_white.svg';
import eeaWhiteLogo from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/logo/eea-logo-white.svg';
import europeanComissionLogo from '@eeacms/volto-marine-theme/static/ec_logo_white.svg';

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

const messages = defineMessages({
  edit: {
    id: 'Edit link',
    defaultMessage: 'Edit link',
  },
  delete: {
    id: 'Remove link',
    defaultMessage: 'Remove link',
  },
  document_view: {
    id: 'Document View',
    defaultMessage: 'Document View',
  },
  herosection_view: {
    id: 'Hero Section View',
    defaultMessage: 'Hero Section View',
  },
  fullwidth_view: {
    id: 'Full Width View',
    defaultMessage: 'Full Width View',
  },
});

const applyConfig = (config) => {
  config.views.layoutViews = {
    ...config.views.layoutViews,
    // document_view: HeroSectionView,
    // herosection_view: HeroSectionView,
    // fullwidth_view: FullwidthView,
  };
  config.views.layoutViewsNamesMapping = {
    ...(config.views.layoutViewsNamesMapping || {}),
    document_view: 'Document View',
    // herosection_view: 'Hero Section View',
    // fullwidth_view: 'Full Width View',
  };
  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    // Folder: HomePageInverseView,
    // Document: HeroSectionView,
    dashboard: DatabaseItemView,
    dataset: DatabaseItemView,
    database: DatabaseItemView,
    publication_report: DatabaseItemView,
    indicator: DatabaseItemView,
    briefing: DatabaseItemView,
    map_interactive: DatabaseItemView,
  };

  config.addonReducers = {
    ...(config.addonReducers || {}),
    breadcrumb,
    localnavigation,
  };

  config.widgets.widget.text_align = TextAlignWidget;
  config.widgets.id.theme = TokenWidget;

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
  config.blocks.blocksConfig.listing = {
    ...config.blocks.blocksConfig.listing,
    variations: [
      ...config.blocks.blocksConfig.listing.variations,
      {
        id: 'metadata',
        title: 'Metadata Listing',
        template: MetadataListingView,
        isDefault: false,
      },
      {
        id: 'simple',
        title: 'Simple Listing',
        template: SimpleListingView,
        isDefault: false,
      },
    ],
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
    {
      match: {
        path:
          '/(.*)marine(-new)?/policy-and-reporting/msfd-reports-and-assessments(.*)',
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
          '/(.*)marine(-new)?/policy-and-reporting/reports-and-assessments(.*)',
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
          '/(.*)marine(-new)?/policy-and-reporting/assessment-by-country(.*)',
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
          '/(.*)marine(-new)?/policy-and-reporting/assessment-by-region(.*)',
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

  // EEA customizations
  config.settings.eea.websiteTitle = 'Wise - Marine';
  config.settings.eea = {
    ...(config.settings.eea || {}),
    headerOpts: {
      ...(config.settings.eea?.headerOpts || {}),
      logo: marineLogo,
      logoWhite: marineLogoWhite,
    },
    footerOpts: {
      ...(config.settings.eea?.footerOpts || {}),
      description:
        'WISE - Marine is a gateway to information on European marine issues in support of ecosystem based management and ocean governance',
      managedBy: [
        {
          link: 'https://www.eea.europa.eu/',
          src: eeaWhiteLogo,
          alt: 'EEA Logo',
          className: 'site logo',
          columnSize: {
            mobile: 6,
            tablet: 12,
            computer: 4,
          },
        },
        {
          link: 'https://commission.europa.eu/',
          src: europeanComissionLogo,
          alt: 'European Commission Logo',
          className: 'ec logo',
          columnSize: {
            mobile: 6,
            tablet: 12,
            computer: 4,
          },
        },
      ],
      social: [],
      actions: [
        {
          link: '/sitemap',
          title: 'Sitemap',
        },
        {
          link: '/#legal-notice',
          title: 'Privacy',
        },
        {
          link: '/marine/login',
          title: 'CMS Login',
        },
      ],

      contacts: [
        {
          icon: 'comment outline',
          text: 'About',
          link: '/marine/wise-marine',
          children: [],
        },
        {
          icon: 'comment outline',
          text: 'Contact',
          link: 'mailto:WISE@eea.europa.eu',
        },
      ],
    },
  };

  //advancedlink is currently not working properly/not recognized in fise, so we add it to config manually
  const { slate } = config.settings;

  slate.toolbarButtons = [...(slate.toolbarButtons || []), LINK];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    LINK,
  ];

  slate.htmlTagsToSlate.A = linkDeserializer;

  const opts = {
    title: 'Link',
    pluginId: LINK,
    elementType: LINK,
    element: LinkElement,
    isInlineElement: true,
    editSchema: LinkEditSchema,
    extensions: [withLink],
    hasValue: (formData) => !!formData.link,
    toolbarButtonIcon: linkSVG,
    messages,
  };

  const [installLinkEditor] = makeInlineElementPlugin(opts);
  config = installLinkEditor(config);

  const final = [installMsfdDataExplorerBlock].reduce(
    (acc, apply) => apply(acc),
    config,
  );

  return final;
};

export default applyConfig;
