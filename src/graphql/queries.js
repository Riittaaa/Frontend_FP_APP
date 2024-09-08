import { gql } from "@apollo/client";

export const FETCH_GROUP = gql`
  query {
    allGroups {
      group {
        id
        name
      }
      errors
      message
    }
  }
`;
