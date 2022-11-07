import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/login/login';
import SignUp from './components/signUp/signUp';
import AddMovie from './components/addMovie/addMovie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='signUp' element={<SignUp/>}/>
        <Route path='app' element={<App/>}/>
        <Route path='addMovie' element={<AddMovie/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
