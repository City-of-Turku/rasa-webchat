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
  showCarouselImages: true, // Whether carousel card images (or placeholders) will be shown
  carouselCardsBackground: '', // Background color of carousel cards
  carouselCardsTextColor: '', // Color of text in carousel cards (title & subtitle)
  carouselCardsButtonBackground: '', // Background color of buttons in carousel cards
  carouselCardsButtonText: '', // Color of the text on buttons in carousel cards
  carouselControlsBackground: '', // Color of control arrows for card carousel
  carouselControlsIconColor: '', // Color of icons on control arrows for card carousel
});

export default ThemeContext;
