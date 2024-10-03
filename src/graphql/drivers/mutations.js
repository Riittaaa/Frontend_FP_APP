import { gql } from "@apollo/client";

export const CREATE_DRIVER = gql`
  mutation createDriver($input: CreateDriverInput!) {
    addDriver(input: $input) {
      driver {
        id
        name
        email
        address
        groupId
        phoneNo
        status
      }
      errors
      message
    }
  }
`;

export const REACTIVATE_DRIVER = gql`
  mutation reactivateDriver($input: ReactivateDriverInput!) {
    reactivateDriver(input: $input) {
      driver {
        id
        email
        address
        deletedAt
        name
      }
      errors
      message
    }
  }
`;

export const UPDATE_DRIVER = gql`
  mutation updateDriver($driverinput: UpdateDriverInput!) {
    updateDriver(input: $driverinput) {
      driver {
        name
        address
        phoneNo
        groupId
        email
        status
      }
      errors
      success
      message
    }
  }
`;

export const DELETE_DRIVER = gql`
  mutation deleteDriver($input: DeleteDriverInput!) {
    deleteDriver(input: $input) {
      errors
      message
    }
  }
`;
