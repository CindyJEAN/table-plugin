import React from "react";

import { TablePlugin } from "table-plugin";
import "table-plugin/dist/index.css";
import employees from "./data/employees.json";

const headCells = [
  { label: "First Name", data: "firstName", type: "text" },
  { label: "Last Name", data: "lastName", type: "text" },
  { label: "Start Date", data: "startDate", type: "date" },
  { label: "Department", data: "department", type: "text" },
  { label: "Date of Birth", data: "dateOfBirth", type: "date" },
  { label: "Street", data: "street", type: "text" },
  { label: "City", data: "city", type: "text" },
  { label: "State", data: "state", type: "text" },
  { label: "Zip Code", data: "zipCode", type: "text" },
];

const App = () => {
  return <TablePlugin headCells={headCells} data={employees} />;
};

export default App;
