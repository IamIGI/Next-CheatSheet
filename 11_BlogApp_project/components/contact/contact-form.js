import classes from './contact-form.module.css';
import { useEffect, useState } from 'react';
import Notification from '../../ui/notification';

async function sendContactData(contactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
}

function ContactForm() {
  // we could use useRef
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(null); // 'pending, 'success', 'error'
  const [requestError, setRequestError] = useState(undefined);

  useEffect(() => {
    let timer;
    if (requestStatus === 'error' || requestStatus === 'success') {
      timer = setTimeout(() => {
        setRequestError(undefined);
        setRequestStatus(null);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [requestStatus]);
  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus('pending');

    const data = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };

    // client-side validation
    // ---
    try {
      await sendContactData(data);
      setRequestStatus('success');
      setEnteredEmail('');
      setEnteredMessage('');
      setEnteredName('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification;
  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message....',
      message: 'Your message is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Message send successfully!',
      message: 'You message was saved into your db',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Message send failure!',
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            ></input>
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit">Send message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
