import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/accounts/Login';
import Signup from './views/accounts/Signup';
import Navbar from './components/navbar/Navbar';
import Home from './views/home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
     </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
