import Head from 'next/head';
import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import postsUtil from '../lib/posts-util';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Igor'Blog</title>
        <meta
          name="description"
          content="I post about programming and web development"
        ></meta>
      </Head>
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
