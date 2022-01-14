import React from 'react';
import { Card } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import { serializeNodes } from 'volto-slate/editor/render';
import { getScaleUrl, getPath } from '@eeacms/volto-marine-theme/utils';

import { Icon } from '@plone/volto/components';
import arrowSVG from '@plone/volto/icons/ahead.svg';

import './css/coloredcards.less';

const CardItem = (props) => {
  const { card, image_scale } = props;

  return (
    <Card
      className="colored-card"
      // {...(card.link ? { href: card.link } : {})}
    >
      <Card.Content>
        <div className="colored-card-image-wrapper">
          <div
            className="colored-card-image"
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
        </div>
        <div className="colored-card-content-wrapper">
          {card.title && <Card.Header>{card.title}</Card.Header>}
          {card.text && (
            <div className="colored-card-content">
              <div className="colored-card-description">
                {serializeNodes(card.text)}
              </div>
            </div>
          )}
          {card.link && (
            <UniversalLink
              className="colored-card-link"
              href={card.link}
              title="Read more"
            >
              <Icon name={arrowSVG} size="26px" className="next-icon" />
            </UniversalLink>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default CardItem;
