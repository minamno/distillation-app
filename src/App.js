// App.js
import React, { useState } from 'react';
import DataEntry from './components/DataEntry';
import Dashboard from './components/Dashboard';
import WhatIfAnalysis from './components/WhatIfAnalysis';

function App() {
  const [view, setView] = useState('dataEntry');

  return (
    <div className="App">
      <header>
        <h1>تطبيق تقطير الكحول</h1>
        <nav>
          <button onClick={() => setView('dataEntry')}>إدخال البيانات</button>
          <button onClick={() => setView('dashboard')}>لوحة التحكم</button>
          <button onClick={() => setView('whatIf')}>ما إذا</button>
        </nav>
      </header>
      <main>
        {view === 'dataEntry' && <DataEntry />}
        {view === 'dashboard' && <Dashboard />}
        {view === 'whatIf' && <WhatIfAnalysis />}
      </main>
    </div>
  );
}

export default App;
