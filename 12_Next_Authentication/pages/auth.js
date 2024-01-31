import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  // We could use of course  function getServerSideProps(context) instead of fixing this on client side
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    router.replace('/');
  }

  if (status === 'loading') {
    return <p className="center">Loading...</p>;
  }

  return <AuthForm />;
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }
//   return { props: {} };
// }

export default AuthPage;
