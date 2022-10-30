const expenses = [
  {
    id: "1",
    description: "Rent",
    amount: 1000,
    category: "Rent",
    isRecurring: true,
    createdBy: "1",
  },
  {
    id: "2",
    description: "Groceries",
    amount: 200,
    category: "Food",
    isRecurring: true,
    createdBy: "1",
  },
  {
    id: "3",
    description: "Netflix",
    amount: 10,
    category: "Entertainment",
    isRecurring: true,
    createdBy: "1",
  },
  {
    id: "4",
    description: "Spotify",
    amount: 10,
    category: "Entertainment",
    isRecurring: true,
    createdBy: "1",
  },
  {
    id: "5",
    description: "Gas",
    amount: 50,
    category: "Transportation",
    isRecurring: true,
    createdBy: "1",
  },
];

const users = [
  {
    id: "1",
    email: "abdizamedmo@gmail.com",
    name: "John Doe",
    phone: "555-555-5555",
    password: "password",
    expenses: ["1", "2", "3", "4", "5"],
  },
];

module.exports = { users, expenses };
