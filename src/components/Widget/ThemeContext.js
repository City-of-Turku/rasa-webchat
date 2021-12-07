import React from 'react';

const ThemeContext = React.createContext({
  mainColor: '',
  conversationBackgroundColor: '',
  userTextColor: '',
  // Background color for user's typed messages and response options
  userBackgroundColor: '',
  assistTextColor: '',
  assistBackgroundColor: '',
  // To customize card carousels:
  showCarouselImages: true,
  carouselCardsBackground: '',
  carouselCardsTextColor: '',
  carouselCardsButtonBackground: '',
  carouselCardsButtonText: '',
  carouselControlsBackground: '',
  carouselControlsIconColor: '',
});

export default ThemeContext;
