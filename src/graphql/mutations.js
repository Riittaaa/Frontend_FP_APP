import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!, $groupId: ID!) {
    loginUser(
      input: { email: $email, password: $password, groupId: $groupId }
    ) {
      user {
        id
        email
      }
      error
      message
      token
    }
  }
`;

export const CREATE_VEHICLE = gql`
  mutation CreateVehicle($createVehicle: CreateVehicleInput!) {
    createVehicle(input: $createVehicle) {
      vehicle {
        licensePlate
        brand
        vehicleType
        status
        capacity
        groupId
      }
      errors
      message
    }
  }
`;
