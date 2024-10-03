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

export const FETCH_CUSTOMERS = gql`
  query Customers {
    allCustomers {
      id
      name
      email
      address
      phone
      deletedAt
      groupId
    }
  }
`;

export const EXPORT_CSV = gql`
  query csv($id: ID!) {
    csvExport(id: $id)
  }
`;

export const FETCH_CUSTOMER = gql`
  query fetchCustomer($customerId: ID!) {
    customer(customerId: $customerId) {
      id
      name
      email
      address
      phone
      groupId
    }
  }
`;
