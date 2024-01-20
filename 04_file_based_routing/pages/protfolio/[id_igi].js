import { useRouter } from 'next/router';

function PortfolioProjectPage() {
  const router = useRouter();

  console.log(router);
  console.log(router.query);

  return (
    <div>
      <h1>The PortfolioProject Page</h1>
    </div>
  );
}

export default PortfolioProjectPage;
