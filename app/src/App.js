import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import OdersListPage from "./pages/OdersListPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Passer une commande</Link>
            </li>
            <li>
              <Link to="/second">Liste des commands</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/second" element={<OdersListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
