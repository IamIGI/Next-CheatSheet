import fileUtils from '../../utils/file.utils';

function handler(req, res) {
  console.log('triggerd');
  if (req.method === 'GET') {
    const feedbackId = req.query.feedbackId;
    const filePath = fileUtils.buildFeedbackPath();
    const feedbackData = fileUtils.extractFeedback(filePath);
    const selectedFeedback = feedbackData.find(
      (feedback) => feedback.id === feedbackId
    );

    res.status(200).json({ feedback: selectedFeedback });
    return;
  }
  res.status(500).json({ error: 'Internal Server error' });
}

export default handler;
