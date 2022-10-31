import React from "react";
import Expenses from "./Expenses";
import Users from "./Users";
import { AddExpenseModal, Navbar } from "components";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="d-flex gap-3 mb-4">
          <AddExpenseModal />
          <AddExpenseModal />
        </div>
        <div className="d-flex flex-column gap-4">
          <Users />
          <Expenses />
        </div>
      </div>
    </>
  );
}
