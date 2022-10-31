import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "graphql/queries/userQueries";
import { ADD_EXPENSE } from "graphql/mutations/expenseMutation";
import React from "react";
import Select from "utils/Select";
import TextField from "utils/TextField";

export default function AddExpenseModal() {
  const { data, loading } = useQuery(GET_USERS);
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [expense, setExpense] = React.useState({
    description: "",
    amount: "",
    createdBy: "",
    category: "",
  });

  const [addExpense] = useMutation(ADD_EXPENSE, {
    update(cache, { data: { addExpense } }) {},
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    let errors = {};

    // amount field
    if (!values.amount) {
      errors.amount = "Amount is required";
    }

    // description field
    if (!values.description) {
      errors.description = "Description is required";
    }

    // category field
    if (!values.category) {
      errors.category = "Category is required";
    }

    // createdBy field
    if (!values.createdBy) {
      errors.createdBy = "Created By is required";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // loading
    setIsSubmitting(true);
    // validate
    const isValid = validate(expense);
    if (isValid) {
      addExpense({
        variables: {
          description: expense.description,
          amount: expense.amount,
          createdBy: expense.createdBy,
          category: expense.category,
        },
      });
      setIsSubmitting(false);
      // reset form
      setExpense({
        description: "",
        amount: "",
        createdBy: "",
        category: "",
      });
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#addExpenseModal"
      >
        Add Expense
      </button>

      <div
        className="modal fade"
        id="addExpenseModal"
        tabIndex={"-1"}
        aria-labelledby="addExpenseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addExpenseModalLabel">
                New Expense Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="needs-validation"
              noValidate
            >
              <div className="modal-body">
                <TextField
                  type="text"
                  label={"Description"}
                  className="form-control"
                  placeholder="Enter description"
                  value={expense.description}
                  name="description"
                  onChange={handleChange}
                  isRequired={true}
                  errors={formErrors.description}
                />
                <TextField
                  type="number"
                  label={"Amount"}
                  className="form-control"
                  placeholder="Enter amount"
                  InputProps={"$"}
                  name="amount"
                  value={expense.amount}
                  onChange={handleChange}
                  isRequired={true}
                  errors={formErrors.amount}
                />

                <TextField
                  type="text"
                  label={"Category"}
                  className="form-control"
                  placeholder="Enter category"
                  value={expense.category}
                  onChange={handleChange}
                  isRequired={true}
                  name="category"
                  errors={formErrors.category}
                />

                <Select
                  label={"Select User"}
                  options={data ? data?.users : []}
                  loading={loading}
                  value={expense.createdBy}
                  onChange={handleChange}
                  isRequired={true}
                  name="createdBy"
                  errors={formErrors.createdBy}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-danger"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
