/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Logo,
  Navigation,
  SearchWidget,
  Anontools,
} from '@plone/volto/components';
import { BodyClass, isCmsUi } from '@plone/volto/helpers';
import { Container, Segment } from 'semantic-ui-react';
import { HeroSection } from '@eeacms/volto-marine-theme/components';
import clearLogoSVG from '@eeacms/volto-marine-theme/static/marine_logo_white.svg';

import cx from 'classnames';

const Header = (props) => {
  const {
    content,
    leadImage,
    actualPathName,
    pathname,
    navigationItems,
  } = props;

  const leadImageUrl = leadImage?.scales?.huge?.download;
  const contentTitle = content?.title;
  const contentImageCaption = content?.image_caption;
  const contentDescription = content?.description;
  const isNavRoot =
    content?.['@components']?.['object_provides'].indexOf(
      'plone.app.layout.navigation.interfaces.INavigationRoot',
    ) > -1;
  const isHomePage = content?.['@type'] === 'Plone Site' || isNavRoot;
  const cmsView = isCmsUi(actualPathName);
  const homePageView = isHomePage && !cmsView;

  const innerWidth = __CLIENT__ && window && window.innerWidth;
  const scrollY = __CLIENT__ && window && window.scrollY;
  const [width, setWidth] = useState(innerWidth);
  const [y, setY] = useState(scrollY);
  const [scrollingUp, setScrollingUp] = useState(false);

  const handleScroll = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY && window.pageYOffset > 100) {
        setScrollingUp(true);
      } else {
        setScrollingUp(false);
      }
      setY(window.scrollY);
    },
    [y],
  );

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="portal-top">
      {homePageView && <BodyClass className="homepage-view" />}
      {leadImageUrl && !cmsView && <BodyClass className="has-image" />}
      <Segment
        basic
        className={`header-wrapper ${
          homePageView ? 'homepage' : 'contentpage'
        }`}
        role="banner"
      >
        <div
          className={cx('header', {
            'sticky-header': scrollingUp && width < 1024,
          })}
        >
          <Container>
            {homePageView ? (
              <div className="home-header">
                <div className="logo-nav-wrapper home-nav">
                  <div className="logo">
                    <img
                      className="home-logo"
                      src={clearLogoSVG}
                      alt="WISE Marine Logo"
                      height="60"
                    />
                  </div>
                  <div className="header-right-section">
                    <div className="right-section-wrapper">
                      <div className="search">
                        <SearchWidget pathname={pathname} />
                      </div>
                      <Anontools />
                    </div>
                  </div>
                </div>
                <Navigation pathname={pathname} navigation={navigationItems} />
              </div>
            ) : (
              <div className="logo-nav-wrapper page-nav">
                <div className="logo">
                  <Logo />
                </div>
                <div className="header-right-section">
                  <div className="right-section-wrapper">
                    <div className="search">
                      <SearchWidget pathname={pathname} />
                    </div>
                    <Anontools />
                  </div>
                  <Navigation
                    pathname={pathname}
                    navigation={navigationItems}
                  />
                </div>
              </div>
            )}
          </Container>
        </div>
      </Segment>

      <React.Fragment>
        {!cmsView && !isHomePage && (
          <div className="header-bg">
            <div
              className={'header-container'}
              style={{ position: 'relative' }}
            >
              <HeroSection
                image_url={leadImageUrl}
                image_caption={contentImageCaption}
                content_title={contentTitle}
                content_description={contentDescription}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Header.propTypes = {
  token: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  actualPathName: PropTypes.string.isRequired,
  leadImage: PropTypes.object,
  content: PropTypes.object,
  location: PropTypes.object,
};

export default connect(
  (state) => ({
    token: state.userSession.token,
    leadImage: state?.content?.data?.image,
    content: state.content.data,
    location: state.router.location,
  }),
  {},
)(Header);
