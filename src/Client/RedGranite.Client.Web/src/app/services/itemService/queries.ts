import gql from "graphql-tag";

export const GET_ITEMS = gql`
    query GetItems($page: Int!, perPage: $perPage) {
        Items(page: $page, perPage: $perPage) {
            page {
                id
                name
                description
            }
        }
    }
`;