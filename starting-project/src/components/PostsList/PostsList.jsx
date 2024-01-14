import NewPost from '../NewPost/NewPost';
import Post from '../Post/Post';
import classes from './PostsList.module.css';
import Modal from '../Modal/Modal';
import { useEffect, useState } from 'react';

function PostsList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);

  function addPostHandler(postData) {
    setPosts((prev) => [postData, ...prev]);
  }
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map(({ author, body }, index) => (
            <Post key={index} author={author} body={body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>No Posts yet</h2>
        </div>
      )}
    </>
  );
}

export default PostsList;
