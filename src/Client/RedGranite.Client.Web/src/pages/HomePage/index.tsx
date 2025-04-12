import styled from "styled-components";
import { ListItemsPage } from "../../features/items/listItems/listItemsPage";

interface IHomePageProps {
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export function HomePage(props: IHomePageProps) {
    return (
        <Container>
            <ListItemsPage />
        </Container>
    );
}