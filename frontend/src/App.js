import Login from "./Login"
import Signup from './Signup';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './Home'
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
