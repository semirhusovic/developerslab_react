import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ViewPost from './components/ViewPost'
import AddPost from './components/AddPost'
import NavBar from './components/NavBar'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="add-post" element={<AddPost />} />
      <Route path="post/:id" element={<ViewPost />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

