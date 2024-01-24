import { Fragment } from 'react';
import serverUtil from '../utils/server.util';

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  //required if user type page in browser url
  if (!loadedProduct) {
    return <>loading...</>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await serverUtil.getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await serverUtil.getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: pathsWithParams,
    // fallback: false, //USE IT ONLY WHEN you have all possible dynamic paths declared in 'paths' key
    fallback: true, // when no in paths, then load on client side, you have to have own loading functionality
    // fallback: 'blocking', // read on chatGPT, when no in paths, then load on client side, show build in loading
  };
}

export default ProductDetailPage;
