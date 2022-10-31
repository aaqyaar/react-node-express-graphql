import { useQuery } from "@apollo/client";
import { UserTableRow, Spinner } from "components";
import { GET_USERS } from "graphql/queries/userQueries";

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user, i) => (
              <UserTableRow key={user.id} user={user} i={i} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
