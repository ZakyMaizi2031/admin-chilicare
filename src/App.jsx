import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Encyclopedia from './pages/Encyclopedia';
import Artikel from './pages/Artikel';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="encyclopedia" element={<Encyclopedia />} />
          <Route path="artikel" element={<Artikel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
