// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";

function App() {
  const [questions, setQuestions] = useState([]);

  // Fetch questions from your backend (if needed)
  // ...

  return (
    <Router>
      <Routes>
        <Route
          path='/admin'
          element={<AdminPanel setQuestions={setQuestions} />}
        />
        <Route path='/user' element={<UserPanel questions={questions} />} />
      </Routes>
    </Router>
  );
}

export default App;
