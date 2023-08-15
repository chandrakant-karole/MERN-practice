import './App.css';
import Nav from './common/Nav';
import { Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import Footer from './common/Footer';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import PrivateRoutes from './Auth/PrivateRoutes';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Products />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/logout' element={"logout"} />
          <Route path='/profile' element={"profile"} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
