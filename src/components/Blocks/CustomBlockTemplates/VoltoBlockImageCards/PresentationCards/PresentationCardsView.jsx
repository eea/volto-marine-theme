import React from 'react';
import { Card, Message } from 'semantic-ui-react';
import { getScaleUrl, getPath } from '@eeacms/volto-marine-theme/utils';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { flattenToAppURL } from '@plone/volto/helpers';
import cx from 'classnames';

import './less/presentationcards.less';

const PresentationCardsView = (props) => {
  const { data, editable } = props;
  const {
    align,
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

  return (
    <>
      {cards && cards.length ? (
        <div className={cx('block align imagecards-block', align)}>
          <div style={{ textAlign: `${text_align}` }}>
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
                    key={i}
                    className="presentation-card"
                    {...(card.link ? { href: flattenToAppURL(card.link) } : {})}
                  >
                    <div
                      className="presentation-card-image"
                      style={{
                        minHeight: `${image_height}px`,
                        backgroundImage: `url(${
                          card?.attachedimage
                            ? `${getScaleUrl(
                                getPath(card.attachedimage),
                                image_scale || 'large',
                              )}`
                            : `${flattenToAppURL(
                                `${card.source?.[0]?.['@id']}/@@images/${
                                  card.source?.[0]?.image_field
                                }/${image_scale || 'large'}`,
                              )}`
                        })`,
                      }}
                    ></div>
                    <Card.Content>
                      {card.title && (
                        <Card.Header>
                          <h3 className="presentation-card-title">
                            {card.title}
                          </h3>
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
        <>{editable ? <Message>No image cards</Message> : ''}</>
      )}
    </>
  );
};

export default PresentationCardsView;
