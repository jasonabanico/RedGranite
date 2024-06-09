import React, { useEffect } from "react";
import { Dispatch } from "redux";
import styled from "styled-components";
import itemService from "../../services/itemService";
import { useAppDispatch } from "../../hooks";
import { GetItems } from "../../services/itemService/__generated__/GetItems";
import { setItems } from "./homePageSlice";
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

const actionDispatch = (dispatch: Dispatch) => ({
    setItems: (items: any) => dispatch(setItems(items)),
  });

export function HomePage(props: IHomePageProps) {
    const { setItems } = actionDispatch(useAppDispatch());

    const fetchItems = async () => {
        const items = await itemService.getItems(1).catch((err) => {
            console.log("Error:", err);
        });

        if (items) setItems(items);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Container>
            <ItemsSection />
        </Container>
    );
}