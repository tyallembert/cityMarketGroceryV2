import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LiveFreightDryGoods from './pages/LiveFreightDryGoods';
import AdminLiveFreightDryGoods from './pages/AdminLiveFreightDryGoods';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LiveFreightDryGoods />}/>
        <Route path='/admin' element={<AdminLiveFreightDryGoods />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
