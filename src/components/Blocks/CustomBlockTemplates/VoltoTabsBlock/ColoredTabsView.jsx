import React from 'react';
import { Menu, Tab } from 'semantic-ui-react';
import { RenderBlocks } from '@plone/volto/components';
import cx from 'classnames';

import './less/coloredtabs.less';

const ColoredTabsView = (props) => {
  const { metadata = {}, data = {}, tabsList = [], tabs = {} } = props;

  const uiContainer = data.align === 'full' ? 'ui container' : '';
  const menuAlign = data.menuAlign || 'left';
  const menuPosition = data.menuPosition || 'inline';
  const tabsTitle = data.title;

  const panes = tabsList.map((tab, index) => {
    const tabIndex = index + 1;
    const title = tabs[tab].title;
    const defaultTitle = `Tab ${tabIndex}`;

    return {
      id: tab,
      menuItem: {
        key: tabIndex,
        content: (
          <Menu.Item
            className={`tab-menu-item-${tabIndex}`}
            name={defaultTitle}
          >
            <span className="menu-item-dot"></span>
            <p className="menu-item-text">{title || defaultTitle}</p>
          </Menu.Item>
        ),
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
