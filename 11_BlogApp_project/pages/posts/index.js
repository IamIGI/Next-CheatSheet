import AllPosts from '../../components/posts/all-posts';
import postsUtil from '../../lib/posts-util';

function AllPostsPage(props) {
  return <AllPosts posts={props.posts} />;
}

export function getStaticProps() {
  const allPosts = postsUtil.getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    // revalidate: 60,
  };
}

export default AllPostsPage;
