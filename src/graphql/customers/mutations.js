import { gql } from "@apollo/client";

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($deleteCustomer: DeleteCustomerInput!) {
    deleteCustomer(input: $deleteCustomer) {
      customer {
        id
        name
      }
      message
      errors
    }
  }
`;

export const REACTIVATE_CUSTOMER = gql`
  mutation reactivateCustomer($input: ReactivateCustomerInput!) {
    reactivateCustomer(input: $input) {
      customer {
        id
        email
        address
        deletedAt
        name
        phone
      }
      errors
      message
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(input: $createCustomerInput) {
      customer {
        name
        email
        address
        phone
        groupId
      }
      message
      errors
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($updateCustomer: UpdateCustomerInput!) {
    updateCustomer(input: $updateCustomer) {
      customer {
        name
        email
        address
        phone
        groupId
      }
      message
      errors
    }
  }
`;
