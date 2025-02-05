import React, { useState, useCallback } from 'react';
import './QuestionGenerator.css';

const QuestionGenerator = () => {
  const [question, setQuestion] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [topic, setTopic] = useState('general');
  const [stats, setStats] = useState({
    questionsGenerated: 0,
    positiveFeedback: 0,
    currentStreak: 0
  });

  // Sample topics
  const topics = [
    { value: 'general', label: 'General Knowledge' },
    { value: 'science', label: 'Science' },
    { value: 'math', label: 'Mathematics' },
    { value: 'history', label: 'History' },
    { value: 'custom', label: 'Custom Topic' }
  ];

  const generateQuestion = useCallback(async () => {
    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, difficulty, customPrompt }),
      });

      const data = await response.json();
      if (data.question) {
        setQuestion(data.question);
        setStats((prev) => ({
          ...prev,
          questionsGenerated: prev.questionsGenerated + 1
        }));
      } else {
        setFeedback('Error generating question');
      }
    } catch (error) {
      console.error('Error:', error);
      setFeedback('Error generating question');
    } finally {
      setLoading(false);
    }
  }, [difficulty, topic, customPrompt]);

  return (
    <div className="question-container">
      <header className="header">
        <h1 className="main-title">
          <i className='bx bx-brain'></i>
          AI Question Generator
        </h1>
        <p className="subtitle">Generate custom questions based on topics and difficulty</p>
      </header>

      <div className="question-card">
        <div className="controls-section">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value">{stats.questionsGenerated}</div>
              <div className="stat-label">Questions Generated</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.currentStreak}</div>
              <div className="stat-label">Current Streak</div>
            </div>
          </div>

          {/* Topic Selection */}
          <div className="control-group">
            <label className="control-label">
              <i className='bx bx-book-content'></i>
              Select Topic
            </label>
            <select
              className="control-select"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (e.target.value !== 'custom') {
                  setCustomPrompt('');
                }
              }}
            >
              {topics.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Custom Prompt Input */}
          {topic === 'custom' && (
            <div className="control-group">
              <label className="control-label">
                <i className='bx bx-edit'></i>
                Enter Your Topic/Prompt
              </label>
              <input
                type="text"
                className="control-input"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter your topic or specific prompt..."
              />
            </div>
          )}

          {/* Difficulty Selection */}
          <div className="control-group">
            <label className="control-label">
              <i className='bx bx-slider-alt'></i>
              Difficulty Level
            </label>
            <select
              className="control-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button
            className="generate-button"
            onClick={generateQuestion}
            disabled={loading || (topic === 'custom' && !customPrompt.trim())}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Generating...
              </>
            ) : (
              <>
                <i className='bx bx-refresh'></i>
                Generate Question
              </>
            )}
          </button>
        </div>

        <div className="question-display-section">
          {question && (
            <div className="question-display">
              <p className="question-text">
                <i className='bx bx-bulb' style={{ marginRight: '10px' }}></i>
                {question}
              </p>
              
              <div className="feedback-section">
                <button
                  className="feedback-button"
                  onClick={() => setFeedback(false)}
                  disabled={feedback !== null}
                >
                  <i className='bx bx-x'></i>
                  Not Good
                </button>
                <button
                  className="feedback-button"
                  onClick={() => setFeedback(true)}
                  disabled={feedback !== null}
                >
                  <i className='bx bx-check'></i>
                  Good Question
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionGenerator;
