import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './pages/Home';
import { PessoasPage } from './pages/PessoasPage';
import { TransacoesPage } from './pages/TransacoesPage';

export function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>Controle de Gastos</h1>
          <nav>
            <NavLink to="/" end>Início</NavLink>
            <NavLink to="/pessoas">Pessoas</NavLink>
            <NavLink to="/transacoes">Transações & Totais</NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pessoas" element={<PessoasPage />} />
            <Route path="/transacoes" element={<TransacoesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;