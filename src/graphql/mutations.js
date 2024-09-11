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

export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle($updateVehicle: UpdateVehicleInput!) {
    updateVehicle(input: $updateVehicle) {
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

export const DELETE_VEHICLE = gql`
  mutation deleteVehicle($deleteVehicleInput: DeleteVehicleInput!) {
    deleteVehicle(input: $deleteVehicleInput) {
      vehicle {
        id
      }
      message
      errors
    }
  }
`;
