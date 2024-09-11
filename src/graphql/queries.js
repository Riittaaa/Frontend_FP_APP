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
