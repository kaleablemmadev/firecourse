import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Keremt from './pages/Keremt';
import Bega from './pages/Bega';
import BegaDistance from './pages/BegaDistance';
import ELearning from './pages/ELearning';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/keremt" element={<Keremt />} />
        <Route path="/bega" element={<Bega />} />
        <Route path="/bega-distance" element={<BegaDistance />} />
        <Route path="/e-learning" element={<ELearning />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;