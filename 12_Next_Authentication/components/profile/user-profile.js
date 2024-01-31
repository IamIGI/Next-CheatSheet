// import { useRouter } from 'next/router';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
// import { useSession } from 'next-auth/react';
// import { useEffect } from 'react';

function UserProfile() {
  // const router = useRouter();
  // const { data: session, status } = useSession();

  // if (status === 'unauthenticated') {
  //   // For the sake of using the "reacty way" and consistency, using router would be better.
  //   // window.location.href = '/auth';
  //   router.push('/auth');
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
