import gql from "graphql-tag";

export const ADD_ITEM = gql`
    mutation AddItem($item: ItemInput!) {
        AddItem(item: $item) {
            id
        }
    }
`;

export const UPDATE_ITEM = gql`
    mutation UpdateItem($item: ItemInput!) {
        UpdateItem(item: $item) {
            id
        }
    }
`;