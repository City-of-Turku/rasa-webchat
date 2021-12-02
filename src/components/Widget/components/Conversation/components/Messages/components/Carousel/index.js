import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';

// eslint-disable-next-line import/no-named-default
import { default as NukaCarousel } from 'nuka-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useElementSize } from 'usehooks-ts'

import ThemeContext from '../../../../../../ThemeContext';
import './styles.scss';

const Carousel = (props) => {
  const { message } = props;
  const carousel = message.toJS();

  const handleClick = (action) => {
    if (!action || action.type !== 'postback') return;
    const { chooseReply } = props;
    chooseReply(action.payload, action.title);
  };

  const { mainColor, assistTextColor, userBackgroundColor, showCarouselImages } =
    useContext(ThemeContext);
  const { linkTarget } = props;

  const CARD_WIDTH = 220;
  const [carouselRef, { width, height }] = useElementSize();

  /**
   * Calculates whether there are still new slides on right that are not visible
   * in the container. Used to hide/show next slide -arrow.
   * @param {*} currentId Id of the "current slide" (0-based indexing)
   * @param {*} slideCount Number of slides in the caraousel
   */
  const isLastCardVisible = (currentId, slideCount) => {
    if (width === 0) return false;
    const slidesLeft = slideCount - currentId;
    return (slidesLeft * CARD_WIDTH - 10) <= width;
  };

  /**
   * Calculate how many slides can be shown at once based on container size
   */
  const slidesToShow = () => {
    if (width === 0) return undefined;
    return width / CARD_WIDTH;
  };

  return (
    <div className='rw-carousel-container' ref={carouselRef}>
    <NukaCarousel
      heightMode='max'
      swiping
      disableEdgeSwiping
      scrollMode='remainder'
      slideWidth={`${CARD_WIDTH}px`}
      slidesToShow={slidesToShow()}
      defaultControlsConfig={{
        pagingDotsStyle: {
          fill: mainColor,
        },
        prevButtonClassName: 'rw-left-arrow',
      }}
      // Remove default buttons
      renderCenterLeftControls={null}
      renderCenterRightControls={null}
      // Custom controls
      renderBottomLeftControls={({ previousSlide, currentSlide }) =>
        currentSlide === 0 ? null : (
          <button
            type='button'
            onClick={previousSlide}
            className='rw-carousel-arrow arrow-prev'
            style={{ backgroundColor: userBackgroundColor }}>
            <FontAwesomeIcon icon={faAngleLeft} color={mainColor} />
          </button>
        )
      }
      renderBottomRightControls={({ nextSlide, currentSlide, slideCount }) =>
        isLastCardVisible(currentSlide, slideCount) ? null : (
          <button
            type='button'
            onClick={nextSlide}
            className='rw-carousel-arrow arrow-next'
            style={{ backgroundColor: userBackgroundColor }}>
            <FontAwesomeIcon icon={faAngleRight} color={mainColor} />
          </button>
        )
      }
      
      // Remove control dots:
      renderBottomCenterControls={null}
    >
      {carousel.elements.map((carouselCard, index) => {
        const defaultActionUrl =
          carouselCard.default_action && carouselCard.default_action.type === 'web_url'
            ? carouselCard.default_action.url
            : null;
        const cardTarget = carouselCard.metadata ? carouselCard.metadata.linkTarget : undefined;
        return (
          <div key={index} className='rw-carousel-card'>
            {showCarouselImages && ( // Theme property showCarouselImages determines whether images are shown
            <a
              href={defaultActionUrl}
              target={cardTarget || linkTarget || '_blank'}
              rel='noopener noreferrer'
              onClick={() => handleClick(carouselCard.default_action)}>
              {carouselCard.image_url ? (
                <img
                  className='rw-carousel-card-image'
                  src={carouselCard.image_url}
                  alt={`${carouselCard.title} ${carouselCard.subtitle}}}`}
                />
              ) : (
                <div className='rw-carousel-card-image' />
              )}
            </a>
            )}
            <h1
              className='rw-carousel-card-title'
              style={{ color: assistTextColor }}>
              {carouselCard.title}
            </h1>
            <p
              className='rw-carousel-card-subtitle'
              style={{ color: assistTextColor }}>
              {carouselCard.subtitle}
            </p>
            <div className='rw-carousel-buttons-container'>
              {carouselCard.buttons.map((button, buttonIndex) => {
                if (button.type === 'web_url') {
                  return (
                    <a
                      key={buttonIndex}
                      href={button.url}
                      target={cardTarget || linkTarget || '_blank'}
                      rel='noopener noreferrer'
                      className='rw-reply'
                      style={{ borderColor: mainColor, color: mainColor }}>
                      <span>{button.title}</span>
                    </a>
                  );
                }
                return (
                  <button
                    type='button'
                    key={buttonIndex}
                    className='rw-reply'
                    onClick={() => handleClick(button)}
                    tabIndex={0}
                    style={{ borderColor: mainColor, color: mainColor }}>
                    <span>{button.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </NukaCarousel>
    </div>
  );
};

Carousel.propTypes = {
  message: PROP_TYPES.CAROUSEL,
  // completely bugged, it's actually used in handle click
  // eslint-disable-next-line react/no-unused-prop-types
  chooseReply: PropTypes.func.isRequired,
  linkTarget: PropTypes.string,
};

const mapStateToProps = (state) => ({
  linkTarget: state.metadata.get('linkTarget'),
});

const mapDispatchToProps = (dispatch) => ({
  chooseReply: (payload, title) => {
    if (title) dispatch(addUserMessage(title));
    dispatch(emitUserMessage(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
