import Post from '../Post/Post';
import { useLoaderData } from 'react-router-dom';
import classes from './PostsList.module.css';

function PostsList() {
  // get the first loader assign to this router (right now is parent router)
  const posts = useLoaderData();

  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map(({ author, body, id }, index) => (
            <Post key={index} id={id} author={author} body={body} />
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
