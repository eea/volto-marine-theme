import React from 'react';
import { Card } from 'semantic-ui-react';
import { UniversalLink, Icon } from '@plone/volto/components';
import { serializeNodes } from 'volto-slate/editor/render';
import { getScaleUrl, getPath } from '@eeacms/volto-marine-theme/utils';
import arrowSVG from '@eeacms/volto-marine-theme/icons/arrow.svg';

const CardItem = (props) => {
  const { card, image_scale, bg_color = '#59d3ff', text_color } = props;

  return (
    <Card className="colored-card">
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
        <div
          className="colored-card-content-wrapper"
          style={{ backgroundColor: bg_color, color: text_color }}
        >
          {card.title && (
            <div className="colored-card-header">
              <h3>{card.title}</h3>
              {card.sub_title && (
                <div className="colored-card-sub-title">{card.sub_title}</div>
              )}
            </div>
          )}
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
              <Icon name={arrowSVG} size="38px" className="next-icon" />
            </UniversalLink>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default CardItem;
