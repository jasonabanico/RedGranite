import React from "react";
import { createSelector } from "reselect";
import styled from "styled-components";
import { makeSelectItems } from "./selectors";
import { useAppSelector } from "../../hooks";

const ItemsContainer = styled.div`
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
`;

const ItemContainer = styled.div`
    width: 12em;
    height: 16em;
    display: flex;
    flex-direction: column;
`;

const ItemTitle = styled.h6`
    margin-top: 8px;
    font-size: 19px;
    color: #000;
    font-weight: 600;
`;

const stateSelector = createSelector(makeSelectItems, (items) => ({
    items,
}));

export function ItemsSection() {
    const { items } = useAppSelector(stateSelector);

    const isEmptyItems = !items || items.length == 0;

    if (isEmptyItems)
        return null;
    
    return (
        <ItemsContainer>
            {items && items.map((item: any) => (
                <ItemContainer>
                    <ItemTitle>
                        {item.name}
                    </ItemTitle>
                </ItemContainer>
            ))}
            <ItemContainer>

            </ItemContainer>
        </ItemsContainer>
    );
}
