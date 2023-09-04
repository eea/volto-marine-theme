import { multiTermFacet } from '@eeacms/search';
import globalSearchBaseConfig from '@eeacms/volto-globalsearch/config/global-search-base-config.js';

const facets = [
  ...globalSearchBaseConfig.facets,
  multiTermFacet({
    field: 'wm_spm_sector.keyword',
    isFilterable: false,
    isMulti: true,
    label: 'Sector',
    iconsFamily: 'Sources',
    alwaysVisible: true,
  }),
  multiTermFacet({
    field: 'wm_spm_origin.keyword',
    isFilterable: false,
    isMulti: true,
    label: 'Origin of the measure',
    iconsFamily: 'Sources',
    alwaysVisible: true,
  }),
  multiTermFacet({
    field: 'wm_spm_country_coverage.keyword',
    isFilterable: false,
    isMulti: true,
    label: 'Country',
    iconsFamily: 'Sources',
    alwaysVisible: true,
  }),
  multiTermFacet({
    field: 'wm_spm_impacts.keyword',
    isFilterable: false,
    isMulti: true,
    label: 'Measure impacts to',
    iconsFamily: 'Sources',
    alwaysVisible: true,
  }),
  multiTermFacet({
    field: 'wm_spm_descriptors.keyword',
    isFilterable: false,
    isMulti: true,
    label: 'MSFD descriptor',
    iconsFamily: 'Sources',
    alwaysVisible: true,
  }),
];

export default {
  facets,
};
