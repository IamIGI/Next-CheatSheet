import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  console.log(eventId);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();

  useEffect(() => {
    if (showComments) {
      console.log('showComments');
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setComments(data.comments);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && comments && comments.length > 0 && (
        <CommentList items={comments} />
      )}
    </section>
  );
}

export default Comments;
