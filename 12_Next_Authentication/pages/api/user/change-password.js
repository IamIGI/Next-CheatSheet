import { getServerSession } from 'next-auth';

import dbService, { DbCollections } from '../../../lib/service/db.service';
import authUtil from '../../../lib/utils/auth.util';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req, res) {
  if (req.method !== 'PATCH') return;

  const session = await getServerSession(req, res, authOptions);

  //   Validate whether the request is validated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (oldPassword === newPassword) {
    res.status(404).json({ message: 'Passwords are the same' });
    return;
  }

  const client = await dbService.connectDatabase();
  const user = await dbService.findOneRecord(client, DbCollections.Users, {
    email: userEmail,
  });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await authUtil.verifyPassword(
    oldPassword,
    currentPassword
  );
  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'User not provided his/her old password' });
    client.close();
    return;
  }

  const hashedPassword = await authUtil.hashPassword(newPassword);

  const result = await client
    .db()
    .collection(DbCollections.Users)
    .updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
