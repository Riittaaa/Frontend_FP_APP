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

export const CREATE_GOODS = gql`
  mutation CreateGoods($goodsInput: CreateGoodsInput!) {
    createGoods(input: $goodsInput) {
      goods {
        id
        name
        category
        availability
      }
      message
      errors
    }
  }
`;

export const UPDATE_GOODS = gql`
  mutation UpdateGoods($goodsInput: UpdateGoodsInput!) {
    updateGoods(input: $goodsInput) {
      goods {
        id
        name
        category
        availability
        soldAs
        unit
      }
      errors
      message
    }
  }
`;

export const DELETE_GOODS = gql`
  mutation deleteGoods($id: DeleteGoodsInput!) {
    deleteGoods(input: $id) {
      goods {
        id
        name
      }
      message
      errors
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
      error
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

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($deleteCustomer: DeleteCustomerInput!) {
    deleteCustomer(input: $deleteCustomer) {
      customer {
        id
        name
      }
      message
      error
    }
  }
`;

export const CREATE_BRANCH = gql`
  mutation addCustomerbranch($customerBranch: AddCustomerBranchInput!) {
    addCustomerbranch(input: $customerBranch) {
      customerBranch {
        branchLocation
        customerId
      }
      message
      error
    }
  }
`;

export const UPDATE_BRANCH = gql`
  mutation updateCustomerbranch($input: UpdateCustomerBranchInput!) {
    updateCustomerbranch(input: $input) {
      customerBranch {
        id
        branchLocation
      }
      message
      success
      error
    }
  }
`;

export const DELETE_BRANCH = gql`
  mutation deleteCustomerbranch($input: DeleteCustomerBranchInput!) {
    deleteCustomerbranch(input: $input) {
      customerBranch {
        id
        branchLocation
      }
      message
      error
    }
  }
`;
