import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Context
import { SettingProvider } from 'context/SettingContext';
// Pages
import { MainPage, CreateItem } from 'pages';
// CSS style
import './styles/css/reset.css';
import './styles/css/base.css';

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <SettingProvider>
          <Routes>  
            <Route path='/' element={<MainPage/>}></Route>
            <Route path='/createMenuItem' element={<CreateItem/>}></Route>
          </Routes>
        </SettingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
