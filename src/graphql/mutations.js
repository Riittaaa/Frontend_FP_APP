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
