import React from 'react';
import { Message } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';
import { serializeNodes } from 'volto-slate/editor/render';
import {
  CarouselCardsView,
  GroupCardsView,
} from '@eeacms/volto-marine-theme/components';
import cx from 'classnames';

import './css/coloredcards.less';

const PlainCardsView = ({ data }) => {
  const {
    cards,
    cards_per_row,
    image_scale,
    text_align,
    slider,
    slides_to_show,
    title,
    text,
  } = data;

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
      <BodyClass className="has-colored-cards" />
      {title && <h2 className="colored-cards-title">{title}</h2>}
      {text && (
        <div className="colored-cards-description">{serializeNodes(text)}</div>
      )}
      <div
        className={cx({
          'full-width': data.align === 'full',
        })}
        style={{ textAlign: `${text_align}` }}
      >
        {cards ? (
          <>
            {slider ? (
              <CarouselCardsView
                cards={cards}
                slides_to_show={slides_to_show}
                image_scale={image_scale}
              />
            ) : (
              <GroupCardsView
                cards={cards}
                cards_per_row={cards_per_row}
                image_scale={image_scale}
              />
            )}
          </>
        ) : (
          <Message>No image cards</Message>
        )}
      </div>
    </div>
  );
};

export default PlainCardsView;
