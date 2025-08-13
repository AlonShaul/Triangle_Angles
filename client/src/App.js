import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputPage from './components/InputPage';
import DisplayPage from './components/DisplayPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InputPage />} />
          <Route path="/display" element={<DisplayPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
