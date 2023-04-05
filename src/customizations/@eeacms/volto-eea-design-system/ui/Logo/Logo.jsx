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
const Logo = ({ src, invertedSrc, id, url, alt, title, inverted }) => {
  const root = useSelector((state) => state.breadcrumbs.root);

  return (
    <Link to={root || '/'} title={title} className={'logo'}>
      <LazyLoadImage
        src={inverted ? invertedSrc : src}
        alt={alt}
        title={title}
        className="eea-logo"
        id={id}
      />
    </Link>
  )
};

export default Logo;
