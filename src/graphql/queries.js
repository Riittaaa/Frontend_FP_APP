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
        category {
          id
          name
        }
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
        category {
          id
          name
        }
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
      groupId
    }
  }
`;

export const FETCH_CATEGORIES = gql`
  query categories {
    allCategory {
      category {
        id
        name
      }
      message
      errors
    }
  }
`;

export const FETCH_CATEGORY = gql`
  query specificCategory($input: ID!) {
    specificCategory(id: $input) {
      category {
        id
        name
      }
      errors
      message
    }
  }
`;

export const FETCH_AVAILABILITIES = gql`
  query availability {
    availibility
  }
`;

export const FETCH_ORDERGROUPS = gql`
  query OrderGroup {
    allOrderGroup {
      order {
        id
        customer {
          id
          name
          email
          address
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
        nextDueDate
        parentOrderGroupId
        deliveryOrder {
          deliveryDate
          dispatchedDate
          driverId
          vehicleId
          orderGroupId
          lineItems {
            id
            goodsId
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

export const FETCH_UNITS = gql`
  query unit {
    unit
  }
`;

export const FETCH_ORDERGROUP = gql`
  query specificOrderGroup($id: ID!) {
    specificOrderGroup(id: $id) {
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
          driverId
          vehicleId
          status
          orderGroupId
          lineItems {
            id
            goodsId
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

export const FETCH_RECURRING_FREQUENCIES = gql`
  query recurringFrequencies {
    frequency
  }
`;

export const FETCH_DELIVERY_STATUSES = gql`
  query deliveryStatus {
    deliveryStatus
  }
`;

export const EXPORT_CSV = gql`
  query csv($id: ID!) {
    csvExport(id: $id)
  }
`;
