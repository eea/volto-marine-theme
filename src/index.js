import React from 'react';
import {
  // HeroSectionView,
  // FullwidthView,
  DatabaseItemView,
  MetadataListingView,
  SimpleListingView,
} from './components';
// import installAppExtras from './components/theme/AppExtras';
// import HomePageView from '@eeacms/volto-eea-website-theme/components/theme/Homepage/HomePageView';
// import HomePageInverseView from '@eeacms/volto-eea-website-theme/components/theme/Homepage/HomePageInverseView';

import installMsfdDataExplorerBlock from './components/Blocks/MsfdDataExplorerBlock';
import { breadcrumb, localnavigation } from './reducers';
import customBlockTemplates from '@eeacms/volto-marine-theme/components/Blocks/CustomBlockTemplates/customBlockTemplates';
import TextAlignWidget from './components/Widgets/TextAlign';
import './slate-styles.less';
import MarineMeasureItem from './components/Result/MarineMeasureItem';

// import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';
import linkSVG from '@plone/volto/icons/link.svg';
import { makeInlineElementPlugin } from '@plone/volto-slate/elementEditor';
import { LINK } from '@plone/volto-slate/constants';
import { LinkElement } from '@plone/volto-slate/editor/plugins/AdvancedLink/render';
import { withLink } from '@plone/volto-slate/editor/plugins/AdvancedLink/extensions';
import { linkDeserializer } from '@plone/volto-slate/editor/plugins/AdvancedLink/deserialize';
import LinkEditSchema from '@plone/volto-slate/editor/plugins/AdvancedLink/schema';

import { defineMessages } from 'react-intl'; // , defineMessages

import marineLogo from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/logo/sites/wise-marine-logo.svg';
import marineLogoWhite from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/logo/sites/wise-marine-logo-white.svg';
import eeaWhiteLogo from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/logo/eea-logo-white.svg';
import europeanComissionLogo from '@eeacms/volto-marine-theme/static/ec_logo_white.svg';
import MeasureView from '@eeacms/volto-marine-theme/components/Widgets/MeasureViewWidget';
import installMarineMeasureSearch from './config/index';

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

const restrictedBlocks = ['imagecards'];

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
    // map_interactive: DatabaseItemView,
  };

  config.addonReducers = {
    ...(config.addonReducers || {}),
    breadcrumb,
    localnavigation,
  };

  config.settings.searchlib = installMarineMeasureSearch(
    config.settings.searchlib,
  );

  const {
    resolve,
    searchui: { marinemeasure },
  } = config.settings.searchlib;

  resolve.MarineMeasureItem = { component: MarineMeasureItem };

  marinemeasure.elastic_index = '_es/marinemeasure';
  marinemeasure.index_name = 'wisetest_searchui';

  // fix the query
  const marineMeasureConfig = config.settings.searchlib.searchui.marinemeasure;
  const index = marineMeasureConfig.permanentFilters.findIndex(
    (f) => f.id === 'constantScore',
  );
  const baseConstantScore = marineMeasureConfig.permanentFilters[index];

  function updatedConstantScore() {
    const base = baseConstantScore();
    let filterBool = base.constant_score.filter.bool;

    if (filterBool) {
      if (!Array.isArray(filterBool.must_not)) {
        if (
          filterBool.must_not?.exists?.field === 'exclude_from_globalsearch'
        ) {
          delete filterBool.must_not;
        }
      } else {
        filterBool.must_not = filterBool.must_not.filter((item) => {
          if (item?.exists?.field === 'exclude_from_globalsearch') {
            return false;
          }
          return true;
        });
      }
    }

    return base;
  }

  updatedConstantScore.id = 'constantScore';

  marineMeasureConfig.permanentFilters[index] = updatedConstantScore;

  config.widgets.widget.text_align = TextAlignWidget;
  // Disabled TokenWidget for 'theme', it breaks the 'theme' field in volto-tabs-block in the 'horizontal carousel' layout
  // We have a 'theme' field in the wise catalogue metadata (CatalogueMetadata)
  // config.widgets.id.theme = TokenWidget;

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

  config.settings.useQuantaToolbar = false;

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

  // do not expand breadcrumbs. This fixed the breadcrumbs in contents view. The hasApiExpander needs to be made
  // generic to also look for nonContentRoutes.
  (config.settings.apiExpanders || []).forEach((item) => {
    if (item.GET_CONTENT.includes('breadcrumbs')) {
      item.GET_CONTENT.splice(item.GET_CONTENT.indexOf('breadcrumbs', 1));
    }
  });

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
    {
      id: 'primary-table',
      title: 'Primary table',
      // previewComponent: () => (
      //   <Icon name={contentBoxSVG} size="88px" className="primary" />
      // ),
      viewComponent: (props) => {
        return (
          <div className="content-box primary-table">
            <div className="content-box-inner">{props.children}</div>
          </div>
        );
      },
    },
  ];

  // restrict blocks
  restrictedBlocks.forEach((block) => {
    if (config.blocks.blocksConfig[block]) {
      config.blocks.blocksConfig[block].restricted = true;
    }
  });

  // mega menu layout settings
  config.settings.menuItemsLayouts = {
    ...config.settings.menuItemsLayouts,
    '/marine/countries-and-regional-seas': {
      menuItemColumns: ['eight wide column', 'four wide column'],
      menuItemChildrenListColumns: [5, 1],
      appendExtraMenuItemsToLastColumn: true,
      hideChildrenFromNavigation: false,
    },
    '/marine/europe-seas': {
      // menuItemColumns: [
      //   'three wide column',
      //   'three wide column',
      //   'three wide column',
      //   // 'three wide column',
      //   // 'three wide column',
      // ],
      menuItemChildrenListColumns: [1, 1, 1],
      appendExtraMenuItemsToLastColumn: false,
      hideChildrenFromNavigation: false,
    },
    '/marine/resources': {
      // menuItemColumns: [
      //   'three wide column',
      //   'three wide column',
      //   'three wide column',
      //   // 'three wide column',
      //   // 'three wide column',
      // ],
      menuItemChildrenListColumns: [1, 1, 1],
      appendExtraMenuItemsToLastColumn: false,
      hideChildrenFromNavigation: false,
    },
  };

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
    headerSearchBox: [
      {
        isDefault: true,
        path: '/marine/advanced-search',
        placeholder: 'Search Marine...',
        description:
          'Looking for more information? Try searching the full EEA website content',
        buttonTitle: 'Go to advanced search',
        buttonUrl: 'https://www.eea.europa.eu/en/advanced-search',
      },
    ],
    footerOpts: {
      ...(config.settings.eea?.footerOpts || {}),
      logosHeader: 'Managed by',
      // description:
      //   'WISE - Marine is a gateway to information on European marine issues in support of ecosystem based management and ocean governance',
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
          url: '/sitemap',
          title: 'Sitemap',
        },
        {
          url: '/#legal-notice',
          title: 'Privacy statement',
        },
        {
          url: '/marine/login',
          title: 'Login',
        },
      ],

      contacts: [
        // {
        //   icon: 'comment outline',
        //   text: 'About',
        //   link: '/marine/wise-marine',
        //   children: [],
        // },
        // {
        //   icon: 'comment outline',
        //   text: 'Contact',
        //   link: 'mailto:WISE@eea.europa.eu',
        // },
      ],
    },
  };

  // SPMeasure View widget
  config.views.contentTypesViews.spmeasure = MeasureView;

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
