import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "", 
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения.";
    } else if (formData.name.length < 3) {
      newErrors.name = "Имя должно быть не короче 3 символов.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен для заполнения.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Сообщение обязательно для заполнения.";
    } else if (formData.message.length < 10) {
      newErrors.message = "Сообщение должно быть не короче 10 символов.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен для заполнения.";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "", phone: "" });
      setErrors({});
    } else {
      setErrors(validationErrors);
      setIsSubmitted(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#fff3e0", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column" 
    }}>
      <Header />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <Paper elevation={3} style={{ padding: "20px", width: "100%", maxWidth: "600px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Свяжитесь с нами
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Имя"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Телефон"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Сообщение"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Отправить
            </Button>
          </form>
          <Snackbar open={isSubmitted} autoHideDuration={6000} onClose={() => setIsSubmitted(false)}>
            <Alert onClose={() => setIsSubmitted(false)} severity="success">
              Спасибо за ваше сообщение! Мы скоро с вами свяжемся.
            </Alert>
          </Snackbar>
        </Paper>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;