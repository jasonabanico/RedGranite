import gql from "graphql-tag";

export const ITEMS = gql`
    query Items($page: Int!, $perPage: Int!) {
        items (page: $page, perPage: $perPage) {
            id,
            name,
            shortDescription
        }
    }
`;

export const ITEM = gql`
    query Item($id: String!) {
        item (id: $id) {
            id,
            name,
            shortDescription,
            longDescription
        }
    }
`;