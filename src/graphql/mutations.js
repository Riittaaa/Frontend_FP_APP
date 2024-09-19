import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($login: LoginUserInput!) {
    loginUser(input: $login) {
      message
      error
      token
      user {
        id
        email
      }
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
        userId
      }
      error
      message
    }
  }
`;

export const UPDATE_DRIVER = gql`
  mutation updateDriver($input: UpdateDriverInput!) {
    updateDriver(input: $input) {
      driver {
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
  }
`;

export const DELETE_DRIVER = gql`
  mutation deleteDriver($input: DeleteDriverInput!) {
    deleteDriver(input: $input) {
      error
      message
    }
  }
`;
