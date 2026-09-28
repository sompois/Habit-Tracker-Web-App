function DataExport({ habits, completions, dailyCommitments = {} }) {
  const exportData = () => {
    const data = {
      habits,
      completions,
      dailyCommitments,
      exportDate: new Date().toISOString(),
      version: '1.1'
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'habit-tracker-backup-' + new Date().toISOString().split('T')[0] + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        if (importedData.habits && importedData.completions) {
          alert('Data imported successfully! Please refresh the page to see changes.');
          console.log('Imported data:', importedData);
        } else {
          alert('Invalid file format. Please select a valid habit tracker backup file.');
        }
      } catch (error) {
        alert('Error reading file. Please make sure it is a valid JSON file.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all habit data? This action cannot be undone.')) {
      localStorage.removeItem('habits');
      localStorage.removeItem('completions');
      localStorage.removeItem('dailyCommitments');
      alert('All data cleared. Please refresh the page.');
    }
  };

  return (
    <section className="editorial-panel data-panel">
      <div className="section-heading-row">
        <div>
          <p className="bracket-label bracket-label--blue">{'{ Data }'}</p>
          <h2 className="section-title">Your practice stays yours.</h2>
        </div>
        <span className="section-number section-number--blue">04</span>
      </div>

      <p className="section-intro">
        Everything is stored in your browser. Export a backup when you want a portable copy of your habits, promises, and progress.
      </p>

      <div className="data-action-grid">
        <div className="data-action">
          <span className="data-index">01</span>
          <h3>Export</h3>
          <p>Download habits, daily commitments, and completion history as JSON.</p>
          <button type="button" onClick={exportData} className="pill-button pill-button--blue">Export data ↗</button>
        </div>

        <div className="data-action">
          <span className="data-index">02</span>
          <h3>Import</h3>
          <p>Select a previously exported Habit Tracker backup.</p>
          <label className="pill-button pill-button--blue file-button">
            Import data
            <input type="file" accept=".json" onChange={importData} />
          </label>
        </div>

        <div className="data-action">
          <span className="data-index">03</span>
          <h3>Clear</h3>
          <p>Permanently remove habits, promises, and completion history from this browser.</p>
          <button type="button" onClick={clearAllData} className="pill-button pill-button--orange">Clear all data</button>
        </div>
      </div>

      <div className="data-note">
        <span>{'{ Note }'}</span>
        <p>Export regularly if this tracker becomes part of your routine. Clearing local data cannot be undone.</p>
      </div>
    </section>
  );
}

export default DataExport;
