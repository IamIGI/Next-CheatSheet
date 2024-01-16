import { Link } from 'react-router-dom';
import classes from './Post.module.css';

function Post({ id, author, body }) {
  return (
    <li className={classes.post}>
      <Link to={id}>
        <h1>{author}</h1>
        <p>{body}</p>
      </Link>
    </li>
  );
}

export default Post;
