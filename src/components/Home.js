import React from "react";
import Table from "./Table";
import Cards from "./Cards";
import { Button } from "@mui/material";

const Home = ({ view, setView, workers, delWorker, updateWorker }) => {
  return (
    <div>
      <Button onClick={() => setView(view === "table" ? "cards" : "table")}>
        Switch to {view === "table" ? "Cards" : "Table"} View
      </Button>
      {view === "table" ? (
        <Table workers={workers} delWorker={delWorker} updateWorker={updateWorker} />
      ) : (
        <Cards workers={workers} delWorker={delWorker} updateWorker={updateWorker} />
      )}
    </div>
  );
};

export default Home;
