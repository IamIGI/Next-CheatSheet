import { useState } from 'react';
import fileUtils from '../../utils/file.utils';

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  async function loadFeedbackHandler(id) {
    const response = await fetch(`/api/${id}`);
    const data = await response.json();
    setFeedbackData(data.feedback);
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {/* bind allows to preconfigure execution */}
            {item.text}{' '}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  // -------- This will work only for external API's --------
  //   const response = await fetch('/api/feedback');
  //   const data = response.json();

  const filePath = fileUtils.buildFeedbackPath();
  const data = fileUtils.extractFeedback(filePath);
  console.log(data);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
