import React from 'react';
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './app/containers/HomePage';
import { AddItem } from './app/containers/Item/addItem';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <AppContainer>
      <h1>RedGranite</h1>
      <hr />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addItem" element={<AddItem />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
