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
    title,
    message: subtitle,
    buttons: [
      {
        label: confirmButtonText,
        onClick: () => confirmButtonCallback(),
      },
      {
        label: cancelButtonText,
        onClick: () => cancelButtonCallback(),
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    overlayClassName: 'rw-confirm-dialog',
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
