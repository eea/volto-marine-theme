/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { useEffect, useState } from 'react';
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
import {
  HeroSection,
  StickyHeader,
} from '@eeacms/volto-marine-theme/components';
import clearLogoSVG from '@eeacms/volto-marine-theme/static/marine_logo_white.svg';
import zoomSVG from '@eeacms/volto-marine-theme/icons/search.svg';
import { Icon } from '@plone/volto/components';

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
  const componentsObjectProvides =
    content?.['@components']?.['object_provides'] || [];
  const isNavRoot =
    (Array.isArray(componentsObjectProvides) &&
      componentsObjectProvides.indexOf(
        'plone.app.layout.navigation.interfaces.INavigationRoot',
      ) > -1) ||
    false;
  const isHomePage = content?.['@type'] === 'Plone Site' || isNavRoot;
  const cmsView = isCmsUi(actualPathName);
  const homePageView = isHomePage && !cmsView;

  const searchRef = React.useRef(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (
        searchRef?.current &&
        showMobileSearch &&
        !searchRef.current?.contains(event.target)
      ) {
        setShowMobileSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideSearch);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSearch);
    };
  }, [showMobileSearch, searchRef]);

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
        <div className="header">
          <StickyHeader stickyBreakpoint={1024}>
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
                  <div className="mobile-search">
                    <div className="search-icon">
                      <Icon
                        onClick={toggleMobileSearch}
                        name={zoomSVG}
                        size="39px"
                      />
                    </div>
                  </div>
                  <Navigation
                    pathname={pathname}
                    navigation={navigationItems}
                  />
                </div>
              ) : (
                <div className="contentpage-header">
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
                      <div className="mobile-search">
                        <div className="search-icon">
                          <Icon
                            onClick={toggleMobileSearch}
                            name={zoomSVG}
                            size="39px"
                          />
                        </div>
                      </div>
                      <Navigation
                        pathname={pathname}
                        navigation={navigationItems}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Container>

            {showMobileSearch ? (
              <div ref={searchRef} className="mobile-search-popup">
                <div>
                  <SearchWidget pathname={pathname} />
                </div>
              </div>
            ) : (
              ''
            )}
          </StickyHeader>
        </div>
      </Segment>

      {!cmsView && !isHomePage && (
        <div className="header-container">
          <HeroSection
            image_url={leadImageUrl}
            image_caption={contentImageCaption}
            content_title={contentTitle}
            content_description={contentDescription}
          />
        </div>
      )}
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  actualPathName: PropTypes.string.isRequired,
  leadImage: PropTypes.object,
  content: PropTypes.object,
};

export default connect((state) => ({
  leadImage: state?.content?.data?.image,
  content: state.content.data,
}))(Header);
