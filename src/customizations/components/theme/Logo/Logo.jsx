/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import LogoImage from './marine_logo.svg';

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = (props) => {
  const root = useSelector((state) => state.breadcrumbs.root);

  return (
    <Link to={root || '/'} title="WISE Marine">
      <Image
        src={LogoImage}
        alt="WISE Marine Logo"
        title="Go to home page"
        height="60"
      />
    </Link>
  );
};

export default Logo;
