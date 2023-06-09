import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Context
import { SettingProvider } from 'context/SettingContext';
// Pages
import { MainPage, CreateItem } from 'pages';
// CSS style
import './styles/css/reset.css';
import './styles/css/base.css';
import { NotiProvider } from 'context/NotiContext';
import HomePage from 'pages/Homepage';

function App () {
  const basename = process.env.PUBLIC_URL;

  return (
    <div className="app">
      <BrowserRouter basename={basename}>
        <SettingProvider>
          <NotiProvider>
            <Routes>
              <Route path='*' element={<HomePage/>}></Route>
              <Route path='/' element={<MainPage/>}></Route>
              <Route path='/createMenuItem' element={<CreateItem/>}></Route>
            </Routes>
          </NotiProvider>
        </SettingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
