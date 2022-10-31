import { gql } from "@apollo/client";

export const ADD_EXPENSE = gql`
  mutation AddExpense($input: ExpenseInput!) {
    addExpense(input: $input) {
      id
      description
      amount
      createdBy
      category
    }
  }
`;

// Path: src/graphql/mutations/expenseMutation.js
