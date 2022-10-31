import { useQuery } from "@apollo/client";
import { ExpenseTableRow, Spinner } from "components";
import { GET_EXPENSES } from "graphql/queries/expenseQueries";

export default function Expenses() {
  const { loading, error, data } = useQuery(GET_EXPENSES);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Created By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.expenses.map((expense, i) => (
              <ExpenseTableRow key={expense.id} expense={expense} i={i} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
