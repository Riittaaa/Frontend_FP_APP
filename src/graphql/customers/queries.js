import { gql } from "@apollo/client";

export const FETCH_ACTIVE_CUSTOMERS = gql`
  query activeCustomers {
    activeCustomers {
      address
      email
      id
      name
      phone
    }
  }
`;
