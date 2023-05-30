import Products from './Products';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Receipts from './Receipts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/receipts" element={<Receipts />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
