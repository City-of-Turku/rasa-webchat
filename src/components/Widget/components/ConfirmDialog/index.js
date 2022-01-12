import React from 'react';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './style.scss';

const ConfirmDialog = (
  title,
  subtitle,
  confirmButtonText = 'Confirm',
  confirmButtonCallback,
  cancelButtonText = 'Cancel',
  cancelButtonCallback
) =>
  confirmAlert({
    closeOnEscape: true,
    closeOnClickOutside: true,
    overlayClassName: 'rw-confirm-overlay',
    customUI: ({ onClose }) => (
      <div className='rw-confirm-dialog'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className='rw-confirm-button-group'>
          <button
            className='cancel'
            type='button'
            onClick={() => {
              cancelButtonCallback();
              onClose();
            }}>
            {cancelButtonText}
          </button>
          <button
            className='confirm'
            type='button'
            onClick={() => {
              confirmButtonCallback();
              onClose();
            }}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    ),
  });

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  confirmButtonText: PropTypes.string,
  confirmButtonCallback: PropTypes.func,
  cancelButtonText: PropTypes.string,
  cancelButtonCallback: PropTypes.func,
};

export default ConfirmDialog;
