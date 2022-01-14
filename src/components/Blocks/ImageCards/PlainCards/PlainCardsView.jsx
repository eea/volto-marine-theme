import cx from 'classnames';
import React from 'react';
import { Card } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';
import { serializeNodes } from 'volto-slate/editor/render';
import { getScaleUrl, getPath } from '@eeacms/volto-marine-theme/utils';

import './css/plaincards.less';

const PlainCardsView = ({ data }) => {
  const { title, cards, cards_per_row, image_scale, text_align } = data;

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
      <BodyClass className="has-plain-cards" />
      <div
        className={cx({
          'full-width': data.align === 'full',
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
                className="plain-card"
                {...(card.link ? { href: card.link } : {})}
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
                    In memory of <strong>Irene del Barrio Alvarellos,</strong>
                    our colleague who has been instrumental in developing and
                    running WISE-Marine, in particular the EU Marine Strategy
                    Framework Directive reporting and assessment components.
                  </p>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      </div>
    </div>
  );
};

export default PlainCardsView;
