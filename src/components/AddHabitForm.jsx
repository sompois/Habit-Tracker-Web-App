import { useState } from 'react';

function AddHabitForm({ onAddHabit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddHabit({ name: name.trim(), description: description.trim() });
      setName('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="editorial-panel add-habit-panel">
      <div className="section-heading-row">
        <div>
          <p className="bracket-label bracket-label--green">{'{ New Habit }'}</p>
          <h2 className="section-title">Define the next action.</h2>
        </div>
        <span className="section-number">01</span>
      </div>

      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="name">Habit name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Drink water, walk, read..."
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="description">Description <span>optional</span></label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A small rule that makes it repeatable"
          />
        </div>
      </div>

      <button type="submit" className="pill-button pill-button--primary">
        Add habit <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export default AddHabitForm;
