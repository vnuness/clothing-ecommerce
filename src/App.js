import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/Home';
import Navigation from './routes/navigation/Navigation';
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop';
import Checkout from './routes/checkout/Checkout';
import { checkUserSession } from './store/user/user.action';
import { useDispatch } from 'react-redux';

import { useEffect } from 'react'


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);


  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index path='/' element={<Home />} />
        <Route index path='auth' element={<Authentication />} />
        <Route index path='shop/*' element={<Shop />} />
        <Route index path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
