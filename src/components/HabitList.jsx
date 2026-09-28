import HabitItem from './HabitItem';

function HabitList({ habits, completions, onToggleComplete, onEditHabit, onDeleteHabit }) {
  const today = new Date().toISOString().split('T')[0];

  const getStreak = (habitId) => {
    const habitCompletions = completions[habitId] || [];
    if (!habitCompletions.includes(today)) return 0;

    let streak = 0;
    let date = new Date(today);
    while (habitCompletions.includes(date.toISOString().split('T')[0])) {
      streak++;
      date.setDate(date.getDate() - 1);
    }
    return streak;
  };

  const totalStreaks = habits.reduce((sum, habit) => sum + getStreak(habit.id), 0);
  const longestStreak = habits.length > 0 ? Math.max(...habits.map(habit => getStreak(habit.id))) : 0;

  return (
    <section className="habit-list-section">
      <div className="section-heading-row section-heading-row--bordered">
        <div>
          <p className="bracket-label bracket-label--green">{'{ Your Habits }'}</p>
          <h2 className="section-title">Keep the system visible.</h2>
        </div>

        {habits.length > 0 && (
          <div className="list-metrics">
            <div><span>Total streaks</span><strong>{totalStreaks}</strong></div>
            <div><span>Longest</span><strong>{longestStreak}d</strong></div>
          </div>
        )}
      </div>

      {habits.length === 0 ? (
        <div className="list-placeholder">
          <span className="placeholder-mark">+</span>
          <p>No habits yet. Use the form above to define one.</p>
        </div>
      ) : (
        <div className="habit-stack">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              isCompletedToday={(completions[habit.id] || []).includes(today)}
              streak={getStreak(habit.id)}
              onToggleComplete={onToggleComplete}
              onEdit={onEditHabit}
              onDelete={onDeleteHabit}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HabitList;
