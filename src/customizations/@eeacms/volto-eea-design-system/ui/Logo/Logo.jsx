/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
      <LazyLoadImage
        src={LogoImage}
        alt="WISE Marine Logo"
        title="Go to home page"
        className="eea-logo"
        height="60"
      />
    </Link>
  );
};

export default Logo;
