import gql from "graphql-tag";

export const ADD_ITEM = gql`
    mutation AddItem($item: ItemInput!) {
        AddItem(item: $item) {
            id
        }
    }
`;