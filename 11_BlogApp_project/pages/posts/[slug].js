import Head from 'next/head';
import PostContent from '../../components/posts/post-detail/post-content';
import postsUtil from '../../lib/posts-util';

function PostDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt}></meta>
      </Head>
      <PostContent post={props.post} />;
    </>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = postsUtil.getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600, // 10min
  };
}

export function getStaticPaths() {
  const postFilenames = postsUtil.getPostsFiles();

  const slugs = postFilenames.map((filename) => filename.replace(/\.md$/, ''));

  //   pregenerated page foo all out posts
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
