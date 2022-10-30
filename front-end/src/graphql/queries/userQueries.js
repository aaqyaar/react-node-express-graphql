import { gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      phone
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { GET_USERS, GET_USER };
