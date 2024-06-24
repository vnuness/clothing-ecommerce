import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/Home'
import Navigation from './routes/navigation/Navigation'
import Authentication from './routes/authentication/Authentication'
import Shop from './routes/shop/Shop'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index path='/' element={<Home />} />
        <Route index path='auth' element={<Authentication />} />
        <Route index path='shop' element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
