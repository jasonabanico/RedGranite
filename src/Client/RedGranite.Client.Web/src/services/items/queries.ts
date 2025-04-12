import gql from "graphql-tag";

export const GET_ITEMS = gql`
    query GetItems($isoMaxDate: String, $count: Int) {
        GetItems(isoMaxDate: $isoMaxDate, count: $count) {
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