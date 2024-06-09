import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export function AddItemPage() {
    return (
        <Container>
            <h1>Add Item</h1>
        </Container>
    );
}