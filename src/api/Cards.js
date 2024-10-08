import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const Cards = ({ workers, delWorker, updateWorker }) => {
  return (
    <Grid container spacing={2}>
      {workers.map((worker) => (
        <Grid item xs={12} sm={6} md={4} key={worker.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{worker.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {worker.job}
              </Typography>
              <Button onClick={() => delWorker(worker.id)}>Delete</Button>
              {/* Добавить кнопку редактирования можно аналогично, как в таблице */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
