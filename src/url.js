const BASE_URL = "http://130.61.208.173:5000";

const API_URLS = {
  // meeting
  getTranscripts: (meetingId) => `${BASE_URL}/transcription/${meetingId}`,
  getSummary: (meetingId) => `${BASE_URL}/summary/${meetingId}`,
  getActionItem: (meetingId) => `${BASE_URL}/action_item/${meetingId}`,
  getSentimentAnalysis: (meetingId) =>
    `${BASE_URL}/sentiment_analysis/${meetingId}`,
  getEfficiencyMetric: (meetingId) =>
    `${BASE_URL}/efficiency_metric/${meetingId}`,
  getSentimentScore: (meetingId) => `${BASE_URL}/sentiment_score/${meetingId}`,
  getKeypoint: (meetingId) => `${BASE_URL}/keypoint/${meetingId}`,
  getMeeting: (userId) => `${BASE_URL}/meeting/${userId}`,
};

export default API_URLS;
