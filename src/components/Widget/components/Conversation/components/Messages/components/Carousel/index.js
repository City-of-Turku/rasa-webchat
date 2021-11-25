import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';

// eslint-disable-next-line import/no-named-default
import { default as NukaCarousel } from 'nuka-carousel';

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

  // TODO: Use main color as the color of carousel arrows
  const { mainColor, assistTextColor, showCarouselImages } = useContext(ThemeContext);
  const { linkTarget } = props;

  return (
    <div className='rw-carousel-container'>
    <NukaCarousel
      heightMode='max'
      swiping
      disableEdgeSwiping
      initialSlideHeight={345}
      // cellSpacing={14}
      slideWidth="220px"
      defaultControlsConfig={{
        pagingDotsStyle: {
          fill: mainColor
        },
        prevButtonClassName: "rw-left-arrow"
        /*
        nextButtonClassName: PropTypes.string,
        nextButtonStyle: PropTypes.object,
        nextButtonText: PropTypes.string,
        prevButtonClassName: PropTypes.string,
        prevButtonStyle: PropTypes.object,
        prevButtonText: PropTypes.string,
        pagingDotsContainerClassName: PropTypes.string,
        pagingDotsClassName: PropTypes.string,
        pagingDotsStyle: PropTypes.object
        */
      }}
      /* renderBottomLeftControls={({ previousSlide }) => (
        <button
          type='button'
          className='rw-carousel-arrow'
          onClick={previousSlide}
        >Previous</button>
      )}
      renderBottomRightControls={({ nextSlide }) => (
        <button
          type='button'
          onClick={nextSlide}
        >Next</button>
      )}
      // Remove default buttons
      renderCenterLeftControls={null}
      renderCenterRightControls={null} */
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
            {showCarouselImages && (<a
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
            </a>)}
            <a
              className='rw-carousel-card-title'
              href={defaultActionUrl}
              target={cardTarget || linkTarget || '_blank'}
              rel='noopener noreferrer'
              onClick={() => handleClick(carouselCard.default_action)}
              style={{ color: assistTextColor }}>
              {carouselCard.title}
            </a>
            <a
              className='rw-carousel-card-subtitle'
              href={defaultActionUrl}
              target={cardTarget || linkTarget || '_blank'}
              rel='noopener noreferrer'
              onClick={() => handleClick(carouselCard.default_action)}
              style={{ color: assistTextColor }}>
              {carouselCard.subtitle}
            </a>
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
                // TODO: Use button instead of div
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
  showCarouselImages: PropTypes.bool
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
