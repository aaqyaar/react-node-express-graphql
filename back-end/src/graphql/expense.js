const {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const Expense = require("../models/expenses");

const expenseType = new GraphQLObjectType({
  name: "Expense",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    amount: { type: GraphQLInt },
    category: { type: GraphQLString },
    isRecurring: { type: GraphQLBoolean },
    createdBy: { type: GraphQLString },
  }),
});

const addExpense = {
  type: expenseType,
  args: {
    description: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
    category: { type: new GraphQLNonNull(GraphQLString) },
    isRecurring: { type: new GraphQLNonNull(GraphQLBoolean) },
    createdBy: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    let expense = new Expense({
      description: args.description,
      amount: args.amount,
      category: args.category,
      isRecurring: args.isRecurring,
      createdBy: args.createdBy,
    });
    return expense.save();
  },
};

module.exports = { expenseType, addExpense };
