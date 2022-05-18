import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SubjectPage from './routes/SubjectPage';
import ClassPage from './routes/ClassPage';
import NotFound from './routes/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './routes/Login';



ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="subject" element={<SubjectPage />} />
      <Route path="class" element={<ClassPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

