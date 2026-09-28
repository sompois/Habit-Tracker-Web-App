import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';
import ProgressBar from './components/ProgressBar';
import CalendarView from './components/CalendarView';
import StatisticsDashboard from './components/StatisticsDashboard';
import DataExport from './components/DataExport';

function App() {
  const [habits, setHabits] = useLocalStorage('habits', []);
  const [completions, setCompletions] = useLocalStorage('completions', {});
  const [activeTab, setActiveTab] = useState('habits');

  const today = new Date().toISOString().split('T')[0];

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

  const completedToday = habits.filter(habit => (completions[habit.id] || []).includes(today)).length;
  const percentage = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  const getMotivationalMessage = () => {
    if (percentage === 100 && habits.length > 0) return 'All systems complete. Keep the rhythm.';
    if (percentage >= 75) return 'Almost there. Protect the streak.';
    if (percentage >= 50) return 'Momentum is visible. Keep moving.';
    if (percentage >= 25) return 'The system is starting to work.';
    return 'Small actions become repeatable systems.';
  };

  const tabs = [
    { id: 'habits', label: 'Habits', index: '01', accent: 'green' },
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
        <span className="topbar-note">{'{ daily practice }'}</span>
      </header>

      <main id="top">
        <section className="hero page-frame">
          <div className="hero-copy">
            <p className="bracket-label">{'{ Habit Tracker }'}</p>
            <h1 className="hero-title">
              <span>Build</span>
              <span>better</span>
              <span className="hero-title-accent">habits.</span>
            </h1>
          </div>

          <div className="hero-meta">
            <p className="hero-message">{getMotivationalMessage()}</p>
            <div className="hero-score" aria-label={percentage + ' percent complete today'}>
              <span className="hero-score-number">{percentage}%</span>
              <span className="hero-score-label">{completedToday} / {habits.length} complete today</span>
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
              <AddHabitForm onAddHabit={addHabit} />
              <ProgressBar completed={completedToday} total={habits.length} />
              <HabitList
                habits={habits}
                completions={completions}
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
            <DataExport habits={habits} completions={completions} />
          )}
        </section>

        {habits.length === 0 && activeTab === 'habits' && (
          <section className="empty-state page-frame">
            <p className="bracket-label bracket-label--green">{'{ Start here }'}</p>
            <h2>Your first repeatable action starts above.</h2>
            <p>Name one behavior small enough to repeat tomorrow.</p>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="page-frame footer-inner">
          <span>Habit / System</span>
          <span>Local-first habit tracking</span>
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
