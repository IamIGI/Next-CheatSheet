import fs from 'fs';
import path from 'path';

function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

export default {
  buildFeedbackPath,
  extractFeedback,
};
