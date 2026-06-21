import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProposalPage from './pages/ProposalPage';
import RecipesPage from './pages/RecipesPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProposalPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
