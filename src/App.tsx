import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GroupSession from './components/GroupSession';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group/:sessionId" element={<GroupSession />} />
      </Routes>
    </Router>
  );
}