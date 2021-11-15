import React from 'react';

const ThemeContext = React.createContext({
  mainColor: '',
  conversationBackgroundColor: '',
  userTextColor: '',
  userBackgroundColor: '',
  assistTextColor: '',
  assistBackgoundColor: '',
  showCarouselImages: true
});

export default ThemeContext;
