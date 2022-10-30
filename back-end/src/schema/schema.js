const {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");
const { JSON_WEB_TOKEN } = require("../config/jwt");
// const { users, expenses } = require("../sampleData");
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
    addExpense: {
      type: expenseType,
      args: {
        description: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
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
    },

    // add user mutation
    addUser: {
      type: userType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        expenses: { type: GraphQLID },
      },
      resolve(parent, args) {
        let user = new User({
          email: args.email,
          name: args.name,
          phone: args.phone,
          password: args.password,
          expenses: args.expenses,
        });
        return user.save();
      },
    },

    // update user mutation

    updateUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        expenses: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const user = await User.findById(args.id).exec();
        if (!user) {
          throw new Error("User not found");
        }
        const hashedPassword = await user.encryptPassword(args.password);

        const updated = await user.updateOne({
          email: args.email,
          name: args.name,
          phone: args.phone,
          password: hashedPassword,
          expenses: args.expenses,
        });
        return { updated, message: "User updated successfully" };
      },
    },

    // login mutation
    login: {
      type: userType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ email: args.email }).exec();
        if (!user) {
          throw new Error("User not found");
        }
        if (user && (await user.matchPassword(args.password))) {
          const token = JSON_WEB_TOKEN.generateToken(user._id);
          const { password, ...userWithoutPassword } = user.toObject();
          const response = {
            ...userWithoutPassword,
            token,
            message: "User logged in successfully",
          };
          return response;
        } else {
          throw new Error("Invalid email or password");
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
