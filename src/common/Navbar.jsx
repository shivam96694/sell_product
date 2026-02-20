import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // optional
  navigate("/login");
};

  const token = localStorage.getItem("token");
  return (
    <nav className="navbar">
      <h2 className="logo">MyMarket</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add-product">Sell</Link>
 <div style={{ float: "right" }}>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>      </div>
    </nav>
  );
}

export default Navbar;