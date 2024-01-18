export default function BlogPostPage({ params }) {
  return (
    <main>
      <h1>Blog page</h1>
      {/* [slug] - we tell that we want to have dynamic route, but we don't know the name */}
      <p>{JSON.stringify(params)}</p>
      <p>{params.slug}</p>
    </main>
  );
}
