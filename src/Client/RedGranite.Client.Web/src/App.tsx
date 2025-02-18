import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './app/containers/HomePage';
import { AddItemPage } from './app/containers/ItemPage/addItemPage';
import { EditItemPage } from "./app/containers/ItemPage/editItemPage";

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
          <Route path="/addItem" element={<AddItemPage />} />
          <Route path="/editItem" element={<EditItemPage />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
