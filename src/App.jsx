import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './admin/Login';
import Painel from './admin/Painel';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/painel" element={<Painel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;