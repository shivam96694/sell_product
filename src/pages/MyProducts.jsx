import { useEffect, useState } from "react";
import { getMyProducts, deleteProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchMyProducts = async () => {
    try {
      const res = await getMyProducts();
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);

      // ✅ instant UI update
      setProducts(products.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home-container">
      <h2 className="home-title" style={{color:'black'}}>My Products</h2>

      {products.length === 0 ? (
        <p className="center">You have not added any product</p>
      ) : (
        <div className="product-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} />

              <h3>{item.title}</h3>
              <p className="price">₹ {item.price}</p>

              <div className="btn-row">
                <button onClick={() => navigate(`/edit/${item.id}`)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProducts;