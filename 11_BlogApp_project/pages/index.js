import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import postsUtil from '../lib/posts-util';

function HomePage(props) {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = postsUtil.getFeaturedPosts();
  console.log(featuredPosts);
  return {
    props: {
      posts: featuredPosts,
    },
    // revalidate: 60,
  };
}

export default HomePage;
