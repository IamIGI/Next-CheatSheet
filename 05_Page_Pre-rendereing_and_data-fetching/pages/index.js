import Link from 'next/link';
import serverUtil from '../utils/server.util';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {' '}
          <Link href={`/${product.id}`}>{product.title}</Link>{' '}
        </li>
      ))}
    </ul>
  );
}

// Code that would run before page / component is rendered
// This code is not ship to client side
export async function getStaticProps() {
  console.log('ReGenerating');
  const data = await serverUtil.getData();

  if (!data) return { notFound: true };

  if (data.products.length === 0)
    return { redirect: { destination: '/no-data' } };

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;

// revalidate - how it works-----------------
// - If data changes, the page is re-generated.
// - If data doesn't change, the existing HTML is served during the specified revalidate period.
// - If the revalidate period elapses, and the data still hasn't changed, the page is re-generated.
