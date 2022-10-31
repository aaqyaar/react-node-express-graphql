import { FaTrash } from "react-icons/fa";

export default function ExpenseTableRow({ expense, i }) {
  return (
    <tr>
      <td>{i + 1}</td>
      <td>{expense.description}</td>
      <td>{expense.amount}</td>
      <td>{expense.category}</td>
      <td>{expense.createdBy}</td>
      <td>
        <button className="btn btn-danger btn-sm">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
