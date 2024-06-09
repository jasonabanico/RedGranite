import gql from "graphql-tag";

export const GET_ITEMS = gql`
    query GetItems($page: Int!, $perPage: Int!) {
        GetItems(page: $page, perPage: $perPage) {
            id,
            name,
            shortDescription
        }
    }
`;

export const GET_ITEM = gql`
    query GetItem($id: String!) {
        GetItem(id: $id) {
            id,
            name,
            shortDescription,
            longDescription
        }
    }
`;