import React from 'react';
import { Card } from 'semantic-ui-react';
import { Card as CardItem } from '@eeacms/volto-marine-theme/components';

const GroupCardsView = (props) => {
  const { cards, image_scale, cards_per_row } = props;

  return (
    <Card.Group
      className="colored-cards"
      {...(cards_per_row && cards_per_row > 0
        ? { itemsPerRow: cards_per_row }
        : {})}
    >
      {(cards || []).map((card, index) => (
        <CardItem key={index} card={card} image_scale={image_scale} />
      ))}
    </Card.Group>
  );
};

export default GroupCardsView;
