import DBConnect from '../../../helpers/DB-connect';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await DBConnect.connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the DB failed!' });
    return;
  }

  if (req.method === 'POST') {
    //  add server-side validataion;
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid email address' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await DBConnect.insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: 'Message added successfully', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comemnts failed' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await DBConnect.getAllDocuments(
        client,
        'comments',
        {
          _id: -1,
        },
        { eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Failed to getting comments from DB' });
    }
  }

  client.close();
}

export default handler;
