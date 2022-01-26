import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';
import { getLatestTableauVersion } from 'tableau-api-js';
import { setTableauApi } from '@eeacms/volto-tableau/actions';
import cx from 'classnames';
import {
  TableauDownload,
  TableauShare,
  TableauFullscreen,
} from '@eeacms/volto-marine-theme/components';

const Tableau = (props) => {
  const ref = React.useRef(null);
  const mounted = React.useRef(false);
  const [viz, setViz] = React.useState(null);
  const {
    canUpdateUrl = true,
    data = {},
    error = null,
    extraFilters = {},
    extraOptions = {},
    loaded = false,
    mode = 'view',
    screen = {},
    setError = () => {},
    setLoaded = () => {},
    version = getLatestTableauVersion(),
  } = props;
  const {
    autoScale = false,
    filters = {},
    hideTabs = false,
    hideToolbar = false,
    sheetname = '',
    toolbarPosition = 'Top',
  } = data;
  const defaultUrl = data.url;
  const url = props.url || defaultUrl;
  const tableau = props.tableau[version];

  const onFilterChange = (filter) => {
    const newFilters = { ...filters };
    const fieldName = filter.getFieldName();
    const allSelected = filter.getIsAllSelected();
    const values = filter
      .getAppliedValues()
      .map((appliedValue) => appliedValue.value);
    if (allSelected) {
      delete newFilters[fieldName];
    } else {
      newFilters[fieldName] = values;
    }
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      props.onChangeBlock(props.block, {
        ...data,
        filters: {
          ...newFilters,
        },
      });
    }
  };

  const disposeViz = () => {
    if (viz) {
      viz.dispose();
    }
    if (loaded) {
      setLoaded(false);
    }
    if (error) {
      setError(null);
    }
  };

  const initViz = () => {
    disposeViz();
    try {
      const newViz = new tableau.Viz(ref.current, url || defaultUrl, {
        hideTabs,
        hideToolbar,
        sheetname,
        toolbarPosition,
        ...filters,
        ...extraFilters,
        ...extraOptions,
        onFirstInteractive: () => {
          setLoaded(true);
          if (newViz && mode === 'edit') {
            const workbook = newViz.getWorkbook();
            const newData = {
              url: canUpdateUrl ? newViz.getUrl() : defaultUrl,
              sheetname: workbook.getActiveSheet().getName(),
            };
            if (newData.url !== url || newData.sheetname !== sheetname) {
              props.onChangeBlock(props.block, {
                ...data,
                ...newData,
              });
              toast.success(<Toast success title={'Tableau data updated'} />);
            }
            // Filter change event
            newViz.addEventListener(
              tableau.TableauEventName.FILTER_CHANGE,
              (event) => {
                event.getFilterAsync().then((filter) => {
                  onFilterChange(filter);
                });
              },
            );
          }
        },
      });

      return setViz(newViz);
    } catch (e) {
      setError(e._message);
    }
  };

  const addExtraFilters = (extraFilters) => {
    const worksheets = viz.getWorkbook().getActiveSheet().getWorksheets() || [];

    worksheets.forEach((worksheet) => {
      if (worksheet.getSheetType() === tableau.DashboardObjectType.WORKSHEET) {
        Object.keys(extraFilters).forEach((filter) => {
          if (!extraFilters[filter]) {
            worksheet.clearFilterAsync(filter);
          } else {
            worksheet.applyFilterAsync(
              filter,
              extraFilters[filter],
              tableau.FilterUpdateType.REPLACE,
            );
          }
        });
      }
    });
  };

  const updateScale = () => {
    const tableauWrapper = ref.current;
    const tableau = tableauWrapper?.querySelector('iframe');
    if (mounted.current && viz && tableauWrapper && tableau) {
      const { sheetSize = {} } = viz.getVizSize() || {};
      const vizWidth = sheetSize?.minSize?.width || 1;
      const vizHeight = sheetSize?.minSize?.height || 0;
      const scale = Math.min(tableauWrapper.clientWidth / vizWidth, 1);
      tableau.style.transform = `scale(${scale})`;
      tableau.style.width = `${100 / scale}%`;
      tableauWrapper.style.height = `${scale * vizHeight}px`;
    }
  };

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    // Load new tableau api
    if (__CLIENT__ && !props.tableau[version]) {
      props.setTableauApi(version, props.mode);
    }
    /* eslint-disable-next-line */
  }, [version]);

  React.useEffect(() => {
    if (__CLIENT__ && tableau && url) {
      initViz();
    } else {
      disposeViz();
    }

    return () => {
      disposeViz();
    };
    /* eslint-disable-next-line */
  }, [
    hideTabs,
    hideToolbar,
    autoScale,
    sheetname,
    tableau,
    toolbarPosition,
    url,
  ]);

  React.useEffect(() => {
    if (mounted.current && loaded && viz) {
      addExtraFilters(extraFilters);
    }
    /* eslint-disable-next-line */
  }, [JSON.stringify(extraFilters)]);

  React.useEffect(() => {
    if (autoScale) {
      updateScale();
    }
    /* eslint-disable-next-line */
  }, [loaded, screen?.page?.width]);

  // React.useEffect(() => {
  //   if (mounted.current && loaded && viz) {
  //     const workbook = viz.getWorkbook();
  //     if (extraOptions.device === 'desktop') {
  //       workbook.activateSheetAsync(0);
  //     } else if (extraOptions.device === 'tablet') {
  //       workbook.activateSheetAsync(1);
  //     } else {
  //       workbook.activateSheetAsync(2);
  //     }
  //     console.log('HERE', workbook.getPublishedSheetsInfo());
  //     addExtraFilters(extraOptions);
  //   }
  //   /* eslint-disable-next-line */
  // }, [JSON.stringify(extraOptions)]);

  return (
    <div id="tableau-wrap">
      <div className="tableau-toolbar">
        <TableauDownload viz={viz} />
        <TableauFullscreen {...props} />
        <TableauShare {...props} />
      </div>

      <div id="tableau-outer">
        <div
          className={cx('tableau', version, {
            'tableau-scale': autoScale,
          })}
          ref={ref}
        />
      </div>
    </div>
  );
};

export default compose(
  connect(
    (state, props) => ({
      tableau: state.tableau,
      screen: state.screen,
    }),
    { setTableauApi },
  ),
)(Tableau);
