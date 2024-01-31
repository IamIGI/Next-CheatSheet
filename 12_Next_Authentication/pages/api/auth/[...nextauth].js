import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbService from '../../../lib/service/db.service';
import authUtil from '../../../lib/utils/auth.util';

function throwError(client, message) {
  console.log(message);
  client.close();
  //   When we throw error nextAuth by default want's to redirect to errorPage, we can stop that on client side
  // auth-form signIn('credentials', {redirect: false})
  throw new Error(message);
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await dbService.connectDatabase();

        const user = await client
          .db()
          .collection('users')
          .findOne({ email: credentials.email });

        if (!user) throwError(client, 'No user found!');

        const isValid = await authUtil.verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) throwError(client, 'Wrong password');

        client.close();
        //If we return object from authorize method, we let NextAuth know that authorization succeded
        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
