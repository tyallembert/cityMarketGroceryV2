import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LiveFreightDryGoods from './pages/LiveFreightDryGoods';
import AdminLiveFreightDryGoods from './pages/AdminLiveFreightDryGoods';
import PerishablesLive from './pages/PerishablesLive';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LiveFreightDryGoods />}/>
        <Route path='/perishables/live' element={<PerishablesLive />}/>
        <Route path='/admin' element={<AdminLiveFreightDryGoods />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
