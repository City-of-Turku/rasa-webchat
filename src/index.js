import React, { forwardRef, useRef } from 'react';

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Widget from './components/Widget';
import { initStore } from './store/store';
import socket from './socket';
import ThemeContext from './components/Widget/ThemeContext';
// eslint-disable-next-line import/no-mutable-exports

class Socket {
  constructor(
    url,
    customData,
    path,
    protocol,
    protocolOptions,
    onSocketEvent
  ) {
    this.url = url;
    this.customData = customData;
    this.path = path;
    this.protocol = protocol;
    this.protocolOptions = protocolOptions;
    this.onSocketEvent = onSocketEvent;
    this.socket = null;
    this.onEvents = [];
    this.marker = Math.random();
  }

  isInitialized() {
    return this.socket !== null && this.socket.connected;
  }

  on(event, callback) {
    if (!this.socket) {
      this.onEvents.push({ event, callback });
    } else {
      this.socket.on(event, callback);
    }
  }

  emit(message, data) {
    if (this.socket) {
      this.socket.emit(message, data);
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }

  updateSocketCustomData(data) {
    if (this.socket) {
      this.customData = { ...this.customData, ...data };
    }
  }

  createSocket() {
    this.socket = socket(
      this.url,
      this.customData,
      this.path,
      this.protocol,
      this.protocolOptions
    );
    // We set a function on session_confirm here so as to avoid any race condition
    // this will be called first and will set those parameters for everyone to use.
    this.socket.on('session_confirm', (sessionObject) => {
      this.sessionConfirmed = true;
      this.sessionId = (sessionObject && sessionObject.session_id)
        ? sessionObject.session_id
        : sessionObject;
    });
    this.onEvents.forEach((event) => {
      this.socket.on(event.event, event.callback);
    });

    this.onEvents = [];
    Object.keys(this.onSocketEvent).forEach((event) => {
      this.socket.on(event, this.onSocketEvent[event]);
    });
  }
}

const ConnectedWidget = forwardRef((props, ref) => {
  const instanceSocket = useRef({});
  const store = useRef(null);

  if (!instanceSocket.current.url && !(store && store.current && store.current.socketRef)) {
    instanceSocket.current = new Socket(
      props.socketUrl,
      props.customData,
      props.socketPath,
      props.protocol,
      props.protocolOptions,
      props.onSocketEvent
    );
  }

  if (!instanceSocket.current.url && store && store.current && store.current.socketRef) {
    instanceSocket.current = store.socket;
  }

  const storage = props.params.storage === 'session' ? sessionStorage : localStorage;

  if (!store || !store.current) {
    store.current = initStore(
      props.connectingText,
      instanceSocket.current,
      storage,
      props.docViewer,
      props.onWidgetEvent
    );
    store.current.socketRef = instanceSocket.current.marker;
    store.current.socket = instanceSocket.current;
  }
  return (
    <Provider store={store.current}>
      <ThemeContext.Provider
        value={{
          mainColor: props.mainColor,
          conversationBackgroundColor: props.conversationBackgroundColor,
          userTextColor: props.userTextColor,
          userBackgroundColor: props.userBackgroundColor,
          assistTextColor: props.assistTextColor,
          assistBackgroundColor: props.assistBackgroundColor,
          showCarouselImages: props.showCarouselImages,
          showIconsOnWeblinks: props.showIconsOnWeblinks,
          carouselCardsBackground: props.carouselCardsBackground,
          carouselCardsTextColor: props.carouselCardsTextColor,
          carouselCardsButtonBackground: props.carouselCardsButtonBackground,
          carouselCardsButtonText: props.carouselCardsButtonText,
          carouselControlsBackground: props.carouselControlsBackground,
          carouselControlsIconColor: props.carouselControlsIconColor,
        }}>
        <Widget
          ref={ref}
          initPayload={props.initPayload}
          title={props.title}
          subtitle={props.subtitle}
          customData={props.customData}
          handleNewUserMessage={props.handleNewUserMessage}
          profileAvatar={props.profileAvatar}
          showCloseButton={props.showCloseButton}
          showFullScreenButton={props.showFullScreenButton}
          showResetChatButton={props.showResetChatButton}
          restartOnChatReset={props.restartOnChatReset}
          newIdOnChatReset={props.newIdOnChatReset}
          resetPayload={props.resetPayload}
          resetChatConfirmTitle={props.resetChatConfirmTitle}
          resetChatConfirmSubtitle={props.resetChatConfirmSubtitle}
          resetChatConfirmButton={props.resetChatConfirmButton}
          resetChatCancelButton={props.resetChatCancelButton}
          hideWhenNotConnected={props.hideWhenNotConnected}
          connectOn={props.connectOn}
          autoClearCache={props.autoClearCache}
          fullScreenMode={props.fullScreenMode}
          badge={props.badge}
          embedded={props.embedded}
          params={props.params}
          storage={storage}
          inputTextFieldHint={props.inputTextFieldHint}
          openLauncherImage={props.openLauncherImage}
          closeImage={props.closeImage}
          customComponent={props.customComponent}
          displayUnreadCount={props.displayUnreadCount}
          socket={instanceSocket.current}
          showMessageDate={props.showMessageDate}
          customMessageDelay={props.customMessageDelay}
          tooltipPayload={props.tooltipPayload}
          tooltipDelay={props.tooltipDelay}
          disableTooltips={props.disableTooltips}
          defaultHighlightCss={props.defaultHighlightCss}
          defaultHighlightAnimation={props.defaultHighlightAnimation}
          defaultHighlightClassname={props.defaultHighlightClassname}
        />
      </ThemeContext.Provider>
    </Provider>
  );
});

ConnectedWidget.propTypes = {
  initPayload: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  protocol: PropTypes.string,
  socketUrl: PropTypes.string.isRequired,
  socketPath: PropTypes.string,
  protocolOptions: PropTypes.shape({}),
  customData: PropTypes.shape({}),
  handleNewUserMessage: PropTypes.func,
  profileAvatar: PropTypes.string,
  inputTextFieldHint: PropTypes.string,
  connectingText: PropTypes.string,
  showCloseButton: PropTypes.bool,
  showFullScreenButton: PropTypes.bool,
  showResetChatButton: PropTypes.bool,
  restartOnChatReset: PropTypes.bool,
  newIdOnChatReset: PropTypes.bool,
  resetPayload: PropTypes.string,
  resetChatConfirmTitle: PropTypes.string,
  resetChatConfirmSubtitle: PropTypes.string,
  resetChatConfirmButton: PropTypes.string,
  resetChatCancelButton: PropTypes.string,
  hideWhenNotConnected: PropTypes.bool,
  connectOn: PropTypes.oneOf(['mount', 'open']),
  autoClearCache: PropTypes.bool,
  onSocketEvent: PropTypes.objectOf(PropTypes.func),
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number,
  embedded: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  params: PropTypes.object,
  openLauncherImage: PropTypes.string,
  closeImage: PropTypes.string,
  docViewer: PropTypes.bool,
  customComponent: PropTypes.func,
  displayUnreadCount: PropTypes.bool,
  showMessageDate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  customMessageDelay: PropTypes.func,
  tooltipPayload: PropTypes.string,
  tooltipDelay: PropTypes.number,
  onWidgetEvent: PropTypes.shape({
    onChatOpen: PropTypes.func,
    onChatClose: PropTypes.func,
    onChatVisible: PropTypes.func,
    onChatHidden: PropTypes.func,
    onChatReset: PropTypes.func,
  }),
  disableTooltips: PropTypes.bool,
  defaultHighlightCss: PropTypes.string,
  defaultHighlightAnimation: PropTypes.string,
  defaultHighlightClassname: PropTypes.string,
  mainColor: PropTypes.string,
  conversationBackgroundColor: PropTypes.string,
  userTextColor: PropTypes.string,
  userBackgroundColor: PropTypes.string,
  assistTextColor: PropTypes.string,
  assistBackgroundColor: PropTypes.string,
  showCarouselImages: PropTypes.bool,
  showIconsOnWeblinks: PropTypes.bool,
  carouselCardsBackground: PropTypes.string,
  carouselCardsTextColor: PropTypes.string,
  carouselCardsButtonBackground: PropTypes.string,
  carouselCardsButtonText: PropTypes.string,
  carouselControlsBackground: PropTypes.string,
  carouselControlsIconColor: PropTypes.string,
};

ConnectedWidget.defaultProps = {
  title: 'Welcome',
  customData: {},
  inputTextFieldHint: 'Type a message...',
  connectingText: 'Waiting for server...',
  fullScreenMode: false,
  hideWhenNotConnected: true,
  autoClearCache: false,
  connectOn: 'mount',
  onSocketEvent: {},
  protocol: 'socketio',
  // eslint-disable-next-line react/default-props-match-prop-types
  socketUrl: 'http://localhost',
  protocolOptions: {},
  badge: 0,
  embedded: false,
  params: {
    storage: 'local',
  },
  docViewer: false,
  showCloseButton: true,
  showFullScreenButton: false,
  showResetChatButton: false,
  restartOnChatReset: true,
  newIdOnChatReset: false,
  displayUnreadCount: false,
  showMessageDate: false,
  customMessageDelay: (message) => {
    let delay = message.length * 30;
    if (delay > 3 * 1000) delay = 3 * 1000;
    if (delay < 800) delay = 800;
    return delay;
  },
  tooltipPayload: null,
  tooltipDelay: 500,
  onWidgetEvent: {
    onChatOpen: () => {},
    onChatClose: () => {},
    onChatVisible: () => {},
    onChatHidden: () => {},
    onChatReset: () => {},
  },
  disableTooltips: false,
  mainColor: '',
  conversationBackgroundColor: '',
  userTextColor: '',
  userBackgroundColor: '',
  assistTextColor: '',
  assistBackgroundColor: '',
  showIconsOnWeblinks: true,
  showCarouselImages: true,
  carouselCardsBackground: '',
  carouselCardsTextColor: '',
  carouselCardsButtonBackground: '',
  carouselCardsButtonText: '',
  carouselControlsBackground: '',
  carouselControlsIconColor: '',
};

export default ConnectedWidget;
