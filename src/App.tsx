import React from 'react';
import Header from './components/Header';
import ContentBody from './components/ContentBody';
import ToolBanner from './components/ToolBanner';
import './styles/css/reset.css';
import './styles/css/base.css';
import { SettingProvider } from 'context/SettingContext';

function App () {
  return (
    <div className="App">
      <SettingProvider>
        <Header title='OrderApp' />
        <ToolBanner />
        <ContentBody />
      </SettingProvider>
    </div>
  );
}

export default App;
