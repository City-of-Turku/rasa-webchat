import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';

// react-multi-carousel:
import { default as MultiCarousel } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { default as NukaCarousel } from 'nuka-carousel';

import ThemeContext from '../../../../../../ThemeContext';
import './styles.scss';
 
const Carousel = (props) => {
  const { message } = props;
  const carousel = message.toJS();

  const responsiveEmbedded = {
     // the naming can be any, depends on you.
    superLargeDesktop: {
      breakpoint: { max: 6000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      slidesToSlide: 1,
      items: 1
    }
  };

  const handleClick = (action) => {
    if (!action || action.type !== 'postback') return;
    const { chooseReply } = props;
    chooseReply(action.payload, action.title);
  };

  // TODO: Use main color as the color of carousel arrows
  const { mainColor, assistTextColor } = useContext(ThemeContext);
  const { linkTarget } = props;

  return (
    <div className='rw-carousel-container'>
    <NukaCarousel
      heightMode='max'
      swiping
      disableEdgeSwiping
      initialSlideHeight={324}
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
        return (
          <div key={index} className='rw-carousel-card'>
            <a
              href={defaultActionUrl}
              target={linkTarget || '_blank'}
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
            <a
              className='rw-carousel-card-title'
              href={defaultActionUrl}
              target={linkTarget || '_blank'}
              rel='noopener noreferrer'
              onClick={() => handleClick(carouselCard.default_action)}
              style={{ color: assistTextColor }}>
              {carouselCard.title}
            </a>
            <a
              className='rw-carousel-card-subtitle'
              href={defaultActionUrl}
              target={linkTarget || '_blank'}
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
                      target={linkTarget || '_blank'}
                      rel='noopener noreferrer'
                      className='rw-reply'
                      style={{ borderColor: mainColor, color: mainColor }}>
                      <span>{button.title}</span>
                    </a>
                  );
                }
                // TODO: Use button instead of div
                return (
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <div
                    key={buttonIndex}
                    className='rw-reply'
                    onClick={() => handleClick(button)}
                    role='button'
                    tabIndex={0}
                    style={{ borderColor: mainColor, color: mainColor }}>
                    <span>{button.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </NukaCarousel>
    </div>
  );

  /*
  <div className="rw-carousel-arrows-container">
        {leftButton && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            className="rw-left-arrow rw-carousel-arrow"
            onClick={handleLeftArrow}
            role="button"
            tabIndex={0}
          >
            <div className="rw-arrow" alt="left carousel arrow" ><Arrow /></div>
          </div>
        )}
        {rightButton && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            className="rw-right-arrow rw-carousel-arrow"
            onClick={handleRightArrow}
            role="button"
            tabIndex={0}
          >
            <div className="rw-arrow" alt="right carousel arrow"><Arrow /></div>
          </div>
        )}
      </div>
      */

  /* return (
    <MultiCarousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsiveEmbedded}
      infinite={false}
      autoPlay={false}
      keyBoardControl
      // customTransition="all .5"
      // transitionDuration={500}
      containerClass='rw-carousel-container'
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      // dotListClass="custom-dot-list-style"
      // partialVisible
      itemClass='rw-carousel-card'
    >
      {carousel.elements.map((carouselCard, index) => {
        const defaultActionUrl =
          carouselCard.default_action && carouselCard.default_action.type === 'web_url'
            ? carouselCard.default_action.url
            : null;

        console.log('CARD', carouselCard);
        return (
          <div key={index}>
            <a
              href={defaultActionUrl}
              target={linkTarget || '_blank'}
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
            <a
              className='rw-carousel-card-title'
              href={defaultActionUrl}
              target={linkTarget || '_blank'}
              rel='noopener noreferrer'
              onClick={() => handleClick(carouselCard.default_action)}
              style={{ color: assistTextColor }}>
              {carouselCard.title}
            </a>
            <a
              className='rw-carousel-card-subtitle'
              href={defaultActionUrl}
              target={linkTarget || '_blank'}
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
                      target={linkTarget || '_blank'}
                      rel='noopener noreferrer'
                      className='rw-reply'
                      style={{ borderColor: mainColor, color: mainColor }}>
                      <span>{button.title}</span>
                    </a>
                  );
                }
                // TODO: Use button instead of div
                return (
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <div
                    key={buttonIndex}
                    className='rw-reply'
                    onClick={() => handleClick(button)}
                    role='button'
                    tabIndex={0}
                    style={{ borderColor: mainColor, color: mainColor }}>
                    <span>{button.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </MultiCarousel>
  ); */
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
