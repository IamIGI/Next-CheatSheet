import { useRouter } from 'next/router';

function ClientsProjectPage() {
  const router = useRouter();

  function loadProjectHandler() {
    //load data ...
    // router.push('/clients/max/projectA');
    router.push({
      pathname: '/clients/[clientId]/[clientProjectId]',
      query: { clientId: 'max', clientProjectId: 'projectB' },
    });
  }

  return (
    <div>
      <h1>The ClientsProject Page</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientsProjectPage;
