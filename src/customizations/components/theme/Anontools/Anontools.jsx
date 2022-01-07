/**
 * Anontools component.
 * @module components/theme/Anontools/Anontools
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '@plone/volto/components';
import userSVG from '@eeacms/volto-marine-theme/icons/user.svg';

/**
 * Anontools container class.
 * @class Anontools
 * @extends Component
 */
class Anontools extends Component {
  static propTypes = {
    token: PropTypes.string,
    content: PropTypes.shape({
      '@id': PropTypes.string,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    content: {
      '@id': null,
    },
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      !this.props.token && (
        <span className="login-wrapper">
          <Link
            className="item"
            to={`${this.props.root}/login${
              __CLIENT__ && this.props.content
                ? `?return_url=${window.location.pathname}`
                : ''
            }`}
          >
            <Icon name={userSVG} size="20px" />
          </Link>
        </span>
      )
    );
  }
}

export default connect((state, props) => {
  const path = state.router.location?.pathname;
  return {
    token: state.userSession.token,
    root: state.breadcrumbs.root,
    content: state.prefetch?.[path] || state.content.data,
  };
})(Anontools);
