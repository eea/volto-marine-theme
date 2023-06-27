import React from 'react';
import { Card, Message } from 'semantic-ui-react';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { getScaleUrl, getPath } from '@eeacms/volto-marine-theme/utils';
import { flattenToAppURL } from '@plone/volto/helpers';
import cx from 'classnames';

import './less/plaincards.less';

const PlainCardsView = (props) => {
  const { data, editable } = props;
  const {
    align,
    title,
    cards,
    cards_per_row,
    image_scale,
    text_align,
    image_height = '65',
  } = data;

  return (
    <>
      {cards && cards.length ? (
        <div className={cx('block align imagecards-block', align)}>
          <div
            className={cx({
              'full-width': align === 'full',
            })}
            style={{ textAlign: `${text_align}` }}
          >
            <div>
              <h2 className="plain-cards-title">{title}</h2>

              <Card.Group
                className="plain-cards"
                {...(cards_per_row && cards_per_row > 0
                  ? { itemsPerRow: cards_per_row }
                  : {})}
              >
                {(cards || []).map((card, i) => (
                  <Card
                    key={i}
                    className="plain-card"
                    {...(card.link && !props.editable
                      ? { href: flattenToAppURL(card.link) }
                      : {})}
                  >
                    <div
                      className="plain-card-image"
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
                    <Card.Content>
                      {card.title && <Card.Header>{card.title}</Card.Header>}
                      {card.text && (
                        <div className="content plain-card-content">
                          <div className="plain-card-description">
                            {serializeNodes(card.text)}
                          </div>
                        </div>
                      )}
                    </Card.Content>
                  </Card>
                ))}

                <Card className="memory-card">
                  <Card.Content>
                    <div className="content-wrapper">
                      <p>
                        In memory of{' '}
                        <strong>Irene del Barrio Alvarellos,</strong>
                        our colleague who has been instrumental in developing
                        and running WISE-Marine, in particular the EU Marine
                        Strategy Framework Directive reporting and assessment
                        components.
                      </p>
                    </div>
                  </Card.Content>
                </Card>
              </Card.Group>
            </div>
          </div>
        </div>
      ) : (
        <>{editable && <Message>No image cards</Message>}</>
      )}
    </>
  );
};

export default PlainCardsView;
