import React, { useState } from 'react';

import './global.css';

import Header from './pages/Header';
import Form from './pages/Form';
import Main from './pages/Main';

export default function App() {

  return (
    <>
      <Header />
      <Form />
      <Main />
    </>
  );
}
