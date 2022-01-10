import React, { PureComponent } from 'react';
import { PROP_TYPES } from 'constants';

import './styles.scss';

class Snippet extends PureComponent {
  render() {
    const { message } = this.props;
    return (
      <div className="rw-snippet">
        <b className="rw-snippet-title">
          { message.get('title') }
        </b>
        <div className="rw-snippet-details">
          <a href={message.get('link')} target={message.get('target')} className="rw-link">
            { message.get('content') }
          </a>
        </div>
      </div>
    );
  }
}

Snippet.propTypes = {
  message: PROP_TYPES.SNIPPET
};

export default Snippet;
