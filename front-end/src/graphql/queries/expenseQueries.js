import { gql } from "@apollo/client";

const GET_EXPENSES = gql`
  query getExpenses {
    expenses {
      id
      amount
      description
      category
    }
  }
`;

// createdBy {
//   name
//   id
// }
export { GET_EXPENSES };
