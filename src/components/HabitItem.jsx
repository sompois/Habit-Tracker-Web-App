import { useState } from 'react';

function HabitItem({ habit, commitment, isCompletedToday, streak, onToggleComplete, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);
  const [editDescription, setEditDescription] = useState(habit.description || '');
  const [editMinimum, setEditMinimum] = useState(habit.minimum || '');

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(habit.id, {
      name: editName.trim(),
      description: editDescription.trim(),
      minimum: editMinimum.trim(),
    });
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditName(habit.name);
    setEditDescription(habit.description || '');
    setEditMinimum(habit.minimum || '');
    setIsEditing(false);
  };

  return (
    <article className={'habit-card' + (isCompletedToday ? ' is-complete' : '') + (commitment ? ' is-committed' : '')}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="habit-edit-form habit-edit-form--three">
          <div className="field-group">
            <label htmlFor={'habit-name-' + habit.id}>Habit name</label>
            <input
              id={'habit-name-' + habit.id}
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor={'habit-description-' + habit.id}>Full version</label>
            <input
              id={'habit-description-' + habit.id}
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Full version"
            />
          </div>
          <div className="field-group">
            <label htmlFor={'habit-minimum-' + habit.id}>Minimum version</label>
            <input
              id={'habit-minimum-' + habit.id}
              type="text"
              value={editMinimum}
              onChange={(e) => setEditMinimum(e.target.value)}
              placeholder="Minimum version"
            />
          </div>
          <div className="inline-actions">
            <button type="submit" className="pill-button pill-button--small pill-button--green">Save</button>
            <button type="button" onClick={handleEditCancel} className="pill-button pill-button--small">Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="habit-primary">
            <button
              type="button"
              onClick={() => onToggleComplete(habit.id)}
              className="habit-check"
              aria-label={isCompletedToday ? 'Mark ' + habit.name + ' incomplete' : 'Mark ' + habit.name + ' complete'}
            >
              <span aria-hidden="true">{isCompletedToday ? '✓' : (habit.icon || '○')}</span>
            </button>

            <div className="habit-copy">
              <div className="habit-title-row">
                <h3>{habit.name}</h3>
                <span className="habit-status">{isCompletedToday ? 'complete' : 'open'}</span>
                {commitment && (
                  <span className={'commitment-badge' + (commitment.mode === 'minimum' ? ' is-minimum' : '')}>
                    today · {commitment.mode}
                  </span>
                )}
              </div>

              {habit.description && <p><span className="habit-version-label">Full</span>{habit.description}</p>}
              {habit.minimum && <p><span className="habit-version-label habit-version-label--minimum">Min</span>{habit.minimum}</p>}

              <div className="streak-line">
                <span className="streak-label">streak</span>
                <strong>{streak} day{streak === 1 ? '' : 's'}</strong>
                {streak >= 7 && <span className="achievement">7+</span>}
                {streak >= 30 && <span className="achievement achievement--major">30+</span>}
              </div>
            </div>
          </div>

          <div className="habit-actions">
            <button type="button" onClick={() => setIsEditing(true)} className="text-action">Edit</button>
            <button type="button" onClick={() => onDelete(habit.id)} className="text-action text-action--danger">Delete</button>
          </div>
        </>
      )}
    </article>
  );
}

export default HabitItem;
