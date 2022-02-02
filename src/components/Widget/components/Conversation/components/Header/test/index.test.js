import React from 'react';
import { shallow, mount } from 'enzyme';

import Header from '../index';

describe('<Header /> fullscreen toggle', () => {
  const createHeader = ({ toggle, fullScreenMode, showFullScreenButton }) =>
    shallow(
      <Header
        toggleFullScreen={toggle}
        fullScreenMode={fullScreenMode}
        showFullScreenButton={showFullScreenButton}
      />
    );

  it('should call toggle prop when clicked', () => {
    const toggle = jest.fn();
    const fullScreenMode = false;
    const showFullScreenButton = true;
    const headerComponent = createHeader({ toggle, fullScreenMode, showFullScreenButton });
    headerComponent.find('.rw-toggle-fullscreen-button').simulate('click');
    expect(toggle).toBeCalled();
  });

  it('should render the fullscreen image when fullScreenMode = false', () => {
    const toggle = jest.fn();
    const fullScreenMode = false;
    const showFullScreenButton = true;
    const headerComponent = createHeader({ toggle, fullScreenMode, showFullScreenButton });
    expect(headerComponent.find('.rw-fullScreenImage')).toHaveLength(1);
  });

  it('should render the fullscreen exit image when fullScreenMode = true', () => {
    const toggle = jest.fn();
    const fullScreenMode = true;
    const showFullScreenButton = true;
    const headerComponent = createHeader({ toggle, fullScreenMode, showFullScreenButton });
    expect(headerComponent.find('.rw-fullScreenExitImage')).toHaveLength(1);
  });

  it('should not render the fullscreen toggle button when showFullScreenButton = false', () => {
    const toggle = jest.fn();
    const fullScreen = true;
    const showFullScreenButton = false;
    const headerComponent = createHeader({ toggle, fullScreen, showFullScreenButton });
    expect(headerComponent.find('.rw-toggle-fullscreen-button')).toHaveLength(0);
  });
});

describe('<Header> chat reset', () => {
  const createHeaderWithReset = ({ reset, showResetChatButton, restartChat = false }) =>
    mount(
      <Header
        resetChat={reset}
        showResetChatButton={showResetChatButton}
        restartOnChatReset={restartChat}
      />
    );

  it('should call resetChat prop when reset button is clicked', () => {
    const reset = jest.fn();
    const showResetChatButton = true;
    const headerComponent = createHeaderWithReset({ reset, showResetChatButton });
    headerComponent.find('.rw-delete-history-button').simulate('click');
    expect(reset).toBeCalled();
  });

  it('should not render reset button when showResetChatButton = false', () => {
    const reset = jest.fn();
    const showResetChatButton = false;
    const headerComponent = createHeaderWithReset({ reset, showResetChatButton });
    expect(headerComponent.find('.rw-delete-history-button')).toHaveLength(0);
  });

  it('should show restart icon if conversation will restart after reset', () => {
    const reset = jest.fn();
    const showResetChatButton = true;
    const restartChat = true;
    const headerComponent = createHeaderWithReset({ reset, showResetChatButton, restartChat });
    expect(headerComponent.find('.rw-delete-history-button')).toHaveLength(1);
    const button = headerComponent.find('.rw-delete-history-button');
    expect(button.find('.fa-history')).toHaveLength(1);
  });

  it('should show trash can icon based if conversation will only reset and not restart', () => {
    const reset = jest.fn();
    const showResetChatButton = true;
    const restartChat = false;
    const headerComponent = createHeaderWithReset({ reset, showResetChatButton, restartChat });
    expect(headerComponent.find('.rw-delete-history-button')).toHaveLength(1);
    const button = headerComponent.find('.rw-delete-history-button');
    expect(button.find('.fa-trash')).toHaveLength(1);
  });
});
