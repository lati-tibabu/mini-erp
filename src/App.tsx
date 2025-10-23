import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import HRModule from './modules/HR/HRModule'
import InventoryModule from './modules/Inventory/InventoryModule'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <h1 className="header-title">Mini ERP System</h1>
            <nav className="nav">
              <Link to="/hr" className="nav-link">HR Module</Link>
              <Link to="/inventory" className="nav-link">Inventory Module</Link>
            </nav>
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/hr" replace />} />
            <Route path="/hr" element={<HRModule />} />
            <Route path="/inventory" element={<InventoryModule />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
