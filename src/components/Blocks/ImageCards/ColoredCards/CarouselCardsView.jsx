import React from 'react';
import loadable from '@loadable/component';
import { Icon } from '@plone/volto/components';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Card } from '@eeacms/volto-marine-theme/components';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import leftArrowSVG from '@plone/volto/icons/left-key.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = loadable(() => import('react-slick'));

const Arrows = (props) => {
  const { slider = {} } = props;

  return (
    <>
      <button
        aria-label="Previous slide"
        className="slider-arrow prev-arrow"
        onClick={() => {
          if (slider.current) {
            slider.current.slickPrev();
          }
        }}
      >
        <Icon name={leftArrowSVG} size="50px" />
      </button>
      <button
        aria-label="Next slide"
        className="slider-arrow next-arrow"
        onClick={() => {
          if (slider.current) {
            slider.current.slickNext();
          }
        }}
      >
        <Icon name={rightArrowSVG} size="50px" />
      </button>
    </>
  );
};

const CarouselCardsView = (props) => {
  const { cards, image_scale, slides_to_show, bg_color } = props;
  const slider = React.useRef(null);
  const slidesNumber = parseInt(slides_to_show);

  const settings = {
    autoplay: false,
    lazyLoad: 'ondemand',
    swipe: true,
    dots: true,
    slidesToShow: slidesNumber,
    slidesToScroll: 1,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="cards-slider">
      <LazyLoadComponent>
        <Slider {...settings} ref={slider} className="colored-cards">
          {(cards || []).map((card, index) => (
            <Card
              key={index}
              card={card}
              image_scale={image_scale}
              bg_color={bg_color}
            />
          ))}
        </Slider>
        <Arrows slider={slider} />
      </LazyLoadComponent>
    </div>
  );
};

export default CarouselCardsView;
