import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      login(res.data.user); // save in context
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

 return (
  <div >
    <Paper elevation={2} >

      <div  style={{marginLeft:750,marginTop:50,fontSize:'20px'}} >
        Welcome Back 👋
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{margin:15,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

        <TextField
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
         
          required
         style={{marginBottom:10,width:'35%'}}
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
   style={{marginBottom:10,width:'35%'}}

        >
          Login
        </Button>

        <Typography variant="body2" className="text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/register" className="text-sky-500 font-semibold">
            Register
          </Link>
        </Typography>

      </form>
    </Paper>
  </div>
);
}

export default Login;