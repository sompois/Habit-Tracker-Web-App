import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import AddHabitForm from './components/AddHabitForm';
import CommitmentPlanner from './components/CommitmentPlanner';
import HabitList from './components/HabitList';
import ProgressBar from './components/ProgressBar';
import CalendarView from './components/CalendarView';
import StatisticsDashboard from './components/StatisticsDashboard';
import DataExport from './components/DataExport';

function App() {
  const [habits, setHabits] = useLocalStorage('habits', []);
  const [completions, setCompletions] = useLocalStorage('completions', {});
  const [dailyCommitments, setDailyCommitments] = useLocalStorage('dailyCommitments', {});
  const [activeTab, setActiveTab] = useState('habits');

  const today = new Date().toISOString().split('T')[0];
  const todayCommitments = (dailyCommitments[today] || []).filter(commitment =>
    habits.some(habit => habit.id === commitment.habitId)
  );

  const addHabit = (newHabit) => {
    const habit = {
      id: Date.now().toString(),
      ...newHabit,
      createdAt: new Date().toISOString(),
      color: getRandomColor(),
      icon: getRandomIcon(),
    };
    setHabits([...habits, habit]);
  };

  const editHabit = (id, updatedHabit) => {
    setHabits(habits.map(h => h.id === id ? { ...h, ...updatedHabit } : h));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));

    const newCompletions = { ...completions };
    delete newCompletions[id];
    setCompletions(newCompletions);

    const newCommitments = Object.fromEntries(
      Object.entries(dailyCommitments).map(([date, entries]) => [
        date,
        entries.filter(entry => entry.habitId !== id)
      ])
    );
    setDailyCommitments(newCommitments);
  };

  const toggleComplete = (id) => {
    const habitCompletions = completions[id] || [];
    const isCompleted = habitCompletions.includes(today);
    if (isCompleted) {
      setCompletions({
        ...completions,
        [id]: habitCompletions.filter(date => date !== today),
      });
    } else {
      setCompletions({
        ...completions,
        [id]: [...habitCompletions, today],
      });
    }
  };

  const toggleCommitment = (habitId) => {
    const exists = todayCommitments.some(entry => entry.habitId === habitId);
    let next;

    if (exists) {
      next = todayCommitments.filter(entry => entry.habitId !== habitId);
    } else {
      if (todayCommitments.length >= 3) return;
      next = [
        ...todayCommitments,
        {
          habitId,
          mode: 'full',
          reason: '',
          committedAt: new Date().toISOString(),
        }
      ];
    }

    setDailyCommitments({
      ...dailyCommitments,
      [today]: next,
    });
  };

  const setCommitmentMode = (habitId, mode) => {
    const next = todayCommitments.map(entry =>
      entry.habitId === habitId
        ? { ...entry, mode, reason: mode === 'full' ? '' : entry.reason || '', adjustedAt: mode === 'minimum' ? new Date().toISOString() : null }
        : entry
    );

    setDailyCommitments({
      ...dailyCommitments,
      [today]: next,
    });
  };

  const setCommitmentReason = (habitId, reason) => {
    const next = todayCommitments.map(entry =>
      entry.habitId === habitId ? { ...entry, reason } : entry
    );

    setDailyCommitments({
      ...dailyCommitments,
      [today]: next,
    });
  };

  const completedToday = habits.filter(habit => (completions[habit.id] || []).includes(today)).length;
  const completedCommitments = todayCommitments.filter(commitment =>
    (completions[commitment.habitId] || []).includes(today)
  ).length;

  const trackedTotal = todayCommitments.length > 0 ? todayCommitments.length : habits.length;
  const trackedCompleted = todayCommitments.length > 0 ? completedCommitments : completedToday;
  const percentage = trackedTotal > 0 ? Math.round((trackedCompleted / trackedTotal) * 100) : 0;

  const getMotivationalMessage = () => {
    if (habits.length === 0) return 'Start with one promise small enough to repeat.';
    if (todayCommitments.length === 0) return 'Choose up to three promises you are willing to protect today.';
    if (percentage === 100) return 'You kept today\'s promises. Reliability beats intensity.';
    if (percentage >= 50) return 'Keep the promise small enough to finish.';
    return 'A busy day is a reason to adjust the promise, not abandon it.';
  };

  const tabs = [
    { id: 'habits', label: 'Commit', index: '01', accent: 'green' },
    { id: 'calendar', label: 'Calendar', index: '02', accent: 'pink' },
    { id: 'statistics', label: 'Statistics', index: '03', accent: 'lilac' },
    { id: 'data', label: 'Data', index: '04', accent: 'blue' },
  ];

  return (
    <div className="app-shell">
      <div className="ambient-shape ambient-shape--one" aria-hidden="true" />
      <div className="ambient-shape ambient-shape--two" aria-hidden="true" />

      <header className="topbar page-frame">
        <a className="wordmark" href="#top" aria-label="Habit System home">
          <span>HABIT</span><span className="wordmark-accent">/SYSTEM</span>
        </a>
        <span className="topbar-note">{'{ keep your word }'}</span>
      </header>

      <main id="top">
        <section className="hero page-frame">
          <div className="hero-copy">
            <p className="bracket-label">{'{ Commitment Planner }'}</p>
            <h1 className="hero-title">
              <span>Keep</span>
              <span>your</span>
              <span className="hero-title-accent">word.</span>
            </h1>
          </div>

          <div className="hero-meta">
            <p className="hero-message">{getMotivationalMessage()}</p>
            <div className="hero-score" aria-label={percentage + ' percent of today tracked items complete'}>
              <span className="hero-score-number">{percentage}%</span>
              <span className="hero-score-label">
                {todayCommitments.length > 0
                  ? completedCommitments + ' / ' + todayCommitments.length + ' promises kept today'
                  : completedToday + ' / ' + habits.length + ' habits complete today'}
              </span>
            </div>
          </div>
        </section>

        <nav className="tab-nav page-frame" aria-label="Habit tracker sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={'tab-button tab-button--' + tab.accent + (activeTab === tab.id ? ' is-active' : '')}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <span className="tab-index">{tab.index}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <section className={'workspace page-frame workspace--' + activeTab}>
          {activeTab === 'habits' && (
            <>
              {habits.length > 0 && (
                <CommitmentPlanner
                  habits={habits}
                  commitments={todayCommitments}
                  onToggleCommitment={toggleCommitment}
                  onSetMode={setCommitmentMode}
                  onSetReason={setCommitmentReason}
                />
              )}

              <ProgressBar
                completed={trackedCompleted}
                total={trackedTotal}
                mode={todayCommitments.length > 0 ? 'commitments' : 'habits'}
              />

              <AddHabitForm onAddHabit={addHabit} />

              <HabitList
                habits={habits}
                completions={completions}
                commitments={todayCommitments}
                onToggleComplete={toggleComplete}
                onEditHabit={editHabit}
                onDeleteHabit={deleteHabit}
              />
            </>
          )}

          {activeTab === 'calendar' && (
            <CalendarView completions={completions} habits={habits} />
          )}

          {activeTab === 'statistics' && (
            <StatisticsDashboard habits={habits} completions={completions} />
          )}

          {activeTab === 'data' && (
            <DataExport habits={habits} completions={completions} dailyCommitments={dailyCommitments} />
          )}
        </section>

        {habits.length === 0 && activeTab === 'habits' && (
          <section className="empty-state page-frame">
            <p className="bracket-label bracket-label--green">{'{ Start here }'}</p>
            <h2>Create one promise worth keeping.</h2>
            <p>Define the full habit and a minimum version for busy days.</p>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="page-frame footer-inner">
          <span>Habit / System</span>
          <span>Plan less · adjust deliberately · keep your word</span>
        </div>
      </footer>
    </div>
  );
}

function getRandomColor() {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomIcon() {
  const icons = ['💧', '🏃', '📚', '🎵', '🍎', '🧘', '💻', '🎨', '🏋️', '🛏️'];
  return icons[Math.floor(Math.random() * icons.length)];
}

export default App;
