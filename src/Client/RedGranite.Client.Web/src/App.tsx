import React from 'react';
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './app/containers/HomePage';
import { AddItemPage } from './app/containers/AddItemPage';

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
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addItem" element={<AddItemPage />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
