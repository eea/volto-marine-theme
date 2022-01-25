import React from 'react';
import { Card, Message } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';
import { getScaleUrl, getPath } from '@eeacms/volto-marine-theme/utils';
import { serializeNodes } from 'volto-slate/editor/render';
import { flattenToAppURL } from '@plone/volto/helpers';
import cx from 'classnames';

import './css/presentationcards.less';

const PresentationCardsView = ({ data }) => {
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
          card.text = [
            {
              type: 'p',
              children: [
                {
                  text: card.source[0].Description,
                },
              ],
            },
          ];
          forceRefresh(refresh + 1);
        }
      });
    }
  }, [cards, refresh]);

  return cards ? (
    <div
      className={cx(
        'block align imagecards-block',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <BodyClass className="has-presentation-cards" />
      <div
        className={cx({
          'full-width': data.align === 'full',
        })}
        style={{ textAlign: `${text_align}` }}
      >
        <div>
          <h2>{title}</h2>
          <Card.Group
            className="presentation-cards"
            {...(cards_per_row && cards_per_row > 0
              ? { itemsPerRow: cards_per_row }
              : {})}
          >
            {(cards || []).map((card, i) => (
              <Card
                className="presentation-card"
                {...(card.link ? { href: card.link } : {})}
              >
                <div
                  className="presentation-card-image"
                  style={
                    card?.attachedimage
                      ? {
                          backgroundImage: `url(${getScaleUrl(
                            getPath(card.attachedimage),
                            image_scale || 'large',
                          )})`,
                          minHeight: `${image_height}px`,
                        }
                      : {
                          backgroundImage: `url(${flattenToAppURL(
                            `${card.source?.[0]?.['@id']}/@@images/${
                              card.source?.[0]?.image_field
                            }/${image_scale || 'large'}`,
                          )})`,
                          minHeight: `${image_height}px`,
                        }
                  }
                ></div>
                <Card.Content>
                  {card.title && (
                    <Card.Header>
                      <h3 className="presentation-card-title">{card.title}</h3>
                    </Card.Header>
                  )}

                  {card.text && (
                    <div className="content presentation-card-content">
                      <div className="presentation-card-description">
                        {serializeNodes(card.text)}
                      </div>
                    </div>
                  )}
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>
      </div>
    </div>
  ) : (
    <Message>No image cards</Message>
  );
};

export default PresentationCardsView;
