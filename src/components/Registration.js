import React from "react";
import Form from "./Form";

const Registration = ({ addWorker }) => {
  return (
    <div>
      <h1>Register</h1>
      <Form addWorker={addWorker} />
    </div>
  );
};

export default Registration;
