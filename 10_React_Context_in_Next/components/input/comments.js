import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();
  const [refreshComments, setRefreshComments] = useState(false);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }

    setRefreshComments(false);
  }, [showComments, refreshComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored in db',
      status: 'pending',
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          setRefreshComments(true);
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully added new comment!',
          status: 'success',
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: err.message || 'Something went wrong',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments &&
        comments &&
        comments.length > 0 &&
        !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
