import { useRouter } from 'next/router';

function BlogPostsPage() {
  // [...slug] - slug is your chosen name, but '...' means to CATCH ALL dynamic ULR's
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>The BlogPosts Page</h1>
    </div>
  );
}

export default BlogPostsPage;
