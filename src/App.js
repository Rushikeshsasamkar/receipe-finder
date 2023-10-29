// import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Saved_Recipe from './components/Saved_Recipe';
import Details from './components/Detail';

function App(){
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="details/:id" element={ <Details /> } />
        <Route path="saved_recipies/details/:id" element={ <Details /> } />
        <Route path="saved_recipies" element={ <Saved_Recipe /> } />
      </Routes> 
      {/* <Home /> */}
      
    </>
  );
}

export default App;
