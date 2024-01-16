import { useNavigate } from 'react-router-dom';

import classes from './Modal.module.css';

function Modal({ children }) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('/');
    // navigate('..'); // go to route above
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      {/* dialog -> open - set visible dialog */}
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
