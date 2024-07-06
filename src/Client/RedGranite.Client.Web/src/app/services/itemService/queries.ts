import gql from "graphql-tag";

export const GET_ITEMS = gql`
    query GetItems($isoStartDate: String!, $count: Int!) {
        GetItems(isoStartDate: $isoStartDate, count: $count) {
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