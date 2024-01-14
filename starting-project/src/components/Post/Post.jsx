import classes from './Post.module.css';

function Post({ author, body }) {
  return (
    <li className={classes.post}>
      <h1>{author}</h1>
      <p>{body}</p>
    </li>
  );
}

export default Post;
