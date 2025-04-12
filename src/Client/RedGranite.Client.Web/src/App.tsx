import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AddItemPage } from './features/items/addItem/addItemPage';
import { EditItemPage } from "./features/items/editItem/editItemPage";
import { HomePage } from "./pages/HomePage";

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
          <Route path="/editItem/:itemId" element={<EditItemPage />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
