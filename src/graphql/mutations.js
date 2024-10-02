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
      }
      errors
      message
    }
  }
`;

export const REACTIVATE_VEHICLE = gql`
  mutation reactivateVehicle($vehicleId: ReactivateVehicleInput!) {
    reactivateVehicle(input: $vehicleId) {
      vehicle {
        id
        deletedAt
        brand
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
        category {
          id
          name
        }
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
        category {
          id
          name
        }
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

export const CREATE_CATEGORY = gql`
  mutation addCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      category {
        id
        name
        groupId
      }
      errors
      message
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      category {
        id
        name
      }
      errors
      message
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($input: DeleteCategoryInput!) {
    deleteCategory(input: $input) {
      message
      errors
      category {
        id
        name
      }
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
      errors
    }
  }
`;

export const UPDATE_BRANCH = gql`
  mutation updateBranch($input: UpdateCustomerBranchInput!) {
    updateCustomerbranch(input: $input) {
      errors
      message
      success
      customerBranch {
        id
        branchLocation
      }
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
      errors
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

export const CREATE_ORDERGROUP = gql`
  mutation CreateOrderGroup($groupOrder: CreateOrderGroupInput!) {
    createOrderGroup(input: $groupOrder) {
      order {
        id
        customer {
          id
          name
          email
          phone
        }
        customerBranch {
          id
          branchLocation
        }
        childOrderGroups {
          id
        }
        createdAt
        plannedAt
        recurring
        recurrenceFrequency
        recurrenceEndDate
        parentOrderGroupId
        deliveryOrder {
          deliveryDate
          dispatchedDate
          driver {
            id
            name
          }
          vehicle {
            id
            brand
            vehicleType
          }
          status
          orderGroupId
          lineItems {
            id
            goods {
              id
              name
              availability
              category {
                id
                name
              }
            }
            quantity
            unit
          }
        }
      }
      errors
      message
    }
  }
`;

export const UPDATE_ORDERGROUP = gql`
  mutation UpdateOrderGroup($orderGroup: UpdateOrderGroupInput!) {
    updateOrderGroup(input: $orderGroup) {
      order {
        id
        customer {
          id
          name
          email
          phone
        }
        customerBranch {
          id
          branchLocation
        }
        childOrderGroups {
          id
        }
        createdAt
        plannedAt
        recurring
        recurrenceFrequency
        recurrenceEndDate
        parentOrderGroupId
        deliveryOrder {
          deliveryDate
          dispatchedDate
          driver {
            id
            name
          }
          vehicle {
            id
            brand
            vehicleType
          }
          status
          orderGroupId
          lineItems {
            id
            goods {
              id
              name
              availability
              category {
                id
                name
              }
            }
            quantity
            unit
          }
        }
      }
      errors
      message
    }
  }
`;
