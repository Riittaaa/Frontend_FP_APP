import { gql } from "@apollo/client";

export const FETCH_DRIVERS = gql`
  query alldrivers {
    alldrivers {
      id
      name
      address
      email
      groupId
      phoneNo
      status
      deletedAt
    }
  }
`;

export const FETCH_DRIVER_STATUSES = gql`
  query driverStatuses {
    StatusEnum
  }
`;

export const FETCH_DRIVER = gql`
  query fetchDriver($input: ID!) {
    driver(driverId: $input) {
      id
      name
      email
      address
      phoneNo
      status
      groupId
    }
  }
`;
