import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/login/login';
import SignUp from './components/signUp/signUp';
import AddMovie from './components/addMovie/addMovie';
import Movies from './components/movies/movies';
import Layout from './components/layout/layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Movies/>}/>
          <Route path='movies' element={<Movies/>}/>
          <Route path='logIn' element={<Login/>}/>
          <Route path='signUp' element={<SignUp/>}/>
          <Route path='addMovie' element={<AddMovie/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
