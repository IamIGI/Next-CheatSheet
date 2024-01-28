import DBConnect from '../../helpers/DB-connect';

async function handler(req, res) {
  if ((req.method = 'POST')) {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    let client;
    try {
      client = await DBConnect.connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the DB failed!' });
      return;
    }

    try {
      await DBConnect.insertDocument(client, 'newsletter', {
        email: userEmail,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
