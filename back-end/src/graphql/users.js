const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");
const { expenseType } = require("../graphql/expense");
const { JSON_WEB_TOKEN } = require("../config/jwt");
const User = require("../models/users");

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

const addUser = {
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
};

// update user mutation

const updateUser = {
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
};

// login mutation
const login = {
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
};

module.exports = { userType, addUser, updateUser, login };
