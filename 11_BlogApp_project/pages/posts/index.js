import AllPosts from '../../components/posts/all-posts';

const DUMMY_POSTS = [
  {
    slug: 'getting-started-with-nextJs',
    title: 'Getting started with NextJs',
    image: 'getting-started-nextjs.png',
    excerpt:
      'getting-started-with-NextJs excerpt that is long and you should use loremIpsum',
    date: '2023-02-10',
  },
  {
    slug: 'getting-started-with-nextJs2',
    title: 'Getting started with NextJs',
    image: 'getting-started-nextjs.png',
    excerpt:
      'getting-started-with-NextJs excerpt that is long and you should use loremIpsum',
    date: '2023-02-10',
  },
  {
    slug: 'getting-started-with-nextJs3',
    title: 'Getting started with NextJs',
    image: 'getting-started-nextjs.png',
    excerpt:
      'getting-started-with-NextJs excerpt that is long and you should use loremIpsum',
    date: '2023-02-10',
  },
  {
    slug: 'getting-started-with-nextJs4',
    title: 'Getting started with NextJs',
    image: 'getting-started-nextjs.png',
    excerpt:
      'getting-started-with-NextJs excerpt that is long and you should use loremIpsum',
    date: '2023-02-10',
  },
];
function AllPostsPage() {
  return <AllPosts posts={DUMMY_POSTS} />;
}

export default AllPostsPage;
