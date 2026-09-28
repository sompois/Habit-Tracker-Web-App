import { useEffect, useState } from 'react';

function ProgressBar({ completed, total, mode = 'habits' }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const isCommitmentMode = mode === 'commitments';

  return (
    <section className="progress-section">
      <div className="progress-copy">
        <p className="bracket-label bracket-label--orange">
          {isCommitmentMode ? '{ Promise Reliability }' : '{ Today }'}
        </p>
        <div className="progress-stat">
          <span className="progress-number">{percentage}%</span>
          <span className="progress-context">
            {isCommitmentMode
              ? completed + ' of ' + total + ' promises kept'
              : completed + ' of ' + total + ' habits completed'}
          </span>
        </div>
      </div>

      <div className="progress-track" aria-label={percentage + ' percent complete'}>
        <div
          className={'progress-fill' + (percentage === 100 && total > 0 ? ' is-complete' : '')}
          style={{ width: animatedPercentage + '%' }}
        />
      </div>
    </section>
  );
}

export default ProgressBar;
