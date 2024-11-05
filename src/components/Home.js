// src/components/Home.js
import React from "react";
import Table from "./Table";
import Cards from "./Cards";
import Registration from "./Registration";
import { Button } from "@mui/material";

const Home = ({ view, setView, workers, delWorker, updateWorker, addWorker }) => {
  return (
    <div>
      <Button onClick={() => setView(view === "table" ? "cards" : "table")}>
        Switch to {view === "table" ? "Cards" : "Table"} View
      </Button>
      <Button onClick={() => setView(view === "register" ? "table" : "register")}>
        {view === "register" ? "Back to Table" : "Register Worker"}
      </Button>
      {view === "table" ? (
        <Table workers={workers} delWorker={delWorker} updateWorker={updateWorker} />
      ) : view === "cards" ? (
        <Cards workers={workers} delWorker={delWorker} updateWorker={updateWorker} />
      ) : (
        <Registration addWorker={addWorker} />
      )}
    </div>
  );
};

export default Home;
