import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import './App.css';

import Splash from './pages/Splash';
import Login from './pages/Login';
import ChooseDepartment from './pages/ChooseDepartment';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Overheads from './pages/Overheads';
import Payroll from './pages/Payroll';
import Invoicing from './pages/Invoicing';
import Cashbook from './pages/Cashbook';
import Library from './pages/Library';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Splash /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/choose-department" element={<PageTransition><ChooseDepartment /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="/overheads" element={<PageTransition><Overheads /></PageTransition>} />
        <Route path="/payroll" element={<PageTransition><Payroll /></PageTransition>} />
        <Route path="/invoicing" element={<PageTransition><Invoicing /></PageTransition>} />
        <Route path="/cashbook" element={<PageTransition><Cashbook /></PageTransition>} />
        <Route path="/library" element={<PageTransition><Library /></PageTransition>} />
        <Route path="/calendar" element={<PageTransition><Calendar /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
