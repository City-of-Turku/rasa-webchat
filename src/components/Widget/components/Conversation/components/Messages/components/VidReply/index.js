import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';

import './styles.scss';

class VidReply extends PureComponent {
  render() {
    const { message } = this.props;
    return (
      <div className="rw-video">
        <b className="rw-video-title">
          { message.get('title') }
        </b>
        <div className="rw-video-details">
          <iframe title={message.get('title')} src={message.get('video')} className="rw-videoFrame" />
        </div>
      </div>
    );
  }
}

VidReply.propTypes = {
  message: PROP_TYPES.VIDREPLY
};

export default VidReply;
