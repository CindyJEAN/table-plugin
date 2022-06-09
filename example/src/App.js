import React from "react";

import { TablePlugin } from "table-plugin";
import "table-plugin/dist/index.css";
import employees from "./data/employees.json";

const headCells = [
  { label: "First Name", data: "firstName" },
  { label: "Last Name", data: "lastName" },
  { label: "Start Date", data: "startDate" },
  { label: "Department", data: "department" },
  { label: "Date of Birth", data: "dateOfBirth" },
  { label: "Street", data: "street" },
  { label: "City", data: "city" },
  { label: "State", data: "state" },
  { label: "Zip Code", data: "zipCode" },
];

const App = () => {
  return <TablePlugin headCells={headCells} data={employees} />;
};

export default App;
