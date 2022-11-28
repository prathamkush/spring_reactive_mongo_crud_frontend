import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddProduct from './Product/AddProduct';
import UpdateProduct from './Product/UpdateProduct';
import ViewProduct from './Product/ViewProduct';
import Login from './pages/Login';
import NewHome from './pages/Home'
import AdminHome from './pages/AdminHome';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      
    <Router>
      <Navbar/>

      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/admin-home" element={<AdminHome/>} />
        <Route exact path="/add-product" element={<AddProduct/>} />
        <Route exact path="/update-product/:id" element={<UpdateProduct/>}/>
        <Route exact path="/view-product/:id" element={<ViewProduct/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>

    </Router>
    

    </div>
  );
}

export default App;
