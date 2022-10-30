const server = require("./main");
const { graphqlHTTP } = require("express-graphql");
const PORT = process.env.PORT || 8080; // default port 8080
const schema = require("./src/schema/schema");

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== "production",
  })
);

server.listen(PORT, () => {
  console.log(`*** 🌍 => Server is running on port ${PORT} ***`);
});
