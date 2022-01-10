/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import ecLogo from '@eeacms/volto-marine-theme/static/ec_logo.svg';
import eeaLogo from '@eeacms/volto-marine-theme/static/eea_logo.svg';
import fiseLogo from '@eeacms/volto-marine-theme/static/forest_logo.svg';
import ccaLogo from '@eeacms/volto-marine-theme/static/cca_logo.svg';
import biseLogo from '@eeacms/volto-marine-theme/static/bise_logo.svg';
import freshwaterLogo from '@eeacms/volto-marine-theme/static/freshwater_logo.svg';

import fishesImage from '@eeacms/volto-marine-theme/static/footer-fishes.svg';

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => {
  const root = useSelector((state) => state.breadcrumbs.root);

  return (
    <div className="footer-wrapper">
      <div className="footer-top-wave"></div>
      <Container>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column mobile={12} tablet={12} computer={12}>
              <ul className="footer-nav" id="footer_links">
                <li>
                  <Link className="item" to={root || '/'}>
                    <FormattedMessage id="home" defaultMessage="Home" />
                  </Link>
                </li>
                <li>
                  <a className="item" href={`mailto:WISE@eea.europa.eu`}>
                    Contact
                  </a>
                </li>
                <li>
                  <Link className="item" to="/sitemap">
                    <FormattedMessage id="sitemap" defaultMessage="Sitemap" />
                  </Link>
                </li>
                <li>
                  <a
                    className="item"
                    href="https://water.europa.eu/#legal-notice"
                  >
                    <FormattedMessage
                      id="legal_notice"
                      defaultMessage="Privacy and Legal Notice"
                    />
                  </a>
                </li>
              </ul>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid stackable className="footer-bottom-logos">
          <Grid.Row>
            <Grid.Column mobile={12} tablet={12} computer={6}>
              <div className="site-info-logos">
                <a href="https://www.eea.europa.eu/">
                  <LazyLoadImage
                    src={eeaLogo}
                    title="European Environment Agency"
                    alt="European Environment Agency"
                    height="38"
                  />
                </a>
                <a href="https://ec.europa.eu/">
                  <LazyLoadImage
                    src={ecLogo}
                    title="European Commission"
                    alt="European Commission"
                    height="38"
                  />
                </a>
              </div>
            </Grid.Column>

            <Grid.Column mobile={12} tablet={12} computer={6}>
              <div>
                <p>Other European Information Systems:</p>
              </div>
              <div className="footer-logos">
                <a href="https://water.europa.eu/freshwater">
                  <LazyLoadImage
                    className="footerLogo"
                    src={freshwaterLogo}
                    title="Freshwater Information System for Europe"
                    alt="Freshwater Information System for Europe"
                    height="34"
                  />
                </a>
                <a href="https://biodiversity.europa.eu/">
                  <LazyLoadImage
                    className="footerLogo"
                    src={biseLogo}
                    title="Biodiversity Information System for Europe"
                    alt="Biodiversity Information System for Europe"
                    height="38"
                  />
                </a>
                <a href="https://climate-adapt.eea.europa.eu/">
                  <LazyLoadImage
                    className="footerLogo"
                    src={ccaLogo}
                    title="Sharing adaptation information across Europe"
                    alt="Climate-Adapt"
                    height="34"
                  />
                </a>
                <a href="https://forest.eea.europa.eu/">
                  <LazyLoadImage
                    className="footerLogo"
                    src={fiseLogo}
                    title="Forest Information System for Europe"
                    alt="Forest Information System for Europe"
                    height="38"
                  />
                </a>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <div className="footer-backdrop">
        <LazyLoadImage src={fishesImage} alt="Footer fishes image" />
      </div>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
