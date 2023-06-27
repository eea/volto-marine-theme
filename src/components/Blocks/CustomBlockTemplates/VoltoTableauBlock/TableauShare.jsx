import React from 'react';
import { Popup, Tab, Button, Menu, Input } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { useCopyToClipboard } from '@eeacms/volto-marine-theme/helpers';

import shareSVG from '@plone/volto/icons/share.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import linkSVG from '@plone/volto/icons/link.svg';

import cx from 'classnames';

const TableauShare = (props) => {
  const { url } = props.data;

  const embedCode = (embed_url) => {
    const tableauUrlPath = embed_url.split('/');
    const tableauSiteRoot = '/' + tableauUrlPath[3] + '/' + tableauUrlPath[4];
    const tableauName =
      tableauUrlPath[6] + '/' + tableauUrlPath[7]?.split('?')[0];

    return (
      "<script type='text/javascript'" +
      "src='https://tableau.discomap.eea.europa.eu/javascripts/api/viz_v1.js'>" +
      '</script>' +
      "<div class='tableauPlaceholder' style='width: 1024px; height: 827px;'>" +
      "<object class='tableauViz' width='1024' height='827' style='display:none;'>" +
      "<param name='host_url' value='https%3A%2F%2Ftableau.discomap.eea.europa.eu%2F' />" +
      "<param name='site_root' value='" +
      tableauSiteRoot +
      "' />" +
      "<param name='name' value='" +
      tableauName +
      "' />" +
      "<param name='tabs' value='yes' />" +
      "<param name='toolbar' value='no' />" +
      '</object>' +
      '</div>'
    );
  };

  const CopyUrlButton = ({ content, buttonText }) => {
    const [copyUrlStatus, copyUrl] = useCopyToClipboard(content);

    if (copyUrlStatus === 'copied') {
      buttonText = 'Copied!';
    } else if (copyUrlStatus === 'failed') {
      buttonText = 'Copy failed. Please try again.';
    }

    return (
      <Button
        primary
        onClick={copyUrl}
        className={cx('copy-button', {
          'green-button': copyUrlStatus === 'copied',
        })}
      >
        {buttonText}
      </Button>
    );
  };

  const panes = [
    {
      menuItem: (
        <Menu.Item>
          <span className="nav-dot">
            <Icon name={linkSVG} size="24px" />
          </span>
          <span className="nav-dot-title">URL</span>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <Input defaultValue={url} />
          <CopyUrlButton content={url} buttonText="Copy sharing URL" />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item>
          <span className="nav-dot">
            <Icon name={codeSVG} size="24px" />
          </span>
          <span className="nav-dot-title">Embed</span>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <textarea defaultValue={embedCode(url)} />
          <CopyUrlButton
            content={embedCode(url)}
            buttonText="Copy embed code"
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Popup
      basic
      className="tableau-share-dialog"
      position="bottom right"
      on="click"
      trigger={
        <div className="toolbar-button-wrapper">
          <Button className="toolbar-button" title="Share">
            <Icon name={shareSVG} size="23px" />
          </Button>
        </div>
      }
    >
      <Popup.Header>Share Dashboard</Popup.Header>
      <Popup.Content>
        <Tab
          menu={{ secondary: true, pointing: true, fluid: true }}
          panes={panes}
        />
      </Popup.Content>
    </Popup>
  );
};

export default TableauShare;
