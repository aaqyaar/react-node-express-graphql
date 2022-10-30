const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

// const { users, expenses } = require("../sampleData");
const Expense = require("../models/expenses");
const User = require("../models/users");
// graphql schema
const { expenseType, addExpense } = require("../graphql/expense");
const { userType, addUser, updateUser, login } = require("../graphql/users");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    expenses: {
      type: new GraphQLList(expenseType),
      resolve(parent, args) {
        return Expense.find({});
      },
    },
    expense: {
      type: expenseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return Expense.findById(args.id);
      },
    },

    user: {
      type: userType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return User.findById(args.id).select("-password");
      },
    },

    users: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        // code to get data from db / other source
        return User.find({}).select("-password");
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add expense mutation
    addExpense,
    // add user mutation
    addUser,
    // update user mutation
    updateUser,
    // login mutation
    login,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
