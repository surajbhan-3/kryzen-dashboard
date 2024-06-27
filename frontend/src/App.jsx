
import './App.css';
import {Routes, Route}  from 'react-router-dom'
import Register from './Pages/Rgister';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct'
import ProtectedRoutes from './Component/ProtectedRoutes';
import Product from './Pages/Product';
import PageNotFound from './Pages/PageNotFound';
import Landing from './Pages/Landing';
function App() {


  return (

  
  <Routes>
  <Route path='/' element={<Landing />} />
  <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register/>} />
    <Route path={`:user/home`} element={<ProtectedRoutes> <Home /></ProtectedRoutes>} />
    <Route path={`:user/add_product`} element={<ProtectedRoutes><AddProduct /> </ProtectedRoutes>} />
    <Route path={`:user/edit_product/:product_id/:title`} element={<ProtectedRoutes><EditProduct /> </ProtectedRoutes>} />
    <Route path={`:user/single_product/:product_id/:title`} element={<ProtectedRoutes><Product /> </ProtectedRoutes>} />
    <Route path={'*'} element={<PageNotFound />} />

  </Routes>

  );
}

export default App;