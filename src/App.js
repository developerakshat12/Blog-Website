import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login from './components/login/login';
import DataProvider from './context/DataProvider';
import Home from './components/Home/Home';
import CreatePost from './components/Create/createPost.js';

// eslint-disable-next-line
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Home />
      <Outlet />
    </> : <Navigate replace to='/' />
};

function App() {
  // eslint-disable-next-line
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <div>      
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/create' element={<CreatePost/>} />
            
          </Routes>        
        </BrowserRouter>
      </DataProvider>   
     </div>
  );
}

export default App;
