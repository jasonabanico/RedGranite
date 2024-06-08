import React, { useEffect } from "react";
import styled from "styled-components";
import itemService from "../../services/itemService";
//import { useAppDispatch } from "../../hooks";
//import { Items } from "../../components/items";

interface IHomePageProps {

}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

/*
const actionDispatch = (dispatch: Dispatch) => ({
    setItems: (items: GetItems["Page"]) => dispatch(setItems(items)),
  });
*/

export function HomePage(props: IHomePageProps) {
    //const { setItems } = actionDispatch(useAppDispatch());

    const fetchItems = async () => {
        const items = await itemService.getItems(1, 5).catch((err) => {
            console.log("Error:", err);
        });

        console.log("Items: ", items);
        //if (items) setItems(items);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Container>
            <h1>Red Granite</h1>
        </Container>
    );
}