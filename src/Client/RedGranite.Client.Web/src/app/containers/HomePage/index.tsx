import styled from "styled-components";
import { ItemsSection } from "./itemsSection";

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
            <ItemsSection />
        </Container>
    );
}