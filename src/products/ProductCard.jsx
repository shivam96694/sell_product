import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image || "https://via.placeholder.com/200"}
        alt={product.title}
      />

      <h3>{product.title}</h3>

      <p  className="price">₹ {product.price}</p>

      <p className="location">{product.location}</p>

      <Link to={`/product/${product.id}`} className="view-btn">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;