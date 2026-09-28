function StatisticsDashboard({ habits, completions }) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const totalHabits = habits.length;
  const activeHabits = habits.filter(habit => {
    const habitCompletions = completions[habit.id] || [];
    return habitCompletions.length > 0;
  }).length;

  const currentStreaks = habits.map(habit => {
    const habitCompletions = completions[habit.id] || [];
    if (!habitCompletions.includes(today.toISOString().split('T')[0])) return 0;

    let streak = 0;
    let date = new Date(today);
    while (habitCompletions.includes(date.toISOString().split('T')[0])) {
      streak++;
      date.setDate(date.getDate() - 1);
    }
    return streak;
  });

  const longestCurrentStreak = Math.max(...currentStreaks, 0);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthlyCompletions = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = date.toISOString().split('T')[0];
    const completed = habits.filter(habit =>
      (completions[habit.id] || []).includes(dateStr)
    ).length;
    monthlyCompletions.push(completed);
  }

  const avgMonthlyCompletion = monthlyCompletions.reduce((sum, comp) => sum + comp, 0) / daysInMonth;
  const monthlyCompletionRate = totalHabits > 0 ? Math.round((avgMonthlyCompletion / totalHabits) * 100) : 0;

  const habitStats = habits.map(habit => {
    const habitCompletions = completions[habit.id] || [];
    const completionRate = habitCompletions.length > 0 ?
      Math.round((habitCompletions.length / Math.max(1, (new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24))) * 100) : 0;

    return {
      ...habit,
      completionCount: habitCompletions.length,
      completionRate
    };
  }).sort((a, b) => b.completionRate - a.completionRate);

  const topHabits = habitStats.slice(0, 3);
  const lastFourteen = monthlyCompletions.slice(-14);

  return (
    <section className="editorial-panel statistics-panel">
      <div className="section-heading-row">
        <div>
          <p className="bracket-label bracket-label--lilac">{'{ Statistics }'}</p>
          <h2 className="section-title">See the pattern, not the noise.</h2>
        </div>
        <span className="section-number section-number--lilac">03</span>
      </div>

      <div className="metric-grid">
        <Metric value={totalHabits} label="Total habits" tone="green" />
        <Metric value={activeHabits} label="Active habits" tone="blue" />
        <Metric value={longestCurrentStreak} label="Longest streak" tone="orange" suffix="d" />
        <Metric value={monthlyCompletionRate} label="Monthly average" tone="lilac" suffix="%" />
      </div>

      <div className="analytics-grid">
        <div className="analytics-block">
          <p className="mini-label">Top performing</p>
          <div className="ranking-list">
            {topHabits.length === 0 && <p className="muted-copy">Complete a habit to start building statistics.</p>}
            {topHabits.map((habit, index) => (
              <div key={habit.id} className="ranking-row">
                <span className="ranking-index">0{index + 1}</span>
                <div className="ranking-name">
                  <span aria-hidden="true">{habit.icon || '○'}</span>
                  <span>{habit.name}</span>
                </div>
                <div className="ranking-value">
                  <strong>{habit.completionRate}%</strong>
                  <span>{habit.completionCount} completions</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-block">
          <p className="mini-label">Last 14 days</p>
          <div className="bar-chart" aria-label="Last fourteen days completion chart">
            {lastFourteen.map((completed, index) => {
              const height = totalHabits > 0 ? (completed / totalHabits) * 100 : 0;
              const isLast = index === lastFourteen.length - 1;
              const dayNumber = new Date(currentYear, currentMonth, index + (daysInMonth - lastFourteen.length + 1)).getDate();

              return (
                <div key={index} className="bar-column">
                  <div
                    className={'bar-fill' + (isLast ? ' is-current' : '')}
                    style={{ height: Math.max(height, 4) + '%' }}
                  />
                  <span>{dayNumber}</span>
                </div>
              );
            })}
          </div>
          <p className="chart-caption">{monthlyCompletionRate}% monthly average completion</p>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label, tone, suffix = '' }) {
  return (
    <div className={'metric metric--' + tone}>
      <strong>{value}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

export default StatisticsDashboard;
