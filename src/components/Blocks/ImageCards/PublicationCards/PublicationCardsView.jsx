import React from 'react';
import { Card } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';
import { UniversalLink, Icon } from '@plone/volto/components';
import { getScaleUrl, getPath } from '@eeacms/volto-marine-theme/utils';
import newspaperSVG from '@eeacms/volto-marine-theme/icons/newspaper.svg';
import { serializeNodes } from 'volto-slate/editor/render';
import config from '@plone/volto/registry';
import cx from 'classnames';

import './css/publicationcards.less';

const PublicationCardsView = ({ data }) => {
  const {
    title,
    cards,
    cards_per_row,
    image_scale,
    text_align,
    image_height = '230',
  } = data;

  const [refresh, forceRefresh] = React.useState(0);

  React.useEffect(() => {
    if (cards && cards.length > 0) {
      cards.forEach((card, index) => {
        if (card.source?.length && !card.title) {
          card.title = card.source[0].title;
          card.link = card.source[0].getURL;
          // card.description = card.source[0].Description;
          forceRefresh(refresh + 1);
        }
      });
    }
  }, [cards, refresh]);

  return (
    <div
      className={cx(
        'block align imagecards-block',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <BodyClass className="has-publication-cards" />
      <div
        className={cx({
          'full-width': data.align === 'full',
        })}
        style={{ textAlign: `${text_align}` }}
      >
        <div>
          <h2>{title}</h2>
          <Card.Group
            className="publication-cards"
            {...(cards_per_row && cards_per_row > 0
              ? { itemsPerRow: cards_per_row }
              : {})}
          >
            {(cards || []).map((card, i) => (
              <Card className="publication-card">
                {!card?.attachedimage ? (
                  <div
                    className="publication-card-image"
                    style={{
                      backgroundImage: `url(${card.source?.[0]['@id']
                        .replace(config.settings.apiPath, '')
                        .replace(
                          config.settings.internalApiPath,
                          '',
                        )}/@@images/image/${image_scale || 'large'})`,
                      minHeight: `${image_height}px`,
                    }}
                  ></div>
                ) : (
                  <div
                    className="publication-card-image"
                    style={
                      card?.attachedimage
                        ? {
                            backgroundImage: `url(${getScaleUrl(
                              getPath(card.attachedimage),
                              image_scale || 'large',
                            )})`,
                            minHeight: `${image_height}px`,
                          }
                        : {}
                    }
                  ></div>
                )}
                <Card.Content>
                  {card.title && (
                    <UniversalLink
                      className="publication-card-link"
                      href={card.link}
                    >
                      <Card.Header>
                        <h3 className="publication-card-title">{card.title}</h3>
                      </Card.Header>
                    </UniversalLink>
                  )}

                  {card.text && (
                    <div className="content publication-card-content">
                      <div className="publication-card-description">
                        {serializeNodes(card.text)}
                      </div>
                    </div>
                  )}
                </Card.Content>

                <Card.Content extra>
                  <div className="card-bottom">
                    {card.publication_link && (
                      <UniversalLink
                        href={card.publication_link}
                        className="card-bottom-link"
                      >
                        <Icon name={newspaperSVG} size="30px" />
                        <span>Open Publication</span>
                      </UniversalLink>
                    )}
                  </div>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>
      </div>
    </div>
  );
};

export default PublicationCardsView;