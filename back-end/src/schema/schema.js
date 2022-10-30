const {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
} = require("graphql");
const Expense = require("../models/expenses");
const User = require("../models/users");

const expenseType = new GraphQLObjectType({
  name: "Expense",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    category: { type: GraphQLString },
    isRecurring: { type: GraphQLBoolean },
    createdBy: { type: GraphQLString },
  }),
});

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    expenses: {
      type: new GraphQLList(expenseType),
      resolve(parent, args) {
        return Expense.find({ createdBy: parent.id });
      },
    },
  }),
});

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
        return User.findById(args.id);
      },
    },

    users: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        // code to get data from db / other source
        return User.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
