import Head from 'next/head';
import AllPosts from '../../components/posts/all-posts';
import postsUtil from '../../lib/posts-util';

function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="List of all programming realted tutorials"
        ></meta>
      </Head>
      <AllPosts posts={props.posts} />;
    </>
  );
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
