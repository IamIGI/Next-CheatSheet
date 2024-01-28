import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  // comments db
  const client = await MongoClient.connect(
    'mongodb+srv://NextUser:NextPassword@cluster0.xgqtc.mongodb.net/events?retryWrites=true&w=majority'
  );

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
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();

    const result = await db.collection('comments').insertOne(newComment);

    newComment.id = result.insertedId;
    res
      .status(201)
      .json({ message: 'Message added successfully', comment: newComment });
  }

  if (req.method === 'GET') {
    const dumyyList = [
      { id: 'c1', name: 'Igor', text: 'A first comments' },
      { id: 'c2', name: 'Eric', text: 'A second comments' },
    ];
    console.log(dumyyList);
    res.status(200).json({ comments: dumyyList });
  }

  client.close();
}

export default handler;
