import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LiveFreightDryGoods from './pages/LiveFreightDryGoods';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LiveFreightDryGoods />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
