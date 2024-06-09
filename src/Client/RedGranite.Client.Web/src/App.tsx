import React from 'react';
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './app/containers/HomePage';
import { CreateItem } from './app/containers/Item/createItem';

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
      <h1>Red Granite</h1>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createItem" element={<CreateItem />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
