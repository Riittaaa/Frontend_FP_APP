import { gql } from "@apollo/client";

export const FETCH_ACTIVE_VEHICLES = gql`
  query activeVehicles {
    activeVehicles {
      vehicle {
        id
        brand
        vehicleType
        deletedAt
      }
    }
  }
`;
