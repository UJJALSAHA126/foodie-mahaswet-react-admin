import React from 'react';
import './App.css';
import AddItems from './components/AddItems';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ShowImages from './components/ShowImages';

function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<AddItems />} />
            <Route path='/client' element={<ShowImages />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App