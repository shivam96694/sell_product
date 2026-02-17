import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
    <Paper elevation={6} className="p-8 w-full max-w-md rounded-2xl">

      <Typography variant="h5" className="text-center font-bold mb-6">
        Create Account 🚀
      </Typography>

      <form style={{margin:15,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onSubmit={handleSubmit} className="flex flex-col gap-4">

        <TextField
          label="Full Name"
          type="text"
          name="name"
          onChange={handleChange}
         style={{marginBottom:10,width:'35%'}}
          required
        />

        <TextField
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
         style={{marginBottom:10,width:'35%'}}
          required
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
         style={{marginBottom:10,width:'35%'}}
          required
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          className="!bg-sky-500 hover:!bg-sky-600 !mt-2"
        style={{marginBottom:10,width:'35%'}}   >
          Register
        </Button>

        <Typography variant="body2" className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500 font-semibold">
            Login
          </Link>
        </Typography>

      </form>
    </Paper>
  </div>
);
}

export default Register;