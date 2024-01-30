import dbService from '../../../lib/service/db.service';
import authUtil from '../../../lib/utils/auth.util';
import validationUtil from '../../../lib/utils/validation.util';

async function handler(req, res) {
  if (req.method !== 'POST') return;

  const data = req.body;
  const { email, password } = data;

  const client = await dbService.connectDatabase();
  const db = client.db();

  if (validationUtil.userValidation(email, password)) {
    res.status(422).json({
      message:
        'Invalid input - password should be at least 6 characters long.  ',
    });
    client.close();
    return;
  }

  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }

  const hashedPassword = await authUtil.hashPassword(password);

  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'Created user!' });
  client.close();
}

export default handler;
