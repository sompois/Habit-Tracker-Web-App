function CommitmentPlanner({
  habits,
  commitments,
  onToggleCommitment,
  onSetMode,
  onSetReason
}) {
  const selectedIds = new Set(commitments.map(item => item.habitId));

  return (
    <section className="editorial-panel commitment-panel">
      <div className="section-heading-row">
        <div>
          <p className="bracket-label bracket-label--green">{'{ Today\'s Promises }'}</p>
          <h2 className="section-title">Choose less. Keep your word.</h2>
        </div>
        <div className="commitment-count" aria-label={commitments.length + ' of 3 commitments selected'}>
          <strong>{commitments.length}</strong>
          <span>/ 3 selected</span>
        </div>
      </div>

      <p className="section-intro commitment-intro">
        Pick only what you are prepared to protect today. If the day changes, reduce the promise instead of abandoning it.
      </p>

      <div className="commitment-picker" aria-label="Choose today's commitments">
        {habits.map((habit) => {
          const selected = selectedIds.has(habit.id);
          const disabled = !selected && commitments.length >= 3;

          return (
            <button
              key={habit.id}
              type="button"
              className={'commitment-option' + (selected ? ' is-selected' : '')}
              onClick={() => onToggleCommitment(habit.id)}
              disabled={disabled}
              aria-pressed={selected}
            >
              <span className="commitment-option-icon" aria-hidden="true">{habit.icon || '○'}</span>
              <span className="commitment-option-copy">
                <strong>{habit.name}</strong>
                <small>{selected ? 'Today\'s promise' : disabled ? 'Limit reached' : 'Add to today'}</small>
              </span>
              <span className="commitment-option-mark" aria-hidden="true">{selected ? '✓' : '+'}</span>
            </button>
          );
        })}
      </div>

      {commitments.length > 0 && (
        <div className="commitment-details">
          <div className="commitment-details-heading">
            <span>Promise</span>
            <span>Version</span>
          </div>

          {commitments.map((commitment, index) => {
            const habit = habits.find(item => item.id === commitment.habitId);
            if (!habit) return null;

            return (
              <article key={commitment.habitId} className="commitment-row">
                <div className="commitment-row-copy">
                  <span className="commitment-index">0{index + 1}</span>
                  <div>
                    <h3>{habit.name}</h3>
                    <p>
                      {commitment.mode === 'minimum'
                        ? (habit.minimum || 'Do the smallest version that still counts.')
                        : (habit.description || 'Complete the habit as planned.')}
                    </p>
                  </div>
                </div>

                <div className="commitment-controls">
                  <div className="mode-switch" aria-label={'Commitment version for ' + habit.name}>
                    <button
                      type="button"
                      className={commitment.mode === 'full' ? 'is-active' : ''}
                      onClick={() => onSetMode(habit.id, 'full')}
                    >
                      Full
                    </button>
                    <button
                      type="button"
                      className={commitment.mode === 'minimum' ? 'is-active minimum' : 'minimum'}
                      onClick={() => onSetMode(habit.id, 'minimum')}
                    >
                      Minimum
                    </button>
                  </div>

                  {commitment.mode === 'minimum' && (
                    <label className="adjustment-field">
                      <span>Why adjust?</span>
                      <select
                        value={commitment.reason || ''}
                        onChange={(event) => onSetReason(habit.id, event.target.value)}
                      >
                        <option value="">Choose a reason</option>
                        <option value="schedule">Schedule changed</option>
                        <option value="time">Not enough time</option>
                        <option value="energy">Low energy</option>
                        <option value="unexpected">Unexpected work</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="commitment-note">
        <span>{'{ Rule }'}</span>
        <p>A minimum version still counts as keeping the promise. The goal is reliability, not perfection.</p>
      </div>
    </section>
  );
}

export default CommitmentPlanner;
