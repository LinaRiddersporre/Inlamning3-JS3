import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/login/login';
import SignUp from './components/signUp/signUp';
import AddMovie from './components/addMovie/addMovie';
import Movies from './components/movies/movies';
import BasicModal from './components/modal/modal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Movies/>}/>
        <Route path='movies' element={<Movies/>}/>
        <Route path='logIn' element={<Login/>}/>
        <Route path='signUp' element={<SignUp/>}/>
        <Route path='app' element={<App/>}/>
        <Route path='addMovie' element={<AddMovie/>}/>
        <Route path='basicModal' element={<BasicModal/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
