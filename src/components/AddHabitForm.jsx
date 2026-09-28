import { useState } from 'react';

function AddHabitForm({ onAddHabit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minimum, setMinimum] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddHabit({
        name: name.trim(),
        description: description.trim(),
        minimum: minimum.trim(),
      });
      setName('');
      setDescription('');
      setMinimum('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="editorial-panel add-habit-panel">
      <div className="section-heading-row">
        <div>
          <p className="bracket-label bracket-label--green">{'{ Habit Library }'}</p>
          <h2 className="section-title">Define the full and minimum version.</h2>
        </div>
        <span className="section-number">+</span>
      </div>

      <div className="form-grid form-grid--three">
        <div className="field-group">
          <label htmlFor="name">Habit name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Read, exercise, journal..."
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="description">Full version <span>optional</span></label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Read for 30 minutes"
          />
        </div>

        <div className="field-group">
          <label htmlFor="minimum">Minimum version <span>for busy days</span></label>
          <input
            type="text"
            id="minimum"
            value={minimum}
            onChange={(e) => setMinimum(e.target.value)}
            placeholder="Read 2 pages"
          />
        </div>
      </div>

      <button type="submit" className="pill-button pill-button--primary">
        Add to habit library <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export default AddHabitForm;
