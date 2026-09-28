import { useState } from 'react';

function CalendarView({ completions, habits }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getCompletionStatus = (date) => {
    if (!date) return null;

    const dateStr = date.toISOString().split('T')[0];
    const totalHabits = habits.length;
    const completedHabits = habits.filter(habit =>
      (completions[habit.id] || []).includes(dateStr)
    ).length;

    if (completedHabits === 0) return 'none';
    if (completedHabits === totalHabits) return 'full';
    return 'partial';
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <section className="editorial-panel calendar-panel">
      <div className="section-heading-row">
        <div>
          <p className="bracket-label bracket-label--pink">{'{ Calendar }'}</p>
          <h2 className="section-title">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        </div>

        <div className="calendar-controls">
          <button type="button" onClick={() => navigateMonth(-1)} className="circle-button" aria-label="Previous month">←</button>
          <button type="button" onClick={goToToday} className="pill-button pill-button--small pill-button--pink">Today</button>
          <button type="button" onClick={() => navigateMonth(1)} className="circle-button" aria-label="Next month">→</button>
        </div>
      </div>

      <div className="calendar-grid calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="calendar-grid calendar-days">
        {days.map((date, index) => {
          const status = getCompletionStatus(date);
          const isToday = date && date.toDateString() === new Date().toDateString();

          return (
            <div
              key={index}
              className={'calendar-cell' + (isToday ? ' is-today' : '') + (!date ? ' is-empty' : '')}
            >
              {date && (
                <>
                  <span className="calendar-date">{date.getDate()}</span>
                  <span className={'completion-dot completion-dot--' + status} aria-label={status + ' completion'} />
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="calendar-legend">
        <span><i className="legend-dot legend-dot--full" /> all complete</span>
        <span><i className="legend-dot legend-dot--partial" /> partial</span>
        <span><i className="legend-dot legend-dot--none" /> none</span>
      </div>
    </section>
  );
}

export default CalendarView;
