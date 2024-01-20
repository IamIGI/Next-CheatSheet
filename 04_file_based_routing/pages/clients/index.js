import Link from 'next/link';

function ClientsPage() {
  const clients = [
    { id: 'max', name: 'Maximilian' },
    {
      id: 'igor',
      name: 'Igor',
    },
  ];

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((client, index) => (
          <li ket={client}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
            {/* Navigate with url query */}
            {/* <Link
              href={{
                pathname: '/clients/[]',
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
