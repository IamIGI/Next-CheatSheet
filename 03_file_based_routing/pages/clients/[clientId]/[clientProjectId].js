import { useRouter } from 'next/router';

function ClientsSelectedProjectPage() {
  const router = useRouter();
  // Try: http://localhost:3000/clients/Igor/HotShot
  console.log(router);
  console.log(router.query);

  return (
    <div>
      <h1>The ClientsSelectedProject Page</h1>
    </div>
  );
}

export default ClientsSelectedProjectPage;
