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

export const FETCH_VEHICLES = gql`
  query vehicleResult {
    vehicles {
      vehicle {
        id
        brand
        capacity
        groupId
        licensePlate
        status
        vehicleType
      }
      errors
      message
    }
  }
`;

export const FETCH_STATUSES = gql`
  query statusEnum {
    statusEnumValues
  }
`;

export const FETCH_VEHICLE = gql`
  query specificVehicle($vehicleId: ID!) {
    specificVehicle(vehicleId: $vehicleId) {
      vehicle {
        id
        brand
        capacity
        groupId
        licensePlate
        status
        vehicleType
      }
    }
  }
`;

export const FETCH_GOODS = gql`
  query goodsResult {
    goods {
      goods {
        id
        name
        availability
        category
        soldAs
        unit
      }
      errors
      message
    }
  }
`;

export const FETCH_SPECIFIC_GOODS = gql`
  query SpecificGoods($goodsId: ID!) {
    specificGoods(goodsId: $goodsId) {
      goods {
        name
        id
        availability
        category
        soldAs
        unit
      }
      errors
      message
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
      groupId
    }
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

export const FETCH_BRANCHES = gql`
  query allBranches($customerId: ID!) {
    allBranches(customerId: $customerId) {
      id
      branchLocation
    }
  }
`;

export const FETCH_BRANCH = gql`
  query customerBranch($id: ID!) {
    customerBranch(id: $id) {
      id
      branchLocation
      customerId
    }
  }
`;

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
      userId
      groupId
    }
  }
`;
