import React from 'react';
import Header from './components/Header';
import ContentBody from './components/ContentBody';
import './styles/css/reset.css';
import './styles/css/base.css';

function App () {
  return (
    <div className="App">
      <Header title='OrderApp' />
      <ContentBody />
    </div>
  );
}

export default App;
