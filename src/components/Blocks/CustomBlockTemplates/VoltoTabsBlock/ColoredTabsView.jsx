import React from 'react';
import { Menu, Tab } from 'semantic-ui-react';
import { RenderBlocks } from '@plone/volto/components';
import cx from 'classnames';

import './less/coloredtabs.less';

const MenuItem = (props) => {
  const {
    activeTab = null,
    tabs = {},
    setActiveTab = () => {},
    tab,
    index,
  } = props;
  const title = tabs[tab].title;
  const tabIndex = index + 1;
  const defaultTitle = `Tab ${tabIndex}`;

  return (
    <Menu.Item
      className={`tab-menu-item-${tabIndex}`}
      name={defaultTitle}
      active={tab === activeTab}
      onClick={() => {
        if (activeTab !== tab) {
          setActiveTab(tab);
        }
      }}
    >
      <span className="menu-item-dot"></span>
      <p className="menu-item-text">{title || defaultTitle}</p>
    </Menu.Item>
  );
};

const ColoredTabsView = (props) => {
  const {
    metadata = {},
    data = {},
    tabsList = [],
    tabs = {},
    activeTabIndex = 0,
  } = props;

  const uiContainer = data.align === 'full' ? 'ui container' : '';
  const menuAlign = data.menuAlign || 'left';
  const menuPosition = data.menuPosition || 'inline';
  const tabsTitle = data.title;

  const panes = tabsList.map((tab, index) => {
    const tabIndex = index + 1;

    return {
      id: tab,
      menuItem: () => {
        return (
          <React.Fragment key={`tab-${tab}`}>
            <MenuItem {...props} tab={tab} index={index} />
          </React.Fragment>
        );
      },
      render: () => {
        return (
          <Tab.Pane className={`tab-pane-${tabIndex}`}>
            <RenderBlocks {...props} metadata={metadata} content={tabs[tab]} />
          </Tab.Pane>
        );
      },
    };
  });

  return (
    <>
      <div className={uiContainer}>
        {tabsTitle && <h3 className="colored-tabs-title">{tabsTitle}</h3>}
      </div>
      <Tab
        activeIndex={activeTabIndex}
        className={cx('default tabs colored-tabs', menuPosition, uiContainer)}
        menu={{
          className: cx(menuAlign),
        }}
        panes={panes}
      />
    </>
  );
};

export default ColoredTabsView;
