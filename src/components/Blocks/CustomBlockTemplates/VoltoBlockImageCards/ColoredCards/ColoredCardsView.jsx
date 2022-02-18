import React from 'react';
import { Message } from 'semantic-ui-react';
import { serializeNodes } from 'volto-slate/editor/render';
import {
  CarouselCardsView,
  GroupCardsView,
} from '@eeacms/volto-marine-theme/components/Blocks/CustomBlockTemplates/VoltoBlockImageCards';
import cx from 'classnames';

import './less/coloredcards.less';

const ColoredCardsView = (props) => {
  const { data, editable } = props;
  const {
    align,
    cards,
    cards_per_row,
    image_scale,
    text_align = 'left',
    slider,
    slides_to_show,
    bg_color,
    text_color,
    title,
    text,
  } = data;

  return (
    <>
      {cards && cards.length ? (
        <div className={('block align imagecards-block', align)}>
          {title && <h2 className="colored-cards-title">{title}</h2>}
          {text && (
            <div className="colored-cards-description">
              {serializeNodes(text)}
            </div>
          )}
          <div
            className={cx({
              'full-width': align === 'full' || slider,
            })}
            style={{ textAlign: `${text_align}` }}
          >
            {slider ? (
              <div className="ui container">
                <CarouselCardsView
                  cards={cards}
                  slides_to_show={slides_to_show}
                  image_scale={image_scale}
                  bg_color={bg_color}
                  text_color={text_color}
                />
              </div>
            ) : (
              <GroupCardsView
                cards={cards}
                cards_per_row={cards_per_row}
                image_scale={image_scale}
                bg_color={bg_color}
                text_color={text_color}
              />
            )}
          </div>
        </div>
      ) : (
        <>{editable ? <Message>No image cards</Message> : ''}</>
      )}
    </>
  );
};

export default ColoredCardsView;
