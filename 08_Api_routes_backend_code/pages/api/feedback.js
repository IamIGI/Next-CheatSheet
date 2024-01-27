//api folder - this folder name is required
import fs from 'fs';
import fileUtils from '../../utils/file.utils';

function handler(req, res) {
  if (req.method === 'POST') {
    const { email, feedbackText } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    };

    // store in database
    const filePath = fileUtils.buildFeedbackPath();
    const data = fileUtils.extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(200).json({ message: 'Success!', feedback: newFeedback });
  } else {
    const filePath = fileUtils.buildFeedbackPath();
    const data = fileUtils.extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
